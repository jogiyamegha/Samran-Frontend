import {useState, useEffect} from "react";
import {Modal, Button, Row, Col, FormLabel, Form, InputGroup} from "react-bootstrap";
import eyeIcon from "../../_admin/assets/media/svg/eyeIcon.svg";
import eyeActiveIcon from "../../_admin/assets/media/svg/eyeFill.svg";
import clsx from "clsx";
import Validations from "../../utils/validations";
import LockLogo from "../../_admin/assets/media/svg/Lock(field).svg";
import APICallService from "../../api/apiCallService";
import {AUTH} from "../../api/apiEndPoints";
import {APIJSON} from "../../api/apiJSON/auth";
import {success} from "../../global/toast";
import {Auth} from "../../utils/toast";

const ChangePasswordModal = (props: any) => {
    const initialPasswordState = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    };

    const initialShowPasswordState = {
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    };

    const initialValidationState = {
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
        samePassword: false,
    };

    const [password, setPassword] = useState<any>(initialPasswordState);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState<any>(initialShowPasswordState);
    const [validation, setValidation] = useState<any>(initialValidationState);

    // Reset all states when modal closes
    useEffect(() => {
        if (!props.show) {
            setPassword(initialPasswordState);
            setShowPassword(initialShowPasswordState);
            setValidation(initialValidationState);
            setLoading(false);
        }
    }, [props.show]);

    const handleChange = (name: any, value: any) => {
        let temp = {...password};
        const tempValidation = {...validation};
        temp[name] = value;
        tempValidation[name] = false;
        if (!value.length) {
            tempValidation[name] = true;
        }
        setPassword(temp);
        setValidation(tempValidation);
    };

    const handleShow = (name: any) => {
        let temp = {...showPassword};
        temp[name] = !temp[name];
        setShowPassword(temp);
    };

    const handleSubmit = async () => {
        const tempValidation = {...validation};
        const temp = {...password};
        if (temp.oldPassword === "") {
            tempValidation.oldPassword = true;
        }
        if (temp.newPassword === "") {
            tempValidation.newPassword = true;
        }
        if (temp.confirmPassword === "") {
            tempValidation.confirmPassword = true;
        }
        if (temp.newPassword !== "" && temp.confirmPassword !== "" && temp.newPassword !== temp.confirmPassword) {
            tempValidation.confirmPassword = true;
        }
        const newPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].{7,}$/;
        if (!newPasswordRegex.test(temp.newPassword) && temp.newPassword !== "") {
            tempValidation.newPassword = true;
        }

        const isValid = await Validations.validateObject(tempValidation);
        if (isValid) {
            setLoading(true);
            let apiService = new APICallService(AUTH.CHANGE_PASSWORD, APIJSON.changePassword(temp));
            let response = await apiService.callAPI();
            if (response) {
                success(Auth.changePassword);
                props.onHide();
            }
            setLoading(false);
        }
        setValidation(tempValidation);
    };

    return (
        <Modal
            {...props}
            show={props.show}
            onHide={props.onHide}
            dialogClassName="modal-dialog-centered"
            className="border-r10px"
            centered
            backdrop={true}
        >
            <Modal.Header closeButton className="border-bottom pb-3">
                <Modal.Title className="fs-3 fw-bold">Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-4 p-8">
                <Row className="g-4">
                    <Col xs={12}>
                        <FormLabel className="fw-semibold mb-2 text-dark">Old Password</FormLabel>
                        <InputGroup
                            className={clsx(
                                "border rounded shadow-sm",
                                validation.oldPassword ? "border-danger" : "border-secondary-subtle"
                            )}
                        >
                            <InputGroup.Text className="border-0 bg-white ps-3">
                                <img src={LockLogo} width={20} height={20} alt="Lock" />
                            </InputGroup.Text>
                            <Form.Control
                                className="border-0 py-2 fw-medium"
                                placeholder="Enter old password"
                                name="oldPassword"
                                type={showPassword.oldPassword ? "text" : "password"}
                                value={password.oldPassword}
                                onChange={(e) => handleChange(e.target.name, e.target.value.trimStart())}
                            />
                            <InputGroup.Text className="border-0 bg-white pe-3">
                                <Button
                                    variant="link"
                                    className="btn-flush p-0 text-decoration-none"
                                    onClick={() => handleShow("oldPassword")}
                                >
                                    <img
                                        width={20}
                                        height={20}
                                        src={showPassword.oldPassword ? eyeActiveIcon : eyeIcon}
                                        alt="Toggle visibility"
                                    />
                                </Button>
                            </InputGroup.Text>
                        </InputGroup>
                        {validation.oldPassword && (
                            <small className="text-danger mt-1 d-block">Please enter your old password</small>
                        )}
                    </Col>

                    <Col xs={12}>
                        <FormLabel className="fw-semibold mb-2 text-dark">New Password</FormLabel>
                        <InputGroup
                            className={clsx(
                                "border rounded shadow-sm",
                                validation.newPassword ? "border-danger" : "border-secondary-subtle"
                            )}
                        >
                            <InputGroup.Text className="border-0 bg-white ps-3">
                                <img src={LockLogo} width={20} height={20} alt="Lock" />
                            </InputGroup.Text>
                            <Form.Control
                                className="border-0 py-2 fw-medium"
                                placeholder="Enter new password"
                                name="newPassword"
                                type={showPassword.newPassword ? "text" : "password"}
                                value={password.newPassword}
                                onChange={(e) => handleChange(e.target.name, e.target.value.trimStart())}
                            />
                            <InputGroup.Text className="border-0 bg-white pe-3">
                                <Button
                                    variant="link"
                                    className="btn-flush p-0 text-decoration-none"
                                    onClick={() => handleShow("newPassword")}
                                >
                                    <img
                                        width={20}
                                        height={20}
                                        src={showPassword.newPassword ? eyeActiveIcon : eyeIcon}
                                        alt="Toggle visibility"
                                    />
                                </Button>
                            </InputGroup.Text>
                        </InputGroup>
                        {validation.newPassword && (
                            <small className="text-danger mt-1 d-block">
                                Password must be at least 8 characters with uppercase, lowercase, number and special
                                character
                            </small>
                        )}
                    </Col>

                    <Col xs={12}>
                        <FormLabel className="fw-semibold mb-2 text-dark">Confirm New Password</FormLabel>
                        <InputGroup
                            className={clsx(
                                "border rounded shadow-sm",
                                validation.confirmPassword ? "border-danger" : "border-secondary-subtle"
                            )}
                        >
                            <InputGroup.Text className="border-0 bg-white ps-3">
                                <img src={LockLogo} width={20} height={20} alt="Lock" />
                            </InputGroup.Text>
                            <Form.Control
                                className="border-0 py-2 fw-medium"
                                placeholder="Confirm new password"
                                name="confirmPassword"
                                type={showPassword.confirmPassword ? "text" : "password"}
                                value={password.confirmPassword}
                                onChange={(e) => handleChange(e.target.name, e.target.value.trimStart())}
                            />
                            <InputGroup.Text className="border-0 bg-white pe-3">
                                <Button
                                    variant="link"
                                    className="btn-flush p-0 text-decoration-none"
                                    onClick={() => handleShow("confirmPassword")}
                                >
                                    <img
                                        width={20}
                                        height={20}
                                        src={showPassword.confirmPassword ? eyeActiveIcon : eyeIcon}
                                        alt="Toggle visibility"
                                    />
                                </Button>
                            </InputGroup.Text>
                        </InputGroup>
                        {validation.confirmPassword && (
                            <small className="text-danger mt-1 d-block">Passwords do not match</small>
                        )}
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className="border-top-0 pt-2 pb-4">
                <Button variant="primary" className="px-4 py-2 fw-semibold" onClick={handleSubmit} disabled={loading}>
                    {!loading && <span>Set New Password</span>}
                    {loading && (
                        <span>
                            Please wait...
                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
                    )}
                </Button>
                <Button
                    variant="outline-secondary"
                    className="px-4 py-2 fw-semibold"
                    onClick={props.onHide}
                    disabled={loading}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChangePasswordModal;
