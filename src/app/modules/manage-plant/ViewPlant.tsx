import React from "react";
import {Button, Card, Col, Row, Badge, Image} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import Method from "../../../utils/methods";
import { PlantStatus, PropertyTypes } from "../../../utils/constants";
import PlaceholderLogo from "../../../_admin/assets/media/svg/placeholder.svg";

const ViewPlant = () => {
    const navigate = useNavigate();
    const {state}: any = useLocation();
    
    const formatDate = (dateString: string): string => {
        return Method.convertDateToFormat(dateString, "DD-MM-YYYY");
    };
    
    const handleBack = () => {
        navigate("/plant/all-plants");
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

    const InfoRow = ({ icon, label, value }: { icon: string; label: string; value: string | React.ReactNode }) => (
        <div className="d-flex align-items-center py-3 border-bottom">
        <i className={`${icon} text-primary me-4`} style={{ fontSize: '20px', minWidth: '30px' }}></i>
        <div className="flex-grow-1">
            <p className="fs-14 text-muted mb-1">{label}</p>
            <p className="fs-16 fw-600 text-dark mb-0">{value || '—'}</p>
        </div>
        </div>
    );

    const getStatusBadge = (status: number) => {
        console.log("status",status);
        switch (status) {
            case 1: return { variant: 'warning', label: 'Submitted' };
            case 2: return { variant: 'success', label: 'Approved' };
            case 3: return { variant: 'danger', label: 'Rejected' };
            default: return { variant: 'secondary', label: 'Unknown' };
        }
    };

    const statusInfo = getStatusBadge(state?.plantStatus);
    
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
                <Col lg={5}>
                    <Card className="border bg-white shadow-sm h-100">
                        <Card.Header className="bg-light border-bottom-0 pb-0">
                            <h5 className="fs-18 fw-bold text-dark mb-0 d-flex align-items-center">
                                <i className="bi bi-info-circle me-2 text-primary"></i>
                                    Plant Information
                            </h5>
                        </Card.Header>
                        <Card.Body className="p-6">
                            <InfoRow icon="bi bi-briefcase" label="Plant's Unique Id" value={state?.plantUniqueId} />
                            <InfoRow icon="bi bi-briefcase" label="Plant's Unique Name" value={state?.plantUniqueName} />
                            <InfoRow icon="bi bi-briefcase" label="Property Name" value={state?.propertyAddress?.propertyName} />
                            <InfoRow icon="bi bi-briefcase" label="Property Type" value={state?.propertyAddress?.propertyType} />
                            <InfoRow icon="bi bi-briefcase" label="Property Address" value={state.propertyAddress?.address} />
                            <InfoRow icon="bi bi-briefcase" label="Property Pincode" value={state.propertyAddress?.pincode} />
                            <InfoRow icon="bi bi-briefcase" label="Property City" value={state.propertyAddress?.city} />
                            <InfoRow icon="bi bi-briefcase" label="Property State" value={state.propertyAddress?.state} />
                            <InfoRow icon="bi bi-briefcase" label="RoofArea" value={state.propertyAddress?.roofArea} />
                            <InfoRow icon="bi bi-briefcase" label="Electricity Rate" value={state.propertyAddress?.electricityRate} />
                            <InfoRow
                                icon="bi bi-calendar-event"
                                label="Submitted On"
                                value={Method.convertDateToFormat(state.submittedAt, 'dddd, DD MMMM YYYY')}
                            />
                        </Card.Body>
                    </Card>
                </Col>

                {/* Right side */}
                <Col lg={7}>
                    {/* Bill Amount */}
                    <Card className="border bg-white shadow-sm mb-6">
                        <Card.Header className="bg-light border-bottom-0 pt-5">
                        <h5 className="fs-18 fw-bold text-dark mb-0">
                            <i className="bi bi-chat-square-text me-3 text-primary"></i>
                            Bill Amount
                        </h5>
                        </Card.Header>
                        <Card.Body className="pt-4 pb-5">
                        <p className="fs-16 text-dark mb-0">
                            {state?.propertyAddress?.billAmount}
                        </p>
                        </Card.Body>
                    </Card>

                    {/* Receipt */}
                    <Card className="border bg-white shadow-sm mb-6">
                        <Card.Header className="bg-light border-bottom-0 pt-5">
                        <h5 className="fs-18 fw-bold text-dark mb-0">
                            <i className="bi bi-file-earmark-image me-3 text-primary"></i>
                            Bill / Proof
                        </h5>
                        </Card.Header>
                        <Card.Body className="pt-5 pb-6 text-center">
                        {state?.propertyAddress?.billImage ? (
                            <div
                            className="d-inline-block rounded shadow-sm border bg-white p-3"
                            >
                            <Image
                                src={`${state?.propertyAddress?.billImage}`}
                                alt="Bill Image"
                                className="img-fluid rounded"
                                style={{ maxHeight: '520px', maxWidth: '100%', objectFit: 'contain' }}
                            />
                            </div>
                        ) : (
                            <div className="py-6">
                            <img src={PlaceholderLogo} alt="No Bill" style={{ width: '80px', opacity: 0.5 }} />
                            <p className="fs-16 text-muted mt-4 mb-0">No Bill uploaded</p>
                            </div>
                        )}
                        </Card.Body>
                    </Card>
                    {/* Activity History */}
                    <Card className="border bg-white shadow-sm">
                        <Card.Header className="bg-light border-bottom-0 pt-5">
                        <h5 className="fs-18 fw-bold text-dark mb-0">
                            <i className="bi bi-clock-history me-3 text-primary"></i>
                            Activity History
                        </h5>
                        </Card.Header>
                        <Card.Body className="pt-4">
                        <div className="timeline timeline-3">
                            {/* Submission */}
                            <div className="timeline-item d-flex align-items-start mb-6">
                            <div className="timeline-icon symbol symbol-circle symbol-40px me-5">
                                <div className="symbol-label bg-light-yellow">
                                <i className="bi bi-upload text-color-blue fs-4"></i>
                                </div>
                            </div>
                            <div className="timeline-content">
                                <p className="fw-bold fs-16 mb-1">Plant Submitted</p>
                                <p className="text-muted fs-14">
                                By {state?.userDetails?.name} 
                                <br />
                                {Method.convertDateToFormat(state?.createdAt, 'dddd, DD MMMM YYYY [at] hh:mm A')}
                                </p>
                            </div>
                            </div>

                            {/* Approval / Rejection */}
                            {state?.plantStatus === PlantStatus.Approved && (
                                <div className="timeline-item d-flex align-items-start">
                                    <div className="timeline-icon symbol symbol-circle symbol-40px me-5">
                                        <div className={`symbol-label bg-light-${statusInfo.variant}`}>
                                            <i className={`bi bi-${state?.plantStatus === PlantStatus.Approved ? 'check' : 'x'}-circle text-${statusInfo.variant} fs-4`}></i>
                                        </div>
                                    </div>
                                    <div className="timeline-content">
                                        <p className="fw-bold fs-16 mb-1">Plant {statusInfo.label}</p>
                                        <p className="text-muted fs-14">
                                            By {state?.approvedBy?.userDetails?.name || 'Admin'}
                                            <br />
                                            {state?.approvedBy?.userDetails?.approvedOn
                                            ? Method.convertDateToFormat(state?.approvedBy?.userDetails?.approvedOn, 'dddd, DD MMMM YYYY [at] hh:mm A')
                                            : '—'}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {state?.plantStatus === PlantStatus.Rejected && (
                                <div className="timeline-item d-flex align-items-start">
                                    <div className="timeline-icon symbol symbol-circle symbol-40px me-5">
                                        <div className={`symbol-label bg-light-${statusInfo.variant}`}>
                                            <i className={`bi bi-${state?.plantStatus === PlantStatus.Rejected ? 'x' : 'check'}-circle text-${statusInfo.variant} fs-4`}></i>
                                        </div>
                                    </div>
                                    <div className="timeline-content">
                                        <p className="fw-bold fs-16 mb-1">Plant {statusInfo.label}</p>
                                        <p className="text-muted fs-14">
                                            By {state?.rejectedBy?.userDetails?.name || 'Admin'} Due to {state?.rejectedBy?.userDetails?.rejectionReason || 'Some Reason'} Reason
                                            <br />
                                            On {state?.rejectedBy?.userDetails?.rejectedOn
                                            ? Method.convertDateToFormat(state?.rejectedBy?.userDetails?.rejectedOn, 'dddd, DD MMMM YYYY [at] hh:mm A')
                                            : '—'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ViewPlant;

 