import React from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import Method from "../../../utils/methods";
import { PlantStatus, PropertyTypes } from "../../../utils/constants";
import PlaceholderLogo from "../../../_admin/assets/media/svg/placeholder.svg";

const ViewBill = () => {
    const navigate = useNavigate();
    const {state}: any = useLocation();
    
    const formatDate = (dateString: string): string => {
        return Method.convertDateToFormat(dateString, "DD-MM-YYYY");
    };
    
    const handleBack = () => {
        navigate("/bill/all-bills");
    };
    
    if (!state) {
        return (
            <div className="p-9 bg-light d-flex justify-content-center align-items-center" style={{minHeight: "400px"}}>
                <Card className="border bg-white shadow-sm">
                    <Card.Body className="p-6">
                        <div className="text-center">
                            <i className="bi bi-file-earmark-x fs-48 text-muted mb-3"></i>
                            <p className="fs-16 fw-500 text-muted mb-0">No Plant data available.</p>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    const InfoCard = ({
        icon,
        label,
        value,
        className = "",
    }: {
        icon: string;
        label: string;
        value: string | React.ReactNode;
        className?: string;
    }) => (
        <div className={`bg-light rounded p-4 mb-4 ${className}`} style={{border: "1px solid #e4e6ef"}}>
            <div className="d-flex align-items-center mb-2">
                <i className={icon} style={{fontSize: "20px", color: "#1b74e4", marginRight: "12px"}}></i>
                <h6 className="fs-14 fw-600 text-muted mb-0">{label}</h6>
            </div>
            <div style={{marginLeft: "32px"}}>
                <p className="fs-16 fw-600 text-dark mb-0">{value || "—"}</p>
            </div>
        </div>
    );
    
    return (
        <div className="p-9 bg-light">
            <Row className="mb-6">
                <Col xs={12}>
                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center gap-3">
                            <Button
                                variant="light"
                                className="p-0"
                                onClick={handleBack}
                                style={{border: "none", background: "transparent"}}
                            >
                                <i className="bi bi-arrow-left fs-24 text-dark"></i>
                            </Button>
                            <h1 className="fs-22 fw-bolder mb-0">Plant Details</h1>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row className="g-6">
                {/* Plant Information Card */}
                <Col md={6}>
                    <Card className="border bg-white shadow-sm h-100">
                        <Card.Header className="bg-light border-bottom-0 pb-0">
                            <h5 className="fs-18 fw-bold text-dark mb-0 d-flex align-items-center">
                                <i className="bi bi-info-circle me-2 text-primary"></i>
                                    Plant Information
                            </h5>
                        </Card.Header>
                        <Card.Body className="p-6">
                            <InfoCard
                                icon="bi bi-person"
                                label="User Name"
                                value={state?.userDetails?.name}
                            />
                            <InfoCard icon="bi bi-award" label="Property Name" value={state?.propertyAddress?.propertyName || "—"} />
                            <InfoCard
                                icon="bi bi-award" 
                                label="Property Name" 
                                value={
                                        Object.keys(PropertyTypes).find( key => PropertyTypes[key as keyof typeof PropertyTypes] ===
                                            state?.propertyAddress?.propertyType) ?? "—"
                                }
                             />
                            <InfoCard icon="bi bi-award" label="Property Address" value={state?.propertyAddress?.address || "—"} />
                            <InfoCard icon="bi bi-award" label="City" value={state?.propertyAddress?.city || "—"} />
                            <InfoCard icon="bi bi-award" label="State" value={state?.propertyAddress?.state || "—"} />
                            <InfoCard icon="bi bi-award" label="Pincode" value={state?.propertyAddress?.pincode || "—"} />
                            <InfoCard icon="bi bi-award" label="Roof Area" value={state?.propertyAddress?.roofArea || "—"} />
                            <InfoCard icon="bi bi-award" label="Bill Amount" value={state?.propertyAddress?.billAmount || "—"} />
                            <InfoCard icon="bi bi-award" label="Electricity Rate" value={state?.propertyAddress?.electricityRate || "—"} />
                            {state?.plantStatus === PlantStatus.Submitted && (
                                <InfoCard
                                    icon="bi bi-award"
                                    label="Plant Status"
                                    value={
                                        Method.getPlantStatusLabel(state?.plantStatus)
                                        || 
                                    "—"}
                                />
                            )}

                            {state?.plantStatus === PlantStatus.Approved && (
                                <>
                                    <InfoCard
                                        icon="bi bi-award"
                                        label="Plant Status"
                                        value={
                                            Method.getPlantStatusLabel(state?.plantStatus)
                                            || 
                                        "—"}
                                    />
                                    <InfoCard
                                        icon="bi bi-award"
                                        label="Approved By"
                                        value={state?.approvedBy?.userDetails?.name || "—"}
                                    />
                                    <InfoCard
                                        icon="bi bi-award"
                                        label="Approved By"
                                        value={formatDate(state?.approvedBy?.userDetails?.approvedOn) || "—"}
                                    />
                                </>
                            )}

                            {state?.plantStatus === PlantStatus.Rejected && (
                                <>
                                    <InfoCard
                                        icon="bi bi-award"
                                        label="Plant Status"
                                        value={
                                            Method.getPlantStatusLabel(state?.plantStatus)
                                            || 
                                        "—"}
                                    />
                                    <InfoCard
                                        icon="bi bi-award"
                                        label="Approved By"
                                        value={state?.rejectedBy?.userDetails?.name || "—"}
                                    />
                                    <InfoCard
                                        icon="bi bi-award"
                                        label="Approved By"
                                        value={formatDate(state?.rejectedBy?.userDetails?.rejectedOn) || "—"}
                                    />
                                    <InfoCard
                                        icon="bi bi-award"
                                        label="Approved By"
                                        value={state?.rejectedBy?.userDetails?.rejectionReason || "—"}
                                    />
                                </>
                            )}
                            <div className="d-flex justify-content-center align-items-center">
                                <div
                                    className="border rounded p-4 bg-light"
                                    style={{
                                        width: "100%",
                                        maxWidth: "300px",
                                        minHeight: "300px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {state?.propertyAddress?.billImage ? (
                                        <img
                                            src={state?.propertyAddress?.billImage}
                                            className="img-fluid rounded"
                                            alt="Bill"
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: "300px",
                                                objectFit: "contain",
                                            }}
                                        />
                                    ) : (
                                        <img
                                            src={PlaceholderLogo}
                                            className="img-fluid"
                                            alt="Placeholder"
                                            style={{maxWidth: "200px", maxHeight: "200px"}}
                                        />
                                    )}
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ViewBill;

 