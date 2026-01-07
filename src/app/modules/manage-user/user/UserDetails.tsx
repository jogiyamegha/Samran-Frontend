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
// import UserSitesJobs from "./components/UserSitesJobs";
// import UserTimeLogs from "./components/UserTimeLogs";

const UserDetails = () => {
    const navigate = useNavigate();
    const {state}: any = useLocation();
    console.log("🚀 ~ UserDetails ~ state:", state);
    const [userId, setUserId] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [selectedJobForTimeLogs, setSelectedJobForTimeLogs] = useState<string | null>(null);
    const [selectedJobName, setSelectedJobName] = useState<string | null>(null);
    const [selectedSiteName, setSelectedSiteName] = useState<string | null>(null);

    const handleDeleteUser = async (userId: string | null) => {
        if (!userId) {
            setShowModal(false);
            return;
        }
        setLoading(true);
        const apiService = new APICallService(USER.DELETEUSER, userId);
        const response = await apiService.callAPI();
        if (response) {
            success("User has been deleted successfully");
            navigate("/manage-users/all-users");
        }
        setLoading(false);
    };

    const handleBack = () => {
        navigate("/manage-users/all-users");
    };

    const handleEdit = () => {
        navigate("/manage-users/edit-user", {state: state});
    };

    const handleJobSelect = (jobId: string, jobName: string, siteName: string) => {
        setSelectedJobForTimeLogs(jobId);
        setSelectedJobName(jobName);
        setSelectedSiteName(siteName);
        setActiveTab("time-logs");
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

    return (
        <div className="p-9 bg-light">
            {loading ? (
                <div className="w-100 d-flex justify-content-center text-center" style={{minHeight: "400px"}}>
                    <Loader loading={loading} />
                </div>
            ) : (
                <>
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
                                    <h1 className="fs-22 fw-bolder mb-0">Employee Details</h1>
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
                        <Row>
                            <Col xs={12}>
                                <Nav variant="tabs" className="border-bottom mb-4">
                                    <Nav.Item>
                                        <Nav.Link eventKey="overview" className="fs-16 fw-600">
                                            <i className="bi bi-info-circle me-2"></i>
                                            Overview
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="sites-jobs" className="fs-16 fw-600">
                                            <i className="bi bi-building me-2"></i>
                                            Sites & Jobs
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="time-logs" className="fs-16 fw-600">
                                            <i className="bi bi-clock-history me-2"></i>
                                            Time Logs
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                        </Row>

                        <Tab.Content>
                            {/* Overview Tab */}
                            <Tab.Pane eventKey="overview">
                                <Row className="g-6 mt-4">
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
                                                        {state.image ? (
                                                            <img
                                                                src={state.image}
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
                                                    Employee Information
                                                </h5>
                                            </Card.Header>
                                            <Card.Body className="p-6">
                                                <InfoCard
                                                    icon="bi bi-person"
                                                    label="Full Name"
                                                    value={
                                                        `${state?.firstName || ""} ${state?.lastName || ""}`.trim() ||
                                                        "—"
                                                    }
                                                />
                                                <InfoCard
                                                    icon="bi bi-telephone"
                                                    label="Phone Number"
                                                    value={
                                                        state?.countryCode && state?.phone
                                                            ? `${
                                                                  state.countryCode.startsWith("+")
                                                                      ? state.countryCode
                                                                      : `+${state.countryCode}`
                                                              } ${state.phone}`
                                                            : "—"
                                                    }
                                                />
                                                <InfoCard
                                                    icon="bi bi-envelope"
                                                    label="Email"
                                                    value={state?.email || "—"}
                                                />
                                                <InfoCard
                                                    icon="bi bi-person-badge"
                                                    label="User Type"
                                                    value={
                                                        state?.userType ? Method.getUserTypeLabel(state.userType) : "—"
                                                    }
                                                />
                                                <InfoCard
                                                    icon="bi bi-credit-card"
                                                    label="Payroll ID"
                                                    value={state?.sagePayrollCode || "—"}
                                                />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Tab.Pane>

                            {/* Sites & Jobs Tab */}
                            <Tab.Pane eventKey="sites-jobs">
                                <div className="mt-4">
                                    <UserSitesJobs userId={state?._id || ""} onJobSelect={handleJobSelect} />
                                </div>
                            </Tab.Pane>

                            {/* Time Logs Tab */}
                            <Tab.Pane eventKey="time-logs">
                                <div className="mt-4">
                                    <UserTimeLogs
                                        userId={state?._id || ""}
                                        selectedJobId={selectedJobForTimeLogs}
                                        selectedJobName={selectedJobName}
                                        selectedSiteName={selectedSiteName}
                                        onBackToJobs={() => setActiveTab("sites-jobs")}
                                    />
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </>
            )}
            <DeleteModal
                show={showModal}
                onHide={() => setShowModal(false)}
                handleDelete={() => handleDeleteUser(userId)}
                itemName={"User"}
            />
        </div>
    );
};

export default UserDetails;
