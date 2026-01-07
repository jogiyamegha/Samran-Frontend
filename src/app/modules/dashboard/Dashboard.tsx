import React, {useState, useEffect} from "react";
import {Col, Row} from "react-bootstrap";
import studentIcon from "../../../_admin/assets/media/svg/studentCount.svg";
import boxIcon from "../../../_admin/assets/media/svg/boxCount.svg";
import hourIcon from "../../../_admin/assets/media/svg/hourCount.svg";
import {useNavigate} from "react-router-dom";
import APICallService from "../../../api/apiCallService";
import {DASHBOARD} from "../../../api/apiEndPoints";
import Loader from "../../../global/loader";

const Dashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState({
        totalUsers: 0,
        totalPlants: 0,
        totalApprovedPlants: 0,
        totalPpa: 0,
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const apiService = new APICallService(DASHBOARD.GET_DASHBOARD_DATA);
            const response = await apiService.callAPI();
            if (response) {
                setDashboardData({
                    totalUsers : response.totalUsers || 0,
                    totalPlants : response.totalPlants || 0,
                    totalApprovedPlants : response.totalApprovedPlants || 0,
                    totalPpa : response.totalPpas || 0,
                });
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-9">
            <Row className="align-items-center">
                <Col lg={12} className="mb-6">
                    <h1>Dashboard</h1>
                </Col>
                {loading ? (
                    <div className="w-100 d-flex justify-content-center">
                        <Loader loading={loading} />
                    </div>
                ) : (
                    <Col>
                        <Row className="align-items-center gy-4">
                            <Col lg={4} md={8}>
                                <div
                                    className="p-8 rounded-3 d-flex justify-content-between align-items-center flex-wrap cursor-pointer"
                                    style={{background: "#f8ead1"}}
                                    onClick={() => {
                                        navigate("/manage-category/all-categories");
                                    }}
                                >
                                    <div
                                        className="d-flex flex-column gap-4 flex-wrap cursor-pointer"
                                        onClick={() => navigate("/manage-category/all-categories")}
                                    >
                                        <p className="mb-0 fw-medium fs-18">Total Users</p>
                                        <h3 className="fw-600 fs-32 mb-1">{dashboardData.totalUsers}</h3>
                                    </div>
                                    <div>
                                        <img src={studentIcon} height={40} width={40} alt="Categories" />
                                    </div>
                                </div>
                            </Col>

                            <Col lg={4} md={6}>
                                <div
                                    className="p-8 rounded-3 d-flex justify-content-between align-items-center flex-wrap cursor-pointer"
                                    style={{background: "#cbe3f9"}}
                                    onClick={() => {
                                        navigate("/plant/all-plants");
                                    }}
                                >
                                    <div className="d-flex flex-column gap-4 flex-wrap">
                                        <p className="mb-0 fw-medium fs-18">Total Plants</p>
                                        <h3 className="fw-600 fs-32 mb-1">{dashboardData.totalPlants}</h3>
                                    </div>
                                    <div>
                                        <img src={boxIcon} width={40} height={40} alt="Properties" />
                                    </div>
                                </div>
                            </Col>

                            <Col lg={4} md={6}>
                                <div
                                    className="p-8 rounded-3 d-flex justify-content-between align-items-center flex-wrap cursor-pointer"
                                    style={{background: "#d4f4dd"}}
                                    onClick={() => {
                                        navigate("/manage-property/approvedPlants");
                                    }}
                                >
                                    <div className="d-flex flex-column gap-4 flex-wrap">
                                        <p className="mb-0 fw-medium fs-18">Total Approved Plants</p>
                                        <h3 className="fw-600 fs-32 mb-1">{dashboardData.totalApprovedPlants}</h3>
                                    </div>
                                    <div>
                                        <img src={hourIcon} width={40} height={40} alt="Properties" />
                                    </div>
                                </div>
                            </Col>

                            <Col lg={4} md={6}>
                                <div
                                    className="p-8 rounded-3 d-flex justify-content-between align-items-center flex-wrap cursor-pointer"
                                    style={{background: "#d4dcf4ff"}}
                                    onClick={() => {
                                        navigate("/PPA/all-ppa");
                                    }}
                                >
                                    <div className="d-flex flex-column gap-4 flex-wrap">
                                        <p className="mb-0 fw-medium fs-18">Total PPA</p>
                                        <h3 className="fw-600 fs-32 mb-1">{dashboardData.totalPpa}</h3>
                                    </div>
                                    <div>
                                        <img src={hourIcon} width={40} height={40} alt="Properties" />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default Dashboard;
