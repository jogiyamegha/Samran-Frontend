import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { success, error } from '../../../global/toast';
import clsx from 'clsx';
import { PLANT, USER } from '../../../api/apiEndPoints';
import { PLANTAPIJSON } from '../../../api/apiJSON/plant';
import APICallService from '../../../api/apiCallService';
import PlaceholderLogo from "../../../../_admin/assets/media/svg/people(1).svg";
import CustomDatePicker from '../../custom/DateRange/DatePicker';
import { propertyTypeOptions, weekdayOptions } from '../../../utils/staticJSON';
import { CustomSelectWhite } from '../../custom/select/CustomSelectWhite';
import { USERAPIJSON } from '../../../api/apiJSON/user';
import { UserTypes } from '../../../utils/constants';

// Inject styles
if (typeof document !== "undefined") {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    if (!document.head.querySelector("style[data-phone-input]")) {
        styleSheet.setAttribute("data-phone-input", "true");
        document.head.appendChild(styleSheet);
    }
}

const EditPlant = () => {
    const navigate = useNavigate();
    const { state }: any = useLocation();
    const fileInputRef = useRef<HTMLInputElement>(null);
    console.log("🚀 ~ EditSite ~ state:", state)
    const [userOptions, setUserOptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    
    const [formData, setFormData] = useState({
        plantUniqueName: state?.plantUniqueName || '',
        plantUniqueId: state?.plantUniqueId || '',
        userId: state?.userDetails?.userId || '',
        propertyName: state?.propertyAddress?.propertyName || '',
        propertyType: state?.propertyAddress?.propertyType || 0,
        address: state?.propertyAddress?.address || '',
        city: state?.propertyAddress?.city || '',
        state: state?.propertyAddress?.state || '',
        pincode: state?.propertyAddress?.pincode || 0,
        roofArea: state?.propertyAddress?.roofArea || 0,
        billAmount: state?.propertyAddress?.billAmount || 0,
        electricityRate: state?.propertyAddress?.electricityRate || 0,
        billImage: state?.propertyAddress?.billImage || '',
        billImageFile: null as File | null,
    });
    const [validation, setValidation] = useState({
        plantUniqueId: false,
        plantUniqueName: false,
        userId: false,
        propertyName: false,
        propertyType: false,
        address: false,
        city: false,
        state: false,
        pincode: false,
        roofArea: false,
        billAmount: false,
        electricityRate: false,
        billImage: false,
    });

    useEffect(() => {
        const fetchUsers = async () => {
            const params = {
                page: 1,
                limit: 100,
                sortKey: "_createdAt",
                sortOrder: -1,
                needCount: false,
                userType : UserTypes.Consumer,
            };
            const apiService = new APICallService(USER.LISTUSER, USERAPIJSON.listUser(params));
            const response = await apiService.callAPI();
            if (response && response.records) {
                const options = response.records.map((user: any) => ({
                    value: user._id,
                    label: `${user.name}`,
                }));
                setUserOptions(options);
            }
        };

        fetchUsers();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        validateField(name, value);
    };

    const handleUserSelect = (selected: any) => {
        const value = selected ? selected.value : null;
        setFormData({
            ...formData,
            userId: value
        });
        validateField('userId', value);
    }

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
        if (!file) return;

        if (!validateImageFile(file)) {
            e.target.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData((prev) => ({
                ...prev,
                billImage: reader.result as string, // preview
                billImageFile: file,               
            }));

            setValidation((prev) => ({
                ...prev,
                billImage: false,
            }));
        };

        reader.readAsDataURL(file);
    };

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files ? e.target.files[0] : null;
    //     setFormData({
    //         ...formData,
    //         billImage: file,
    //     });
    //     validateField("billImage", file);
    // };

    const handleSelectChange = (selected: any) => {
        const value = selected ? selected.value : null;
        setFormData({
            ...formData,
            userId: value,
        });
        validateField("userId", value);
    };

    const validateField = (name: string, value: any) => {
        let isInvalid = false;

        if (typeof value === 'string') {
            isInvalid = value.trim() === '';
        }

        if (value === null || value === undefined) {
            isInvalid = true;
        }

        setValidation((prev) => ({
            ...prev,
            [name]: isInvalid,
        }));
    };

    const handleEditSite = async () => {
        setLoading(true);

        const newValidation = {
            plantUniqueId: false,
            plantUniqueName: formData.plantUniqueName.trim() === '',
            userId: formData.userId.trim() === '',
            propertyName: formData.propertyName.trim() === '',
            propertyType: formData.propertyType === null,
            address: formData.address.trim() === '',
            city: formData.city.trim() === '',
            state: formData.state.trim() === '',
            pincode: formData.pincode === null,
            roofArea: formData.roofArea === null,
            billAmount: formData.billAmount === null,
            billImage: formData.billImage.trim() === '',
            electricityRate: formData.electricityRate === null,
        };

        setValidation(newValidation);

        const isValid = !Object.values(newValidation).some((value) => value);
        if (isValid) {
            // Use PATCH_FORM_ID if new file is uploaded, otherwise use PATCH_ID
            const hasNewFile = !!formData.billImageFile;
            const endpoint = hasNewFile ? PLANT.EDITPLANT_FORM : PLANT.EDITPLANT;
            const payload = hasNewFile
                ? PLANTAPIJSON.editPlant({
                      plantUniqueName: formData.plantUniqueName,
                      propertyName: formData.propertyName!,
                      propertyType: formData.propertyType!,
                      address: formData.address!,
                      city: formData.city!,
                      state: formData.state!,
                      pincode: formData.pincode!,
                      roofArea: formData.roofArea!,
                      billAmount: formData.billAmount!,
                      electricityRate: formData.electricityRate!,
                      userId: formData.userId!,
                      billImage: formData.billImageFile,
                  })
                : PLANTAPIJSON.editPlantWithoutBillImage({
                      plantUniqueName: formData.plantUniqueName,
                      propertyName: formData.propertyName!,
                      propertyType: formData.propertyType!,
                      address: formData.address!,
                      city: formData.city!,
                      state: formData.state!,
                      pincode: formData.pincode!,
                      roofArea: formData.roofArea!,
                      billAmount: formData.billAmount!,
                      electricityRate: formData.electricityRate!,
                      userId: formData.userId!,
                      billImage: formData.billImage!
                  });
            const apiService = new APICallService(endpoint, payload, {id: state._id});
            const response = await apiService.callAPI();

            if (response) {
                success('Plant edited successfully');
                navigate('/plant/all-plants');
            }
        }
        setLoading(false);
    };

    const handleBack = () => {
        navigate('/plant/all-plants');
    };

    return (
        <div className="p-9 bg-light">
            <Row className="mb-6">
                <Col xs={12}>
                    <div className="d-flex align-items-center gap-3">
                        <Button
                            variant="light"
                            className="p-0"
                            onClick={handleBack}
                            style={{border: "none", background: "transparent"}}
                        >
                            <i className="bi bi-arrow-left fs-24 text-dark"></i>
                        </Button>
                        <h1 className="fs-22 fw-bolder mb-0"  style={{ color: '#1e3369' }}>Edit Plant</h1>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={4} className="mb-lg-0 mb-8">
                    <Card className={clsx("border bg-white", {})}>
                        <Card.Body>
                            <Row>
                                <Col xs={12}>
                                    <h5 className="fs-18 fw-bold mb-6">Plant Info</h5>
                                </Col>
                                <Col
                                    xs={12}
                                    className={clsx(
                                        "text-md-center h-225px w-225px d-flex justify-content-center align-items-center border border-1 bg-light mb-3 rounded cursor-pointer",
                                        {
                                            "border border-danger": validation.billImage,
                                        }
                                    )}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <div>
                                        {formData.billImage ? (
                                            <img
                                                src={formData.billImage}
                                                className="object-fit-cover"
                                                alt="Bill Image"
                                                width={225}
                                                height={225}
                                            />
                                        ) : (
                                            <div className="symbol symbol-md-225px">
                                                {/* <img
                                                    src={PlaceholderLogo}
                                                    className="img-fluid min-h-90px min-w-90px"
                                                    alt="Placeholder"
                                                /> */}
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                <Col xs={9} className="text-md-center">
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
                </Col>
                <Col md={8}>
                    <Card className="border bg-white">
                        <Card.Body className="p-6">
                        <Form>
                            <Row className="g-3">
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                <Form.Label className="fs-16 fw-600 text-dark">
                                    Plant's Unique Name
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="plantUniqueName"
                                    value={formData.plantUniqueName}
                                    onChange={handleInputChange}
                                    className="form-control bg-white h-40px fs-15 fw-500 border-radius-15px"
                                    style={{
                                        border: validation.plantUniqueName ? '1px solid #F1416C' : '1px solid #e0e0df',
                                    }}
                                />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                <Form.Label className="fs-16 fw-600 text-dark">
                                    Plant's Unique ID
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="plantUniqueId"
                                    value={formData.plantUniqueId}
                                    onChange={handleInputChange}
                                    className="form-control bg-white h-40px fs-15 fw-500 border-radius-15px"
                                    style={{
                                        border: validation.plantUniqueId ? '1px solid #F1416C' : '1px solid #e0e0df',
                                    }}
                                    disabled={true}
                                />
                                </Form.Group>
                            </Col>
                            <Col
                                    md={6}
                                    className="mb-3"
                                >
                                    <Form.Group
                                        className="mb-3"
                                        controlId="userId"
                                    >
                                        <Form.Label className="fs-16 fw-500 ">
                                            User
                                        </Form.Label>
                                        <CustomSelectWhite
                                            border={validation.userId ? '#F1416C' : ''}
                                            placeholder="Select User"
                                            options={userOptions}
                                            isMulti={false}
                                            onChange={handleSelectChange}
                                            value={userOptions.find(
                                                (option) => option.value === formData.userId
                                            ) || null}
                                            minHeight="30px"
                                            controlFontSize="14px"
                                            fontWeight="500"
                                        />
                                    </Form.Group>
                                </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fs-16 fw-600 text-dark">
                                        Property Name
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="propertyName"
                                        value={formData.propertyName}
                                        onChange={handleInputChange}
                                        className="form-control bg-white h-40px fs-15 fw-500 border-radius-15px"
                                        style={{
                                        border: validation.propertyName ? '1px solid #F1416C' : '1px solid #e0e0df',
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fs-16 fw-600 text-dark">
                                        Property Type
                                    </Form.Label>
                                    <CustomSelectWhite
                                        height={'35px'}
                                        isDisabled={true}
                                        controlFontSize="14px"
                                        fontWeight="500"
                                        border={validation.propertyType ? 'red' : ''}
                                        placeholder="Select Property Type"
                                        options={propertyTypeOptions}
                                        isMulti={false}
                                        value={propertyTypeOptions.find(
                                            (option) => option.value === formData.propertyType
                                        )}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fs-16 fw-600 text-dark">
                                        Address
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="form-control bg-white h-40px fs-15 fw-500 border-radius-15px"
                                        style={{
                                            border: validation.address ? '1px solid #F1416C' : '1px solid #e0e0df',
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fs-16 fw-600 text-dark">
                                        State
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className="form-control bg-white h-40px fs-15 fw-500 border-radius-15px"
                                        style={{
                                            border: validation.state ? '1px solid #F1416C' : '1px solid #e0e0df',
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fs-16 fw-600 text-dark">
                                        City
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="form-control bg-white h-40px fs-15 fw-500 border-radius-15px"
                                        style={{
                                            border: validation.city ? '1px solid #F1416C' : '1px solid #e0e0df',
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fs-16 fw-600 text-dark">
                                        Pincode
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleInputChange}
                                        className="form-control bg-white h-40px fs-15 fw-500 border-radius-15px"
                                        style={{
                                            border: validation.pincode? '1px solid #F1416C' : '1px solid #e0e0df',
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fs-16 fw-600 text-dark">
                                        Roof Area
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="roofArea"
                                        value={formData.roofArea}
                                        onChange={handleInputChange}
                                        className="form-control bg-white h-40px fs-15 fw-500 border-radius-15px"
                                        style={{
                                            border: validation.roofArea ? '1px solid #F1416C' : '1px solid #e0e0df',
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fs-16 fw-600 text-dark">
                                        Bill Amount
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="billAmount"
                                        value={formData.billAmount}
                                        onChange={handleInputChange}
                                        className="form-control bg-white h-40px fs-15 fw-500 border-radius-15px"
                                        style={{
                                            border: validation.billAmount ? '1px solid #F1416C' : '1px solid #e0e0df',
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fs-16 fw-600 text-dark">
                                        Electricity Rate
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="electricityRate"
                                        value={formData.electricityRate}
                                        onChange={handleInputChange}
                                        className="form-control bg-white h-40px fs-15 fw-500 border-radius-15px"
                                        style={{
                                            border: validation.electricityRate ? '1px solid #F1416C' : '1px solid #e0e0df',
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center gap-4 mt-4">
                                    <Button
                                        variant="primary"
                                        onClick={handleEditSite}
                                        size="sm"
                                        disabled={loading}
                                    >
                                    {loading ? (
                                        <>
                                            Please wait...
                                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                        </>
                                    ) : (
                                        <span className="indicator-label fs-16 fw-bold">
                                            Save Changes
                                        </span>
                                    )}
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="fs-16 fw-bold"
                                        onClick={handleBack}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                        </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default EditPlant;