import React, { useEffect, useReducer, useState } from "react";
import { Button, Card, Col, Dropdown, Form, FormLabel, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CustomSelectTable } from "../../../custom/select/CustomSelectTable";
import ThreeDots from "../../../../_admin/assets/media/svg/threeDots.svg";
import Pagination from "../../../../global/pagination";
import "react-datepicker/dist/react-datepicker.css";
import DeleteModal from "../../../modals/DeleteModal";
import CustomDateInput from "../../../custom/DateRange/CustomDateInput";
import { KTSVG } from "../../../../_admin/helpers";
import { USER } from "../../../../api/apiEndPoints";
import APICallService from "../../../../api/apiCallService";
import { USERAPIJSON } from "../../../../api/apiJSON/user";
import { ListUser } from "../../../../types/response_data/user";
import Loader from "../../../../global/loader";
import { success } from "../../../../global/toast";
import { PAGE_LIMIT, UserTypes } from "../../../../utils/constants";
import { useDebounce } from "../../../../utils/useDebounce";
import Method from "../../../../utils/methods";

const Users = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [usersData, setUsersData] = useState<ListUser[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [pageLimit, setPageLimit] = useState(PAGE_LIMIT);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [userType, setUserType] = useState<number | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            fetchUsers(page, pageLimit, searchTerm, userType);
        };
        fetchData();
    }, []);

    const fetchUsers = async (
        pageNo: number,
        limit: number,
        searchTerm: string = "",
        userType: number | undefined = undefined,
    ) => {
        setLoading(true);
        const params = {
            page: pageNo,
            limit: limit,
            sortKey: "_createdAt",
            sortOrder: -1,
            needCount: true,
            searchTerm: searchTerm,
            userType: userType ? userType : undefined,
        };
        let apiService = new APICallService(USER.LISTUSER, USERAPIJSON.listUser(params));
        let response = await apiService.callAPI();
        console.log("response", response);
        if (response) {
            // const totalRecords = response.total;
            setTotalRecords(response.total);
            setUsersData(response.records);
        }
        setLoading(false);
    };

    const debouncedSearch = useDebounce(fetchUsers, 400);
    const handleSearch = async (value: string) => {
        setSearchTerm(value.trimStart());
        setPage(1);
        setLoading(true);
        setTotalRecords(0);
        setUsersData([]);
        await fetchUsers(
            1,
            pageLimit,
            value,
            userType
        );
        setLoading(false);
    };

    const handleSelectChange = (eventKey: number | undefined) => {
        const newUserType = eventKey ? eventKey as number : undefined;
        setUserType(newUserType);
        setPage(1);
        fetchUsers(1, pageLimit, searchTerm, newUserType);
    };

    const handleCurrentPage = async (val: number) => {
        if (val === page || val.toString() === "...") return;
        setPage(val);
        await fetchUsers(val, pageLimit, searchTerm, userType);
    };
    const handleNextPage = async (val: number) => {
        setPage(val + 1);
        await fetchUsers(val + 1, pageLimit, searchTerm, userType);
    };
    const handlePreviousPage = async (val: number) => {
        setPage(val - 1);
        await fetchUsers(val - 1, pageLimit, searchTerm, userType);
    };
    const handlePageLimit = async (event: any) => {
        setPage(1);
        setPageLimit(+event.target.value);
        await fetchUsers(1, event.target.value, searchTerm, userType);
    };

    const handleUserType = (eventKey: number | null) => {
        const userType = eventKey ? eventKey : undefined;
        setUserType(userType);
        setPage(1);
        fetchUsers(page, pageLimit, searchTerm, userType)
    };

    // handle delete user (accept nullable id from state)
    const handleDeleteUser = async (userId: string | null) => {
        if (!userId) {
            // nothing to delete
            setShowModal(false);
            return;
        }
        setLoading(true);
        const apiService = new APICallService(USER.DELETEUSER, userId);
        const response = await apiService.callAPI();
        if (response) {
            success("User has been deleted successfully");
            await fetchUsers(page, pageLimit);
        }
        setLoading(false);
    };

    return (
        <div className="p-9 bg-light">
            <Row className="align-items-center">
                <Col xs={12} className="mb-4">
                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center">
                            <h1 className="fs-22 mt-2 fw-bolder">Users</h1>
                            <div className="badge badge-primary ms-3 rounded-pill">
                                <span className="p-1 fs-14 text-white">{totalRecords}</span>
                            </div>
                        </div>
                        <div className="d-flex gap-3">
                            <button
                                className="btn btn-primary fs-14 fw-bold rounded-pill px-6"
                                onClick={() => navigate("/user/add-user")}
                            >
                                <i className="fas fa-plus me-2"></i> New Investor
                            </button>
                        </div>
                    </div>
                </Col>
                <Col xs={12} className="mb-4">
                    <Row className="align-items-end g-5 mb-3">
                        <Col sm={4} xl={3}>
                            <FormLabel className="fs-16 fw-500 text-dark">Search</FormLabel>
                            <div className="position-relative flex-grow-1 d-flex align-items-center w-sm-300px w-md-200px w-lg-230px">
                                <KTSVG
                                    path="/media/icons/duotune/general/gen021.svg"
                                    className="svg-icon-3 position-absolute ms-3"
                                />
                                <input
                                    type="text"
                                    id="kt_filter_search"
                                    className="form-control form-control-white min-h-20px form-control-lg ps-10"
                                    placeholder="Search by name, email"
                                    value={searchTerm}
                                    onChange={(event) => {
                                        handleSearch(event.target.value);
                                    }}
                                />
                            </div>
                        </Col>
                        <Col sm={4} xl={3}>
                            <FormLabel className="fs-14 fw-300 text-grey">
                                UserType
                            </FormLabel>
                            <Dropdown
                                onSelect={(eventKey) =>
                                    handleUserType(eventKey ? parseInt(eventKey) : null)
                                }
                            >
                                <Dropdown.Toggle
                                    variant="white"
                                    className="form-control bg-white min-h-20px fs-14 min-w-md-28px min-w-175px text-10px border border-3px border-radius-15px"
                                    id="dropdown-user-type"
                                >
                                    {userType
                                        ? Method.getUserTypeLabel(userType)
                                        : 'Select UserType'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    className="border border-3px border-radius-15px"
                                    style={{ padding: '8px 0', minWidth: '100%' }}
                                >
                                    <Dropdown.Item
                                        eventKey="3"
                                        className="fs-14 fw-500 text-dark"
                                        style={{ padding: '12px 16px', color: '#5e6278' }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = '#1b74e4';
                                            e.currentTarget.style.backgroundColor = '#f1faff';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = '#5e6278';
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                    >
                                        Consumer
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="2"
                                        className="fs-14 fw-500 text-dark"
                                        style={{ padding: '12px 16px', color: '#5e6278' }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = '#1b74e4';
                                            e.currentTarget.style.backgroundColor = '#f1faff';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = '#5e6278';
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                    >
                                        Investor
                                    </Dropdown.Item>
                                    <Dropdown.Divider style={{ margin: '8px 0' }} />
                                    <Dropdown.Item
                                        eventKey={undefined}
                                        className="fs-14 fw-500 text-dark"
                                        style={{ padding: '12px 16px', color: '#5e6278' }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = '#1b74e4';
                                            e.currentTarget.style.backgroundColor = '#f1faff';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = '#5e6278';
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                    >
                                        Clear Filter
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    {/* <Card className="border border-r20px">
                        <Card.Body className="p-0"> */}
                    <div className="table-responsive">
                        <table className="table table-rounded table-row-bordered align-middle gs-7 gy-2.5">
                            <thead className="bg-header-table">
                                <tr className="fw-bold fs-14 fw-600 border-bottom h-50px align-middle">
                                    <th className="min-w-150px text-center">Name</th>
                                    <th className="min-w-200px text-center">Email</th>
                                    <th className="min-w-150px text-center">Phone</th>
                                    <th className="min-w-100px text-center">Role</th>
                                    <th className="min-w-150px text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={6}>
                                            <div className="w-100 d-flex justify-content-center text-center">
                                                <Loader loading={loading} />
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {usersData.length === 0 && loading === false ? (
                                            <tr>
                                                <td colSpan={6}>
                                                    <div className="w-100 d-flex justify-content-center text-center">
                                                        <div className="fw-bold fs-16">No Users Found!</div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            <>
                                                {usersData.map((user, index) => (
                                                    <tr key={index} className="">
                                                        {/* <td
                                                                    className="fs-15 fw-500 text-center"
                                                                    onClick={() =>
                                                                        navigate("/manage-users/view-details", {
                                                                            state: user,
                                                                        })
                                                                    }
                                                                >
                                                                    {user.firstName} {user.lastName}
                                                                </td> */}
                                                        <td
                                                            className="fs-15 fw-500 "
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() =>
                                                                navigate("/user/view-details", {
                                                                    state: user,
                                                                })
                                                            }
                                                        >
                                                            <div className="d-flex align-items-center">
                                                                <span className="fs-15 fw-600 ms-3">
                                                                    {user?.name}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="fs-14 fw-500 text-center">
                                                            {user?.email}
                                                        </td>
                                                        <td className="fs-14 fw-500 text-center">
                                                            +{user?.phoneCountry} {user?.phone}
                                                        </td>
                                                        <td className="fs-14 fw-500 text-center">
                                                            {Method.getUserTypeLabel(user?.userType)}
                                                        </td>
                                                        <td className="text-center">
                                                            <CustomSelectTable
                                                                backgroundColor="white"
                                                                marginLeft={"0px"}
                                                                width={"auto"}
                                                                placeholder={
                                                                    <img
                                                                        src={ThreeDots}
                                                                        width={32}
                                                                        height={32}
                                                                        alt=""
                                                                    />
                                                                }
                                                                options={[
                                                                    {
                                                                        label: (
                                                                            <button
                                                                                className="btn btn-link fs-14 fw-500 text-black ms-3 p-4"
                                                                                onClick={() =>
                                                                                    navigate(
                                                                                        "/user/user-details",
                                                                                        {
                                                                                            state: user,
                                                                                        }
                                                                                    )
                                                                                }
                                                                            >
                                                                                View details
                                                                            </button>
                                                                        ),
                                                                        value: 1,
                                                                    },
                                                                    {
                                                                        label: (
                                                                            <button
                                                                                className="btn btn-link fs-14 fw-500 text-black ms-3 p-4"
                                                                                onClick={() =>
                                                                                    navigate(
                                                                                        "/user/edit-user",
                                                                                        { state: user }
                                                                                    )
                                                                                }
                                                                            >
                                                                                Edit details
                                                                            </button>
                                                                        ),
                                                                        value: 2,
                                                                    },
                                                                    {
                                                                        label: (
                                                                            <button
                                                                                className="btn btn-link fs-14 fw-500 text-danger ms-3 p-4"
                                                                                onClick={() => {
                                                                                    setShowModal(true);
                                                                                    setUserId(user._id);
                                                                                }}
                                                                            >
                                                                                Delete
                                                                            </button>
                                                                        ),
                                                                        value: 3,
                                                                    },
                                                                ]}
                                                            // isOptionDisabled={(option: {
                                                            //   value: number;
                                                            // }) => option.value === 3}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </>
                                        )}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* </Card.Body>
                    </Card> */}
                </Col>
                {totalRecords > 0 && !loading ? (
                    <Pagination
                        totalRecords={totalRecords}
                        currentPage={page}
                        handleCurrentPage={handleCurrentPage}
                        handleNextPage={handleNextPage}
                        handlePreviousPage={handlePreviousPage}
                        handlePageLimit={handlePageLimit}
                        pageLimit={pageLimit}
                    />
                ) : (
                    <></>
                )}
            </Row>
            <DeleteModal
                show={showModal}
                onHide={() => setShowModal(false)}
                handleDelete={() => handleDeleteUser(userId)} // Pass the userId to delete
                itemName={"User"}
            />
        </div>
    );
};
export default Users;
