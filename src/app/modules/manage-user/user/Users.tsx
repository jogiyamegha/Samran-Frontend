import React, {useEffect, useReducer, useState} from "react";
import {Button, Card, Col, Dropdown, Form, FormLabel, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {CustomSelectTable} from "../../../custom/select/CustomSelectTable";
import ThreeDots from "../../../../_admin/assets/media/svg/threeDots.svg";
import Pagination from "../../../../global/pagination";
import CustomDatePicker from "../../../custom/DateRange/DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import DeleteModal from "../../../modals/DeleteModal";
import CustomDateInput from "../../../custom/DateRange/CustomDateInput";
import {KTSVG} from "../../../../_admin/helpers";
import {USER} from "../../../../api/apiEndPoints";
import APICallService from "../../../../api/apiCallService";
import {USERAPIJSON} from "../../../../api/apiJSON/user";
import {ListUser} from "../../../../types/response_data/user";
import Loader from "../../../../global/loader";
import {success} from "../../../../global/toast";
import {PAGE_LIMIT} from "../../../../utils/constants";
import {useDebounce} from "../../../../utils/useDebounce";
import Method from "../../../../utils/methods";
import AddIcon from "../../../../_admin/assets/media/svg/add.svg";
import {IMAGES} from "../../../../utils/staticJSON";

const Users = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);
    // const [dateRange, setDateRange] = useState([null, null]);
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;
    const [totalRecords, setTotalRecords] = useState(0);
    const [usersData, setUsersData] = useState<ListUser[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [pageLimit, setPageLimit] = useState(PAGE_LIMIT);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [userType, setUserType] = useState<number | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            fetchUsers(page, pageLimit, searchTerm, userType, startDate, endDate);
        };
        fetchData();
    }, []);

    const fetchUsers = async (
        pageNo: number,
        limit: number,
        searchTerm: string = "",
        userType: number | undefined = undefined,
        startDate: Date | null = dateRange[0],
        endDate: Date | null = dateRange[1]
    ) => {
        setLoading(true);
        let params = {
            page: pageNo,
            limit: limit,
            sortKey: "_createdAt",
            sortOrder: -1,
            needCount: true,
            searchTerm: searchTerm ? searchTerm : undefined,
            userType: userType ? userType : undefined,
            startDate: startDate ? startDate.toISOString() : undefined,
            endDate: endDate ? endDate.toISOString() : undefined,
        };
        let apiService = new APICallService(USER.LISTUSER, USERAPIJSON.listUser(params));
        let response = await apiService.callAPI();
        if (response) {
            // const totalRecords = response.total;
            setTotalRecords(response.total);
            setUsersData(response.records);
        }
        setLoading(false);
    };

    const debouncedSearch = useDebounce(fetchUsers, 400);
    const handleSearch = async (value: string) => {
        value = value.trimStart();
        //const regex = /^(\w+( \w+)*)( {0,1})$/;
        //const regex = /^(\w+( \w+)*)? ?$/;
        const regex = /^(\S+( \S+)*)? ?$/;
        const isValid = regex.test(value);
        if (!isValid) {
            return;
        }
        setSearchTerm(value);
        if (value.trim().length > 2 && searchTerm !== value) {
            setPage(1);
            setLoading(true);
            setTotalRecords(0);
            await debouncedSearch(1, pageLimit, value);
        } else if (value.trim().length <= 2 && value.length < searchTerm.length) {
            setPage(1);
            setLoading(true);
            setTotalRecords(0);
            await debouncedSearch(1, pageLimit, value);
        }
    };

    const handleDateFilter = async (update: [Date | null, Date | null]) => {
        setDateRange(update);
        setPage(1); // reset page
        fetchUsers(1, pageLimit, searchTerm, userType, update[0], update[1]);
    };

    const handleSelectChange = (eventKey: string | number | undefined | null) => {
        const newUserType = eventKey ? parseInt(eventKey as string) : undefined;
        setUserType(newUserType);
        setPage(1);
        fetchUsers(1, pageLimit, searchTerm, newUserType, startDate, endDate);
    };

    const handleCurrentPage = async (val: number) => {
        if (val === page || val.toString() === "...") return;
        setPage(val);
        await fetchUsers(val, pageLimit, searchTerm, userType, startDate, endDate);
    };
    const handleNextPage = async (val: number) => {
        setPage(val + 1);
        await fetchUsers(val + 1, pageLimit, searchTerm, userType, startDate, endDate);
    };
    const handlePreviousPage = async (val: number) => {
        setPage(val - 1);
        await fetchUsers(val - 1, pageLimit, searchTerm, userType, startDate, endDate);
    };
    const handlePageLimit = async (event: any) => {
        setPage(1);
        setPageLimit(+event.target.value);
        await fetchUsers(1, event.target.value, searchTerm, userType, startDate, endDate);
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

                        {/* <div className="d-flex gap-4 flex-wrap"> */}
                        <Button
                            variant="primary"
                            className="fs-16 fw-bold btn-lg"
                            onClick={() => navigate("/manage-users/add-user")}
                        >
                            <img src={AddIcon} alt="Add" className="me-2" width={18} height={18} />
                            <span className="fs-14 fw-700">Add user</span>
                            {/* <Button onClick={() => navigate("/manage-users/add-user")}>Add user</Button> */}
                            {/* </div> */}
                        </Button>
                    </div>
                </Col>
                <Col xs={12} className="mb-4">
                    <Row className="align-items-end g-5">
                        <Col sm={4} xl={3}>
                            <FormLabel className="fs-16 fw-500 text-dark">Search</FormLabel>
                            <div className="position-relative d-flex align-items-center">
                                <KTSVG
                                    path="/media/icons/duotune/general/gen021.svg"
                                    className="svg-icon-3 position-absolute ms-3"
                                />
                                <input
                                    type="text"
                                    id="kt_filter_search"
                                    className="form-control bg-white min-h-60px fs-14 fw-bold text-dark min-w-md-288px min-w-175px ps-10 border border-3px border-radius-15px"
                                    placeholder="Search by user name"
                                    onChange={(event) => {
                                        handleSearch(event.target.value);
                                    }}
                                />
                            </div>
                        </Col>
                        <Col sm={4} xl={3}>
                            <FormLabel className="fs-16 fw-500 text-dark">Filter by date</FormLabel>
                            <CustomDatePicker
                                className="form-control bg-white min-h-60px fs-14 fw-bold text-dark min-w-md-288px min-w-175px border border-3px border-radius-15px"
                                onChange={handleDateFilter}
                                selectsRange
                                startDate={startDate}
                                endDate={endDate}
                                dateFormat="dd/MM/yyyy"
                                showFullMonthYearPicker
                                maxDate={new Date()}
                                isClearable
                                placeholder="Select"
                                customInput={
                                    <CustomDateInput inputClass="bg-white border border-3px border-radius-15px" />
                                }
                            />
                        </Col>
                        <Col sm={4} xl={3}>
                            <FormLabel className="fs-16 fw-500 text-dark">User Type</FormLabel>
                            <Dropdown
                                onSelect={(eventKey) => handleSelectChange(eventKey ? parseInt(eventKey) : undefined)}
                            >
                                <Dropdown.Toggle
                                    variant="white"
                                    className="form-control bg-white min-h-60px fs-14 fw-bold text-dark min-w-md-288px min-w-175px text-start border border-3px border-radius-15px"
                                    id="dropdown-user-type"
                                >
                                    {userType ? Method.getUserTypeLabel(userType) : "Select User Type"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    className="border border-3px border-radius-15px"
                                    style={{padding: "8px 0", minWidth: "100%"}}
                                >
                                    <Dropdown.Item
                                        eventKey="2"
                                        className="fs-14 fw-500 text-dark"
                                        style={{padding: "12px 16px", color: "#5e6278"}}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = "#1b74e4";
                                            e.currentTarget.style.backgroundColor = "#f1faff";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = "#5e6278";
                                            e.currentTarget.style.backgroundColor = "transparent";
                                        }}
                                    >
                                        Supervisor
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="3"
                                        className="fs-14 fw-500 text-dark"
                                        style={{padding: "12px 16px", color: "#5e6278"}}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = "#1b74e4";
                                            e.currentTarget.style.backgroundColor = "#f1faff";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = "#5e6278";
                                            e.currentTarget.style.backgroundColor = "transparent";
                                        }}
                                    >
                                        Employee
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="4"
                                        className="fs-14 fw-500 text-dark"
                                        style={{padding: "12px 16px", color: "#5e6278"}}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = "#1b74e4";
                                            e.currentTarget.style.backgroundColor = "#f1faff";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = "#5e6278";
                                            e.currentTarget.style.backgroundColor = "transparent";
                                        }}
                                    >
                                        Sub Contractor
                                    </Dropdown.Item>
                                    <Dropdown.Divider style={{margin: "8px 0"}} />
                                    <Dropdown.Item
                                        eventKey={undefined}
                                        className="fs-14 fw-500 text-dark"
                                        style={{padding: "12px 16px", color: "#5e6278"}}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = "#1b74e4";
                                            e.currentTarget.style.backgroundColor = "#f1faff";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = "#5e6278";
                                            e.currentTarget.style.backgroundColor = "transparent";
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
                    <Card className="border border-r10px">
                        <Card.Body className="p-0">
                            <div className="table-responsive">
                                <table className="table table-rounded table-row-bordered align-middle gs-7 gy-4">
                                    <thead>
                                        <tr className="fw-bold fs-14 fw-600 text-dark border-bottom h-70px align-middle">
                                            <th className="min-w-150px text-center">Name</th>
                                            <th className="min-w-200px text-center">Email</th>
                                            <th className="min-w-150px text-center">Phone</th>
                                            <th className="min-w-100px text-center">Role</th>
                                            <th className="min-w-100px text-center">Payroll ID</th>
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
                                                                    className="fs-15 fw-500"
                                                                    onClick={() =>
                                                                        navigate("/manage-users/view-details", {
                                                                            state: user,
                                                                        })
                                                                    }
                                                                >
                                                                    <div className="d-flex align-items-center">
                                                                        <img
                                                                            src={user?.image || IMAGES.DefaultImage}
                                                                            alt={`${user?.firstName} ${user?.lastName}`}
                                                                            className="rounded-circle"
                                                                            width="35"
                                                                            height="35"
                                                                            style={{objectFit: "cover"}}
                                                                        />
                                                                        <span className="fs-15 fw-600 ms-3">
                                                                            {user?.firstName} {user?.lastName}
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="fs-14 fw-500 text-center">
                                                                    {user?.email}
                                                                </td>
                                                                <td className="fs-14 fw-500 text-center">
                                                                    {user?.countryCode} {user?.phone}
                                                                </td>
                                                                <td className="fs-14 fw-500 text-center">
                                                                    {Method.getUserTypeLabel(user?.userType)}
                                                                </td>
                                                                <td className="fs-14 fw-500 text-center text-center">
                                                                    {user?.sagePayrollCode}
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
                                                                                                "/manage-users/view-details",
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
                                                                                                "/manage-users/edit-user",
                                                                                                {state: user}
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
                        </Card.Body>
                    </Card>
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
