
import React, {useState} from "react";
import {Button, Card, Col, Row, Nav, Tab} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import DeleteModal from "../../../modals/DeleteModal";
import PlaceholderLogo from "../../../../_admin/assets/media/svg/placeholder.svg";
import Method from "../../../../utils/methods";
import APICallService from "../../../../api/apiCallService";
import {USER} from "../../../../api/apiEndPoints";
import {success} from "../../../../global/toast";
import Loader from "../../../../global/loader";

const ViewUser = () => {
    const navigate = useNavigate();
    const {state}: any = useLocation();
    console.log("🚀 ~ UserDetails ~ state:", state);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [showModal, setShowModal] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    const handleBack = () => {
        navigate("/user/all-users");
    };

    const handleEdit = () => {
        navigate("/user/edit-user", {state: state});
    };

    if (!state) {
        return (
            <div className="p-9 bg-light d-flex justify-content-center align-items-center" style={{minHeight: "400px"}}>
                <Card className="border bg-white shadow-sm">
                    <Card.Body className="p-6">
                        <div className="text-center">
                            <i className="bi bi-person-x fs-48 text-muted mb-3"></i>
                            <p className="fs-16 fw-500 text-muted mb-0">No user data available.</p>
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
            {loading ? (
                <div className="w-100 d-flex justify-content-center text-center" style={{minHeight: "400px"}}>
                    <Loader loading={loading} />
                </div>
            ) : (
                <>
                    <Row className="mb-0">
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
                                    <h1 className="fs-22 fw-bolder mb-0" style={{ color: '#1e3369' }}>User Details</h1>
                                </div>
                                <div className="d-flex gap-2">
                                    <Button variant="primary" size="sm" className="fs-16 fw-bold" onClick={handleEdit}>
                                        <i className="bi bi-pencil me-2"></i>
                                        Edit User
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="fs-16 fw-bold"
                                        onClick={() => {
                                            setShowModal(true);
                                            setUserId(state._id);
                                        }}
                                    >
                                        <i className="bi bi-trash me-2"></i>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Tab.Container activeKey={activeTab} onSelect={(k) => k && setActiveTab(k)}>
                        <Tab.Content>
                            {/* Overview Tab */}
                            <Tab.Pane eventKey="overview">
                                <Row className="g-6 mt-0.3">
                                    <Col md={4}>
                                        <Card className="border bg-white shadow-sm h-100">
                                            <Card.Header className="bg-light border-bottom-0 pb-0">
                                                <h5 className="fs-18 fw-bold text-dark mb-0 d-flex align-items-center">
                                                    <i className="bi bi-person-circle me-2 text-primary"></i>
                                                    Profile Picture
                                                </h5>
                                            </Card.Header>
                                            <Card.Body className="p-6">
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
                                                        {state?.profilePicture ? (
                                                            <img
                                                                src={state?.profilePicture}
                                                                className="img-fluid rounded"
                                                                alt="Profile"
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
                                    <Col md={8}>
                                        <Card className="border bg-white shadow-sm h-100">
                                            <Card.Header className="bg-light border-bottom-0 pb-0">
                                                <h5 className="fs-18 fw-bold text-dark mb-0 d-flex align-items-center">
                                                    <i className="bi bi-info-circle me-2 text-primary"></i>
                                                    User Information
                                                </h5>
                                            </Card.Header>
                                            <Card.Body className="p-6">
                                                <InfoRow
                                                    icon="bi bi-person"
                                                    label="Full Name"
                                                    value={
                                                        state?.name || "—"
                                                    }
                                                />
                                                <InfoRow
                                                    icon="bi bi-telephone"
                                                    label="Phone Number"
                                                    value={
                                                        state?.phoneCountry && state?.phone
                                                            ? `${
                                                                  state?.phoneCountry.startsWith("+")
                                                                      ? state?.phoneCountry
                                                                      : `+${state?.phoneCountry}`
                                                              } ${state.phone}`
                                                            : "—"
                                                    }
                                                />
                                                <InfoRow
                                                    icon="bi bi-envelope"
                                                    label="Email"
                                                    value={state?.email || "—"}
                                                />
                                                <InfoRow
                                                    icon="bi bi-person-badge"
                                                    label="User Type"
                                                    value={
                                                        state?.userType ? Method.getUserTypeLabel(state?.userType) : "—"
                                                    }
                                                />
                                                { state?.addressDetail && 
                                                    (
                                                        <>
                                                            <InfoRow
                                                                icon="bi bi-geo-alt"
                                                                label="Address"
                                                                value={state?.addressDetail?.address || "—"}
                                                            />
                                                            <InfoRow
                                                                icon="fa-solid fa-city"
                                                                label="City"
                                                                value={state?.addressDetail?.city || "—"}
                                                            />
                                                            <InfoRow
                                                                icon="bi bi-upc"
                                                                label="Pincode"
                                                                value={state?.addressDetail?.pincode || "—"}
                                                            />
                                                        </>
                                                    )
                                                }
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </>
            )}
        </div>
    );
};

export default ViewUser;