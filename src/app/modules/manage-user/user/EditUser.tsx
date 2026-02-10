import clsx from "clsx";
import React, { useRef, useState, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import PlaceholderLogo from "../../../../_admin/assets/media/svg/placeholder.svg";
import { useLocation, useNavigate } from "react-router-dom";
import APICallService from "../../../../api/apiCallService";
import { USER } from "../../../../api/apiEndPoints";
import { USERAPIJSON } from "../../../../api/apiJSON/user";
import { error, success } from "../../../../global/toast";
import { CustomSelectWhite } from "../../../custom/select/CustomSelectWhite";
import { userTypeOptions } from "../../../../utils/staticJSON";
import PhoneInput, { parsePhoneNumber, getCountryCallingCode } from "react-phone-number-input";
import "react-phone-number-input/style.css";

// Custom CSS for PhoneInput to match form styling
const phoneInputStyles = `
    .PhoneInput {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .PhoneInputInput {
        border: none !important;
        box-shadow: none !important;
        outline: none !important;
        background: transparent !important;
        padding: 0.375rem 0.75rem !important;
        font-size: 15px !important;
        font-weight: 500 !important;
        flex: 1;
    }
    .PhoneInputCountry {
        margin-right: 0.5rem;
        padding: 0 0.5rem;
    }
    .PhoneInputCountryIcon {
        width: 20px;
        height: 15px;
        box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
    }
    .PhoneInputCountrySelect {
        border: none !important;
        background: transparent !important;
        padding: 0.375rem 0.25rem !important;
        font-size: 14px !important;
        cursor: pointer;
    }
    .PhoneInputCountrySelectArrow {
        opacity: 0.5;
        margin-left: 0.25rem;
    }
`;

// Inject styles
if (typeof document !== "undefined") {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = phoneInputStyles;
    if (!document.head.querySelector("style[data-phone-input]")) {
        styleSheet.setAttribute("data-phone-input", "true");
        document.head.appendChild(styleSheet);
    }
}

const EditUser = () => {
    const navigate = useNavigate();
    const { state }: any = useLocation();
    console.log("🚀 ~ EditUser ~ state:", state);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<any>({
        name: state.name,
        phoneCountry: state.phoneCountry?.startsWith("+") ? state.phoneCountry : `+${state.phoneCountry}`,
        phone: state.phone,
        userType: state.userType,
    });
    const [selectedCountry, setSelectedCountry] = useState<any>(null);

    useEffect(() => {
        // Determine country from countryCode
        if (formData.countryCode) {
            const codeWithoutPlus = formData.countryCode.replace("+", "");
            try {
                // Try to get country from phone number if available
                if (formData.phone && formData.phoneCountry) {
                    const fullNumber = `${formData.phoneCountry}${formData.phone}`;
                    const phoneNumber = parsePhoneNumber(fullNumber);
                    if (phoneNumber) {
                        setSelectedCountry(phoneNumber.country || "IND");
                    } else {
                        setSelectedCountry("IND");
                    }
                } else {
                    setSelectedCountry("IND");
                }
            } catch (error) {
                setSelectedCountry("IND");
            }
        } else {
            setSelectedCountry("IND");
        }
    }, []);

    const [validation, setValidation] = useState<any>({
        name: false,
        phoneCountry: false,
        phone: false,
        userType: false,
    });
    console.log("formData", formData);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        let updatedValue = value;
        setFormData({
            ...formData,
            [name]: updatedValue,
        });
        validateField(name, updatedValue);
    };

    const handlePhoneChange = (value: any) => {
        let validationTemp = { ...validation };
        validationTemp.phone = false;
        setValidation(validationTemp);
        if (!value) {
            setFormData((prevData: any) => ({
                ...prevData,
                phone: "",
                phoneCountry: prevData.phoneCountry || state.phoneCountry || "+91",
            }));
            return;
        }
        try {
            const phoneNumber = parsePhoneNumber(value);
            if (phoneNumber) {
                setFormData((prevData: any) => ({
                    ...prevData,
                    phoneCountry: `+${phoneNumber.countryCallingCode}`,
                    phone: phoneNumber.nationalNumber,
                }));
            }
        } catch (error) {
            console.error("Error parsing phone number:", error);
        }
    };

    const handleCountryChange = (country: any) => {
        setSelectedCountry(country);
        if (country) {
            const newCountryCode = `${getCountryCallingCode(country)}`;
            setFormData((prevData: any) => ({
                ...prevData,
                phoneCountry: newCountryCode,
                phone: prevData.phone,
            }));
        }
    };

    const handleSelectChange = (selected: any) => {
        const value = selected ? selected.value : null;
        setFormData({
            ...formData,
            userType: value,
        });
        validateField("userType", value);
    };

    const validateImageFile = (file: File): boolean => {
        if (!file) return false;

        // Check file type
        const validTypes = ["image/jpeg", "image/jpg", "image/png"];
        if (!validTypes.includes(file.type)) {
            error("Please select a valid image file (JPG, JPEG, or PNG)");
            return false;
        }

        // Check file size (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            error("Image size should be less than 5MB");
            return false;
        }

        return true;
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files?.[0];
        if (!file) {
            setFormData({
                ...formData,
                profilePicture: formData.profilePicture, // Keep existing image if no new file
                image: null,
            });
            return;
        }

        if (validateImageFile(file)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    profilePicture: reader.result,
                    image: file,
                });
                // Clear validation error if image is valid
                setValidation((prev: any) => ({
                    ...prev,
                    profilePicture: false,
                }));
            };
            reader.readAsDataURL(file);
        } else {
            // Reset file input if validation fails
            e.target.value = "";
        }
    };

    const validateField = (name: any, value: any) => {
        let isInvalid = value === null || value === "" || (typeof value === "string" && value.trim() === "");
        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isInvalid = !emailRegex.test(value.trim()) || value.trim() === "";
        } else if (name === "phone") {
            isInvalid = value === null || value === "" || (typeof value === "string" && value.trim() === "");
        }
        setValidation((prev: any) => ({
            ...prev,
            [name]: isInvalid,
        }));
    };

    const handleEditUser = async () => {
        setLoading(true);

        const newValidation = {
            name: formData.name.trim() === "",
            phoneCountry: formData.phoneCountry.trim() === "",
            phone: formData.phone.trim() === "",
            userType: formData.userType === null,
        };
        setValidation(newValidation);

        const isValid = !Object.values(newValidation).some((value) => value);
        if (isValid) {
            // Add the employee logic here
            const userId = state._id;
            console.log("Form is valid. Editing the user...", formData);
            const apiService = new APICallService(USER.EDITUSER, USERAPIJSON.editUser(formData), { id: userId });
            const response = await apiService.callAPI();
            if (response) {
                success("User has been edited successfully");
                navigate("/user/all-users");
            }
        }
        setLoading(false);
    };

    const handleBack = () => {
        navigate('/user/all-users');
    };

    return (
        <div className="p-9">
            <Row className="mb-6">
                <Col xs={12}>
                    <h1 className="fs-22 fw-bolder">Edit user</h1>
                </Col>
            </Row>
            <Row>
                {/* <Col md={3} className="mb-lg-0 mb-8">
                    <Card className={clsx("border bg-white", {})}>
                        <Card.Body>
                            <Row>
                                <Col xs={12}>
                                    <h5 className="fs-18 fw-bold mb-6">User profile</h5>
                                </Col>
                                <Col
                                    xs={12}
                                    className={clsx(
                                        "text-md-center h-225px w-225px d-flex justify-content-center align-items-center border border-1 bg-light mb-3 rounded cursor-pointer",
                                        {
                                            "border border-danger": validation.profilePicture,
                                        }
                                    )}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <div>
                                        {formData.profilePicture ? (
                                            <img
                                                src={formData.profilePicture}
                                                className="object-fit-cover"
                                                alt="Profile"
                                                width={225}
                                                height={225}
                                            />
                                        ) : (
                                            <div className="symbol symbol-md-225px">
                                                <img
                                                    src={PlaceholderLogo}
                                                    className="img-fluid min-h-90px min-w-90px"
                                                    alt="Placeholder"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                <Col xs={12} className="text-md-center">
                                    <div className={clsx("upload-btn-wrapper d-flex flex-column")}>
                                        <input
                                            ref={fileInputRef}
                                            className="d-none"
                                            type="file"
                                            name="profilePicture"
                                            accept=".png,.jpg,.jpeg,image/png,image/jpeg"
                                            onChange={handleImageChange}
                                        />
                                        <span
                                            className="text-primary fs-15 fw-500 cursor-pointer"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            Click to add photo
                                        </span>
                                        <span className="text-muted fs-12 mt-1">Allowed JPG or PNG.</span>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col> */}
                <Col md={9}>
                    <Card className="bg-white pt-2 mb-6 mb-xl-9 border">
                        <Card.Header className="border-bottom-0">
                            <Card.Title>
                                <h5 className="fs-22 fw-bolder">User details</h5>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body className="pt-0 pb-5">
                            <Row className="align-items-center">
                                <Col>
                                    <Row>
                                        <Col md={12} className="mb-3">
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label className="fs-16 fw-500">Full Name</Form.Label>
                                                <Form.Control
                                                    className={clsx("form-control-custom bg-white", {
                                                        "border-danger": validation.name,
                                                    })}
                                                    type="text"
                                                    placeholder="Type here…"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} className="mb-3">
                                            <Form.Group className="mb-3" controlId="phoneNumber">
                                                <Form.Label className="fs-16 fw-500">Phone Number</Form.Label>
                                                <div
                                                    className={clsx(
                                                        "form-control-custom bg-white",
                                                        validation.phone ? "border-danger" : ""
                                                    )}
                                                    style={{
                                                        border: validation.phone
                                                            ? "1px solid #F1416C"
                                                            : "1px solid #e0e0df",
                                                        borderRadius: "6px",
                                                        padding: "0",
                                                        minHeight: "60px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <PhoneInput
                                                        international
                                                        countryCallingCodeEditable={false}
                                                        defaultCountry="IN"
                                                        country={selectedCountry || "IN"}
                                                        value={
                                                            formData.phone && formData.phoneCountry
                                                                ? `${formData.phoneCountry}${formData.phone}`
                                                                : undefined
                                                        }
                                                        onChange={handlePhoneChange}
                                                        onCountryChange={handleCountryChange}
                                                        className="w-100"
                                                        style={{
                                                            border: "none",
                                                            background: "transparent",
                                                        }}
                                                        numberInputProps={{
                                                            className:
                                                                "form-control bg-transparent border-0 fs-15 fw-500",
                                                            style: {
                                                                border: "none",
                                                                boxShadow: "none",
                                                                padding: "0.375rem 0.75rem",
                                                            },
                                                        }}
                                                        placeholder="Enter phone number"
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>

                                        <Col md={6} className="mb-3">
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label className="fs-16 fw-500 required">User Type</Form.Label>
                                                <CustomSelectWhite
                                                    height={"45px"}
                                                    // isDisabled={true}
                                                    controlFontSize="14px"
                                                    fontWeight="500"
                                                    border={validation.userType ? "red" : ""}
                                                    placeholder="Select User Type"
                                                    options={userTypeOptions}
                                                    isMulti={false}
                                                    onChange={handleSelectChange}
                                                    value={userTypeOptions.find(
                                                        (option) => option.value ===  Number(formData.userType)
                                                    )}
                                                />
                                            </Form.Group>
                                        </Col>

                                        {/* Hidden fields if not needed */}
                                    </Row>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-center gap-4">
                                <Button
                                    variant="primary"
                                    onClick={handleEditUser}
                                    size="sm"
                                    style={{background: "#d4edda", color:"#347042"}}
                                    disabled={loading}
                                >
                                    {loading ? (
                                    <>
                                        Please wait...
                                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                    </>
                                    ) : (
                                        
                                        <span>Save</span>
                                    )}
                                </Button>
                                <Button style={{background: "#e8aca1", color:"#86320f"}} onClick={handleBack}>Cancel</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
export default EditUser;
