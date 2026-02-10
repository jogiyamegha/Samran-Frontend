
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
import DeleteModal from "../../modals/DeleteModal";

const ViewPpa = () => {
    const navigate = useNavigate();
    const {state}: any = useLocation();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [ppaId, setPpaId] = useState<string | null>(null);

    const formatDate = (dateString: string): string => {
        return Method.convertDateToFormat(dateString, "DD-MM-YYYY");
    };
    
    const handleBack = () => {
        navigate("/ppa/all-ppa");
    };
    
    const handleEdit = () => {
        navigate("/ppa/edit-ppa");
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

    const handleDeletePpa = async (ppaId: string | null) => {
        if (!ppaId) {
            setShowModal(false);
            return;
        }
        setLoading(true);
        const apiService = new APICallService(PPA.DELETEPPA, ppaId);
        const response = await apiService.callAPI();
        if (response) {
            success("Ppa has been deleted successfully");
            navigate("/ppa/all-ppa");
        }
        setLoading(false);
    };

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

    const InfoRow = ({ icon, label, value }: { icon: string; label: string; value: string | React.ReactNode }) => (
        <div className="d-flex align-items-center py-3 border-bottom">
        <i className={`${icon} text-primary me-4`} style={{ fontSize: '20px', minWidth: '30px' }}></i>
        <div className="flex-grow-1">
            <p className="fs-14 text-muted mb-1">{label}</p>
            <p className="fs-16 fw-600 text-gray-700 mb-0">{value || '—'}</p>
        </div>
        </div>
    );
    
    return (
        <div className="p-9 bg-light">
            <Row className="mb-6">
                <Col xs={12}>
                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">

                    {/* LEFT */}
                    <div className="d-flex align-items-center gap-3">
                        <Button
                            variant="light"
                            className="p-0"
                            onClick={handleBack}
                            style={{ border: "none", background: "transparent" }}
                        >
                            <i className="bi bi-arrow-left fs-24 text-dark"></i>
                        </Button>

                        <h1 className="fs-22 fw-bolder mb-0" style={{ color: '#1e3369' }}>PPA Details</h1>
                    </div>
                    <div className="d-flex gap-2">
                        {state?.isSigned === false ? (
                            <Button
                                variant="primary"
                                size="sm"
                                className="fs-16 fw-bold ms-auto"
                                style={{background: "#547792"}}
                                onClick={() => handleSignPpa(state?._id)}
                            >
                                <i className="fa-solid fa-signature"></i>
                                Sign PPA
                            </Button>
                        ) : (
                             <Button
                                variant="primary"
                                size="sm"
                                className="fs-16 fw-bold ms-auto" 
                                disabled={true}
                                // onClick={() => handleSignPpa(state?._id)}
                            >
                                <i className="fa-solid fa-signature"></i>
                                Sign PPA
                            </Button>
                        )}
                        <div className="d-flex gap-2">
                            <Button variant="primary" size="sm" className="fs-16 fw-bold" onClick={handleEdit}>
                                <i className="bi bi-pencil me-2"></i>
                                Edit PPA
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                className="fs-16 fw-bold"
                                onClick={() => {
                                    setShowModal(true);
                                    setPpaId(state._id);
                                }}
                            >
                                <i className="bi bi-trash me-2"></i>
                                Delete
                            </Button>
                        </div>
                    </div>
                       
                    </div>
                </Col>
            </Row>

            <Row className="g-6">
                {/* PPA Information Card */}
                <Col lg={5}>
                    <Card className="border bg-white shadow-sm h-100">
                        <Card.Header className="bg-light border-bottom-0 pb-0">
                            <p className="fs-18 fw-bold mb-0 d-flex align-items-center" style={{ color: '#2d4484' }}>
                                <i className="bi bi-info-circle me-2 text-primary"></i>
                                    PPA Information
                            </p>
                        </Card.Header>
                        <Card.Body className="p-6">
                            <InfoRow icon="bi bi-tag" label="PPA's Unique Id" value={state?.ppaUniqueId} />
                            <InfoRow icon="bi bi-app-indicator" label="PPA's Name" value={state?.ppaName} />
                            <InfoRow icon="fa-solid fa-solar-panel" label="Plant's Capacity" value={state?.plantCapacity} />
                            <InfoRow icon="bi bi-currency-rupee" label="Tarrif" value={state?.tarrif || '-'} />
                            <InfoRow icon="bi bi-calendar" label="Expected Years" value={state?.expectedYears || "—"} />
                            <InfoRow icon="bi bi-calendar-date" label="Start Date - End Date" value={(formatDate(state?.startDate) + " to " + formatDate(state?.endDate)) || "—" } />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={7}>
                    {/* Activity History */}
                    <Card className="border bg-white shadow-sm mb-2">
                        <Card.Header className="bg-light border-bottom-0 pt-6">
                            <h5 className="fs-18 fw-bold mb-0 pb-0" style={{ color: '#2d4484' }}>
                                <i className="fa-solid fa-signature me-3 text-primary"></i>
                                Signing History
                            </h5>
                        </Card.Header>
                        <Card.Body className="pt-4 pb-0">
                            <div className="timeline timeline-3">
                                {/* Submission */}
                                <div className="timeline-item d-flex align-items-start mb-0">
                                    <div className="timeline-icon symbol symbol-circle symbol-40px me-5">
                                        {state?.isSigned === true ?
                                            <i className="bi bi-check-circle-fill" style={{ fontSize: '30px', color: '#57d757' }}></i>
                                           :
                                            <i className="bi bi-x-circle-fill" style={{ fontSize: '30px', color: '#e76e78' }}></i>
                                        }
                                    </div>
                                <div className="timeline-content">
                                    {state?.isSigned ? (
                                        <>
                                            <p className="fw-bold fs-16 mb-0" style={{ color: '#2d4484' }}>Signed</p>
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

                    <Card className="border bg-white shadow-sm mb-2">
                        <Card.Header className="bg-light border-bottom-0 pt-5">
                            <h5 className="fs-18 fw-bold mb-0" style={{ color: '#1e3369' }}>
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
                                                    <h6 className="fs-16 fw-600 mb-0" style={{ color: '#1e3369' }}>PPA File</h6>
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
                                                        className="bi bi-filetype-pdf"
                                                        style={{fontSize: "20px", color: "#1b74e4", marginRight: "12px"}}
                                                    ></i>
                                                    <h6 className="fs-16 fw-600 mb-0" style={{ color: '#1e3369' }}>Lease Document File</h6>
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

                    <Card className="border bg-white shadow-sm h-45">
                        <Card.Header className="bg-light border-bottom-0 pb-0">
                            <p className="fs-18 fw-bold mb-0 d-flex align-items-center" style={{ color: '#2d4484' }}>
                                <i className="bi bi-info-circle me-2 text-primary"></i>
                                    Plant Information
                            </p>
                        </Card.Header>
                        <Card.Body className="p-6">
                            <InfoRow icon="bi bi-app-indicator"
                                label="Plant Name"
                                value={state?.plantDetail?.plantUniqueName} />
                            <InfoRow  icon="bi bi-house"
                                label="Property Name"
                                value={state?.plantDetail?.propertyName} />
                        </Card.Body>
                    </Card>

                    {/* <Card className="border bg-white shadow-sm h-20">
                        <Card.Header className="bg-light border-bottom-0 pb-0 bg-primary">
                            <h5 className="fs-18 fw-bold mb-0 d-flex align-items-center" style={{ color: '#2d4484' }}>
                                <i className="bi bi-info-circle me-2 text-primary"></i>
                                    Plant Information
                            </h5>
                        </Card.Header>
                        <Card.Body className="p-3">
                            <InfoRow
                                icon="bi bi-app-indicator"
                                label="Plant Name"
                                value={state?.plantDetail?.plantUniqueName}
                            /> 
                            <InfoRow
                                icon="bi bi-house"
                                label="Property Name"
                                value={state?.plantDetail?.propertyName}
                            />
                        </Card.Body>
                    </Card> */}
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
            <DeleteModal
                show={showModal}
                onHide={() => setShowModal(false)}
                handleDelete={() => handleDeletePpa(ppaId)}
                itemName={'ppa'}
            />
        </div>
    );
};

export default ViewPpa;