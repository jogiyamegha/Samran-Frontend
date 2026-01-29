import React, { useState } from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import Method from "../../../utils/methods";
import { PlantStatus, PropertyTypes } from "../../../utils/constants";
import PlaceholderLogo from "../../../_admin/assets/media/svg/placeholder.svg";
import APICallService from "../../../api/apiCallService";
import { PPA } from "../../../api/apiEndPoints";
import { success } from "../../../global/toast";
import { PPAAPIJSON } from "../../../api/apiJSON/ppa";

const ViewPpa = () => {
    const navigate = useNavigate();
    const {state}: any = useLocation();
    const [loading, setLoading] = useState(false);

    const formatDate = (dateString: string): string => {
        return Method.convertDateToFormat(dateString, "DD-MM-YYYY");
    };
    
    const handleBack = () => {
        navigate("/ppa/all-ppa");
    };

    const handleSignPpa = async (ppaId: string | null) => {
        if (!ppaId) {
            return;
        }
        setLoading(true);
        const apiService = new APICallService(PPA.SIGNPPA, {}, { id: ppaId })
        const response = await apiService.callAPI();
        if(response) {
            success("PPA sign successfully");
            navigate('/ppa/all-ppa')
        }
        setLoading(false);
    }
    if (!state) {
        return (
            <div className="p-9 bg-light d-flex justify-content-center align-items-center" style={{minHeight: "400px"}}>
                <Card className="border bg-white shadow-sm">
                    <Card.Body className="p-6">
                        <div className="text-center">
                            <i className="bi bi-file-earmark-x fs-48 text-muted mb-3"></i>
                            <p className="fs-16 fw-500 text-muted mb-0">No PPA data available.</p>
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
                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 ">
                        <div className="d-flex align-items-center gap-3">
                            <Button
                                variant="light"
                                className="p-0"
                                onClick={handleBack}
                                style={{border: "none", background: "transparent"}}
                            >
                                <i className="bi bi-arrow-left fs-24 text-dark"></i>
                            </Button>
                            <h1 className="fs-22 fw-bolder mb-0">PPA Details</h1>
                            <Button
                                variant="primary"
                                size="sm"
                                className="fs-16 fw-bold"
                                onClick={() => handleSignPpa(state?._id)}
                            >
                                Sign PPA
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row className="g-6">
                {/* PPA Information Card */}
                <Col md={5}>
                    <Card className="border bg-white shadow-sm h-20">
                        <Card.Header className="bg-light border-bottom-0 pb-0">
                            <h5 className="fs-18 fw-bold text-dark mb-0 d-flex align-items-center">
                                <i className="bi bi-info-circle me-2 text-primary"></i>
                                    PPA Information
                            </h5>
                        </Card.Header>
                        <Card.Body className="p-6">
                            <InfoCard icon="bi bi-person" label="PPA Id" value={state?.ppaUniqueId}/>
                            <InfoCard icon="bi bi-person" label="PPA Name" value={state?.ppaName}/>
                            <InfoCard icon="bi bi-person" label="Plant Capacity" value={state?.plantCapacity}/>
                            <InfoCard icon="bi bi-award" label="tarrif" value={state?.tarrif || "—"} />
                            <InfoCard icon="bi bi-award" label="expected Years" value={state?.expectedYears || "—"} />
                            <InfoCard icon="bi bi-award" label="Start Date - End Date" value={(formatDate(state?.startDate) + " to " + formatDate(state?.endDate)) || "—" }/>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={7}>
                    {/* Activity History */}
                    <Card className="border bg-white shadow-sm mb-2">
                        <Card.Header className="bg-light border-bottom-0 pt-6">
                            <h5 className="fs-18 fw-bold text-dark mb-0 pb-0">
                                <i className="bi bi-clock-history me-3 text-primary"></i>
                                Signing History
                            </h5>
                        </Card.Header>
                        <Card.Body className="pt-4 pb-0">
                            <div className="timeline timeline-3">
                                {/* Submission */}
                                <div className="timeline-item d-flex align-items-start mb-0">
                                    <div className="timeline-icon symbol symbol-circle symbol-40px me-5">
                                        <div className="symbol-label bg-light-primary">
                                        <i className="bi bi-upload text-primary fs-4"></i>
                                        </div>
                                    </div>
                                <div className="timeline-content">
                                    {state?.isSigned ? (
                                        <>
                                            <p className="fw-bold fs-16 mb-0">Signed</p>
                                            <p className="text-muted fs-14 mb-0">
                                                {Method.convertDateToFormat(
                                                    state?.signedAt,
                                                    'dddd, DD MMMM YYYY [at] hh:mm A'
                                                )}
                                            </p>
                                        </>
                                    ) : (
                                        <p className="fw-bold text-danger fs-16">Not Signed</p>
                                    )}
                                </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                    <Card className="border bg-white shadow-sm">
                        <Card.Header className="bg-light border-bottom-0 pt-5">
                            <h5 className="fs-18 fw-bold text-dark mb-0">
                                Documents
                            </h5>
                        </Card.Header>
                        <Card.Body className="pb-0">
                            <div className="timeline timeline-3">
                                {/* Submission */}
                                <div className="timeline-item d-flex align-items-start mb-2 gap-3">
                                    <div className="timeline-content">
                                        {state.ppaDocument && (
                                            <div className="bg-light rounded p-4 mb-4" style={{border: "1px solid #e4e6ef"}}>
                                                <div className="d-flex align-items-center mb-3">
                                                    <i
                                                        className="bi bi-file-pdf"
                                                        style={{fontSize: "20px", color: "#1b74e4", marginRight: "12px"}}
                                                    ></i>
                                                    <h6 className="fs-16 fw-600 text-dark mb-0">PPA File</h6>
                                                </div>
                                                <div style={{marginLeft: "32px"}}>
                                                    <a
                                                        href={state.ppaDocument}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-sm btn-primary mb-2"
                                                    >
                                                        <i className="bi bi-box-arrow-up-right me-1"></i>
                                                        Open in New Tab
                                                    </a>
                                                    <p className="fs-14 fw-500 text-muted mb-0 mt-2">PDF Document</p>
                                                </div>
                                            </div>
                                        )} 
                                    </div>
                                    <div className="timeline-content">
                                        {state.leaseDocument && (
                                            <div className="bg-light rounded p-4 mb-4" style={{border: "1px solid #e4e6ef"}}>
                                                <div className="d-flex align-items-center mb-3">
                                                    <i
                                                        className="bi bi-file-pdf"
                                                        style={{fontSize: "20px", color: "#1b74e4", marginRight: "12px"}}
                                                    ></i>
                                                    <h6 className="fs-16 fw-600 text-dark mb-0">Lease Document File</h6>
                                                </div>
                                                <div style={{marginLeft: "32px"}}>
                                                    <a
                                                        href={state.leaseDocument}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-sm btn-primary mb-2"
                                                    >
                                                        <i className="bi bi-box-arrow-up-right me-1"></i>
                                                        Open in New Tab
                                                    </a>
                                                    <p className="fs-14 fw-500 text-muted mb-0 mt-2">PDF Document</p>
                                                </div>
                                            </div>
                                        )} 
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                    <Card className="border bg-white shadow-sm h-20">
                        <Card.Header className="bg-light border-bottom-0 pb-0">
                            <h5 className="fs-18 fw-bold text-dark mb-0 d-flex align-items-center">
                                <i className="bi bi-info-circle me-2 text-primary"></i>
                                    Plant Information
                            </h5>
                        </Card.Header>
                        <Card.Body className="p-3">
                            <InfoCard
                                icon="bi bi-person"
                                label="Plant Name"
                                value={state?.plantDetail?.plantUniqueName}
                            /> 
                            <InfoCard
                                icon="bi bi-person"
                                label="Property Name"
                                value={state?.plantDetail?.propertyName}
                            />
                        </Card.Body>
                    </Card>

                    

                    
                </Col>

                
                {/* PDF Preview Card */}
                {/* <Col md={6}>
                    {state?.ppaDocument ? (
                        <Card className="border bg-white shadow-sm h-50">
                            <Card.Header className="bg-light border-bottom-0 pb-0">
                                <h5 className="fs-18 fw-bold text-dark mb-0 d-flex align-items-center">
                                    <i className="bi bi-file-earmark-pdf me-2 text-danger"></i>
                                        PPA Document Preview
                                </h5>
                            </Card.Header>
                            <Card.Body className="p-4">
                                <div
                                    className="border rounded"
                                    style={{
                                        height: "600px",
                                        overflow: "hidden",
                                        backgroundColor: "#f8f9fa",
                                    }}
                                >
                                    <iframe
                                        src={state?.ppaDocument}
                                        title="PPA document PDF"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            border: "none",
                                        }}
                                    />
                                </div>
                            </Card.Body>
                        </Card>
                    ) : (
                        <Card className="border bg-white shadow-sm h-100">
                            <Card.Header className="bg-light border-bottom-0 pb-0">
                                <h5 className="fs-18 fw-bold text-dark mb-0 d-flex align-items-center">
                                    <i className="bi bi-file-earmark-pdf me-2 text-danger"></i>
                                        PPA Document Preview
                                </h5>
                            </Card.Header>
                            <Card.Body className="p-6">
                                <div
                                    className="d-flex flex-column align-items-center justify-content-center text-center"
                                    style={{minHeight: "400px"}}
                                >
                                    <i className="bi bi-file-earmark-x fs-48 text-muted mb-3"></i>
                                    <p className="fs-16 fw-500 text-muted mb-0">No PPA file available</p>
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                </Col> */}
                {/* <Col md={6}>
                    {state?.leaseDocument ? (
                        <Card className="border bg-white shadow-sm h-100">
                            <Card.Header className="bg-light border-bottom-0 pb-0">
                                <h5 className="fs-18 fw-bold text-dark mb-0 d-flex align-items-center">
                                    <i className="bi bi-file-earmark-pdf me-2 text-danger"></i>
                                        Lease Document Preview
                                </h5>
                            </Card.Header>
                            <Card.Body className="p-4">
                                <div
                                    className="border rounded"
                                    style={{
                                        height: "600px",
                                        overflow: "hidden",
                                        backgroundColor: "#f8f9fa",
                                    }}
                                >
                                    <iframe
                                        src={state?.leaseDocument}
                                        title="Lease document PDF"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            border: "none",
                                        }}
                                    />
                                </div>
                            </Card.Body>
                        </Card>
                    ) : (
                        <Card className="border bg-white shadow-sm h-100">
                            <Card.Header className="bg-light border-bottom-0 pb-0">
                                <h5 className="fs-18 fw-bold text-dark mb-0 d-flex align-items-center">
                                    <i className="bi bi-file-earmark-pdf me-2 text-danger"></i>
                                        Lease Document Preview
                                </h5>
                            </Card.Header>
                            <Card.Body className="p-6">
                                <div
                                    className="d-flex flex-column align-items-center justify-content-center text-center"
                                    style={{minHeight: "400px"}}
                                >
                                    <i className="bi bi-file-earmark-x fs-48 text-muted mb-3"></i>
                                    <p className="fs-16 fw-500 text-muted mb-0">No Lease file available</p>
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                </Col> */}
            </Row>
        </div>
    );
};

export default ViewPpa;

 