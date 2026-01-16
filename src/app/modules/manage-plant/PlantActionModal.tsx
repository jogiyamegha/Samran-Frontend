import React, {useState, useEffect} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import clsx from "clsx";
import {CustomSelectWhite} from "../../custom/select/CustomSelectWhite";

interface PlantActionModalProps {
    show: boolean;
    onHide: () => void;
    plantId: string | null;
    onSubmit: any;
    loading: boolean;
}

const PlantActionModal: React.FC<PlantActionModalProps> = ({show, onHide, plantId, onSubmit, loading}) => {
const [actionType, setActionType] = useState<2 | 3 | "">("");
    const [reason, setReason] = useState("");
    const [validation, setValidation] = useState({
        actionType: false,
    });

    const resetForm = () => {
        setActionType("");
        setReason("");
        setValidation({actionType: false});
    };

    useEffect(() => {
        if (!show) {
            resetForm();
        }
    }, [show]);

    const handleSubmit = async () => {
        const newValidation = {
            actionType: !actionType,
        };
        console.log("newValidation",newValidation);
        setValidation(newValidation);

        if (newValidation.actionType) {
            return;
        }

        // await onSubmit(actionType as "approve" | "reject", reason);
        await onSubmit(actionType, reason);

        // Reset form after successful submission
        resetForm();
    };

    const handleClose = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Process Plant Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-4">
                        <Form.Label className="fs-16 fw-600 text-dark required">Action</Form.Label>
                        <CustomSelectWhite
                            border={validation.actionType ? "#F1416C" : ""}
                            placeholder="Select Action"
                            options={[
                                {value: 2, label: "Approve"},
                                {value: 3, label: "Reject"},
                            ]}
                            isMulti={false}
                            onChange={(selectedOption: any) => {
                                const value = selectedOption ? selectedOption.value : "";
                                setActionType(value as 2 | 3 | "");
                                setValidation((prev) => ({
                                    ...prev,
                                    actionType: !value,
                                }));
                            }}
                            value={
                                actionType
                                    ? {
                                          value: actionType,
                                          label: actionType == 2 ? "Approve" : "Reject",
                                      }
                                    : null
                            }
                            minHeight="60px"
                            controlFontSize="14px"
                            fontWeight="500"
                        />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label className="fs-16 fw-600 text-dark">Reason</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            value={reason}
                            onChange={(e) => {
                                setReason(e.target.value);
                            }}
                            className="form-control bg-white min-h-50px fs-14 fw-500 border-black-2px"
                            placeholder="Enter reason (optional)"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="border-black-2px"
                >
                    {loading ? (
                        <>
                            Please wait...
                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </>
                    ) : (
                        "Submit"
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PlantActionModal;
