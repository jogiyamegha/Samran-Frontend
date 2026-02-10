import React, {useEffect, useState} from "react";
import {Button, Card, Col, Dropdown, FormLabel, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {KTSVG} from "../../../_admin/helpers";
import Loader from "../../../global/loader";
import {PAGE_LIMIT, PlantStatus, PropertyTypes} from "../../../utils/constants";
import Pagination from "../../../global/pagination";
import ThreeDots from "../../../_admin/assets/media/svg/threeDots.svg";
import {CustomSelectTable} from "../../custom/select/CustomSelectTable";
import APICallService from "../../../api/apiCallService";
import {PLANT, USER} from "../../../api/apiEndPoints";
import {PLANTAPIJSON} from "../../../api/apiJSON/plant";
import {useDebounce} from "../../../utils/useDebounce";
import {IListPlant} from "../../../types";
import AddIcon from "../../../_admin/assets/media/svg/add.svg";
import { USERAPIJSON } from "../../../api/apiJSON/user";
import { CustomSelectWhite } from "../../custom/select/CustomSelectWhite";
import Method from '../../../utils/methods';
import PlantActionModal from "./PlantActionModal";
import { success } from "../../../global/toast";
import DeleteModal from "../../modals/DeleteModal";
 
const Plants = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [plants, setPlants] = useState<IListPlant[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [showModel, setShowModel] = useState<boolean>(false);
    const [plantId, setPlantId] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | undefined>(undefined);
    const [pageLimit, setPageLimit] = useState(PAGE_LIMIT);
    const [searchTerm, setSearchTerm] = useState('');
    const [plantStatus, setPlantStatus] = useState<number | undefined>(undefined);
    const [plantUniqueName, setPlantUniqueName] = useState<string | null>(null);
    const [rejectionReason, setRejectionReason] = useState<string | null>(null);

    const [propertyType, setPropertyType] = useState<number | undefined>(undefined);
    const [userOptions, setUserOptions] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
    const [actionType, setActionType] = useState<number | undefined>(undefined);
  
    useEffect(() => {
        const fetchUsers = async () => {
            fetchUsersData(page, pageLimit, searchTerm)
        };
        fetchUsers();
    }, []);

    const fetchUsersData = async (pageNo: number, limit: number, searchTerm: string = '') => {
        setLoading(true);
        const params = {
            page: pageNo,
            limit: limit,
            sortKey: '_createdAt',
            sortOrder: -1,
            needCount: true,
            searchTerm: searchTerm ? searchTerm : undefined,
        }
        const apiService = new APICallService(USER.LISTUSER, USERAPIJSON.listUser(params));
        const response = await apiService.callAPI();
        if (response && response.records) {
            const options = response.records.map((user: any) => ({
                value: user._id,
                label: `${user.name}`
            }));
            setUserOptions(options);
        }
    }

    useEffect(() => {
        fetchPlants(page, pageLimit, searchTerm, userId, plantStatus, propertyType);
    }, [] );

    const fetchPlants = async  (
        pageNo: number,
        limit: number,
        searchTerm: string = '',
        userId: string = '',
        plantStatus?: number | undefined,
        propertyType?: number | undefined
    ) => {
        setLoading(true);
        let params = {
            page: pageNo,
            limit: limit,
            sortKey: '_createdAt',
            sortOrder: 1,
            needCount: true,
            searchTerm: searchTerm ? searchTerm : undefined,
            userId: userId ? userId : undefined,
            plantStatus: plantStatus ? plantStatus : undefined,
            propertyType: propertyType ? propertyType : undefined
        }

        let apiService = new APICallService(
            PLANT.LISTPLANT,
            PLANTAPIJSON.listPlant(params)
        );

        let response = await apiService.callAPI();
        if(response) {
            setTotalRecords(response.total);
            setPlants(response.records);
        }
        setLoading(false);
    };

    const debouncedSearch = useDebounce(fetchPlants, 400);

    const handleSearch = async (value: string) => {
        setSearchTerm(value.trimStart());
        setPage(1);
        setLoading(true);
        setTotalRecords(0);
        await fetchPlants(1, pageLimit, value, userId, plantStatus, propertyType);
    };  

    const handleSelectChange = (eventKey: string | number | undefined | null) => {
        const newUserId = eventKey ? eventKey.toString() : undefined;
        setUserId(newUserId);
        setPage(1);
        fetchPlants(page, pageLimit, searchTerm, newUserId, plantStatus, propertyType);
    };
    
    const handleSelectPlantStatusChange = (eventKey: number | undefined) => {
        const plantStatus = eventKey ? eventKey : undefined;
        setPlantStatus(plantStatus);
        setPage(1);
        fetchPlants(page, pageLimit, searchTerm, userId, plantStatus, propertyType);
    };
    
    const handleSelectPropertyTypeChange = (eventKey: number | undefined) => {
        const propertyType = eventKey ? eventKey : undefined;
        setPropertyType(propertyType);
        setPage(1);
        fetchPlants(page, pageLimit, searchTerm, userId, plantStatus, propertyType);
    };
    const handleCurrentPage = async (val: number) => {
        if (val === page || val.toString() === '...') return;
        setPage(val);
        await fetchPlants(
            val,
            pageLimit,
            searchTerm,
            userId,
            plantStatus,
            propertyType
        );
    }

    const handleNextPage = async (val: number) => {
        setPage(val + 1);
        await fetchPlants(
            val + 1,
            pageLimit,
            searchTerm,
            userId,
            plantStatus,
            propertyType
        );
    };

    const handlePreviousPage = async (val: number) => {
        setPage(val - 1);
        await fetchPlants(
            val - 1,
            pageLimit,
            searchTerm,
            userId,
            plantStatus,
            propertyType
        );
    };

    const handlePageLimit = async (event: any) => {
        setPage(1);
        setPageLimit(+event.target.value);
        await fetchPlants(
            1,
            +event.target.value,
            searchTerm,
            userId,
            plantStatus,
            propertyType
        );
    }

    const handleActionClick = (leaveId: string) => {
        setSelectedPlantId(leaveId);
        setShowModal(true);
    };

 
    const handleActionSubmit = async (data: {
        actionType: 2 | 3;
        reason?: string;
        plantName?: string;
    }) => {
        if (!selectedPlantId) return;

        const { actionType, reason, plantName } = data;

        setLoading(true);

        const apiService = new APICallService(
            PLANT.PLANTSTATUSUPDATE,
            PLANTAPIJSON.ApproveRejectPlant({
                _id: selectedPlantId,
                plantStatus: actionType,
                plantUniqueName: actionType === 2 ? plantName ?? null : null,
                rejectionReason: actionType === 3 ? reason ?? null : null,
            }),
            { _id: selectedPlantId }
        );

        const response = await apiService.callAPI();
        if (response) {
            success(
                `Plant ${actionType === 2 ? "approved" : "rejected"} successfully`
            );

            await fetchPlants(
                page,
                pageLimit,
                searchTerm,
                userId,
                plantStatus,
                propertyType
            );
        }

        setShowModal(false);
        setLoading(false);
    };

    const handleDeletePlant = async (plantId: string | null) => {
        if (!plantId) {
            setShowModal(false);
            return;
        }
        setLoading(true);
        const apiService = new APICallService(PLANT.DELETEPLANT, plantId);
        const response = await apiService.callAPI();
        if (response) {
            success("Plant has been deleted successfully");
            await fetchPlants(page, pageLimit);
        }
        setLoading(false);
    };

    const handlePlantOption = async (
        event: any,
        index: number,
        plant: any
    ) => {
        switch (event.value) {
            case 1:
                navigate('/plant/view-details', { state: plant });
                break;

            case 3:
                setShowModel(true);
                setPlantId(plant._id);
                break;

            default:
                break;
        }
    };

    return (
        <div className="p-9 bg-light">
            <Row className="align-items-center">
                <Col xs={12} className="mb-4">
                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center">
                            <h1 className="fs-22 mt-2 pb-0 fw-bolder">Plants</h1>
                            <div className="badge badge-primary ms-3 rounded-pill">
                                <span className="p-1 fs-14 text-white">{totalRecords}</span>
                            </div>
                        </div>
                        <Button
                            variant="primary"
                            className="fs-14 fw-bold btn-lg d-flex" 
                            onClick={() => navigate('/plant/add-plant')}
                        >
                            <img
                                src={AddIcon}
                                alt="Add"
                                className="me-2"
                                width={18}
                                height={18}
                            />
                            <span className="fs-14 fw-700">Add Plant</span>
                        </Button>
                    </div>
                </Col>
                <Col xs={12} className="mb-4">
                    <Row className="align-items-end g-5">
                        <Col>
                            <div className="position-relative flex-grow-1 d-flex align-items-center w-sm-300px w-md-375px w-lg-300px">
                                <KTSVG
                                    path="/media/icons/duotune/general/gen021.svg"
                                    className="svg-icon-3 position-absolute ms-3"
                                />
                                <input
                                    type="text"
                                    id="kt_filter_search"
                                    className="form-control form-control-white min-h-20px form-control-lg ps-10"
                                    placeholder="Search by Address, city, state"
                                    value={searchTerm}
                                    onChange={(event) => handleSearch(event.target.value)}
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} className="mb-4">
                    <Row className="align-items-end g-5">
                        <Col sm={4} xl={3}>
                            <FormLabel className="fs-14 fw-300 text-grey">
                                Property Type
                            </FormLabel>
                            <Dropdown
                                onSelect={(eventKey) =>
                                    handleSelectPropertyTypeChange(eventKey ? parseInt(eventKey) : undefined)
                                }
                            >
                                <Dropdown.Toggle
                                    variant="white"
                                    className="form-control bg-white min-h-20px fs-14 min-w-md-28px min-w-175px text-10px border border-3px border-radius-15px"
                                    id="dropdown-user-type"
                                >
                                    {propertyType
                                        ? Method.getPropertyTypeLabel(propertyType)
                                        : 'Select Property Type'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    className="border border-3px border-radius-15px"
                                    style={{ padding: '8px 0', minWidth: '100%' }}
                                >
                                    <Dropdown.Item
                                        eventKey="1"
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
                                        Housing Society
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
                                        Manufacturing Unit
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
                        <Col sm={4} xl={3}>
                            <FormLabel className="fs-14 fw-300 text-grey">
                                Plant Status
                            </FormLabel>
                            <Dropdown
                                onSelect={(eventKey) =>
                                    handleSelectPlantStatusChange(eventKey ? parseInt(eventKey) : undefined)
                                }
                            >
                                <Dropdown.Toggle
                                    variant="white"
                                    className="form-control bg-white min-h-20px fs-14 min-w-md-288px min-w-175px text-start border border-3px border-radius-15px"
                                    id="dropdown-user-type"
                                >
                                    {plantStatus
                                        ? Method.getPlantStatusLabel(plantStatus)
                                        : 'Select Plant Status'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    className="border border-3px border-radius-15px"
                                    style={{ padding: '8px 0', minWidth: '100%' }}
                                >
                                    <Dropdown.Item
                                        eventKey="1"
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
                                        Submitted
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
                                        Approved
                                    </Dropdown.Item>
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
                                        Rejected
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
                        <Col sm={4} xl={3}>
                            <FormLabel className="fs-14 fw-300 text-grey">User</FormLabel>
                            <CustomSelectWhite
                                placeholder="Select User"
                                options={[
                                    ...userOptions,
                                    { value: undefined, label: "Clear Filter" }, // Acts as clear option
                                ]}
                                isMulti={false}
                                onChange={(selected: any) => {
                                    handleSelectChange(selected ? selected.value : undefined);
                                }}
                                value={
                                    userId
                                        ? userOptions.find((option) => option.value === userId) || null
                                        : null
                                    }
                                minHeight="20px"
                                controlFontSize="14px"
                                fontWeight="200"
                            />
                        </Col>
                    </Row>
                </Col>

                <Col>
                    {/* <Card className="border border-r20px mt-4">
                        <Card.Body className="p-0"> */}
                            <div className="table-responsive">
                                <table className="table table-rounded table-row-bordered align-middle gs-7 gy-2.5">
                                    <thead className="bg-header-table">
                                        <tr className="fw-bold fs-14 fw-600 border-bottom h-60px align-middle">
                                        <th className="min-w-150px text-center">Plant Id</th>
                                        <th className="min-w-150px text-center">Plant Name</th>
                                        <th className="min-w-150px text-center">User Name</th>
                                        <th className="min-w-160px text-center">Property Type</th>
                                        <th className="min-w-160px text-center">Property Address</th>
                                        <th className="min-w-160px text-center">City</th>
                                        <th className="min-w-160px text-center">Plant Status</th>
                                        <th className="min-w-160px text-center">Bill Amount</th>
                                        <th className="min-w-160px text-center">Electricity Rate</th>
                                        <th className="min-w-150px text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan={4}>
                                                <div className="w-100 d-flex justify-content-center text-center ">
                                                    <Loader loading={loading} />
                                                </div>
                                                </td>
                                            </tr>
                                        ) : (
                                        <>
                                            {plants.length === 0 && !loading ? (
                                                <tr>
                                                    <td colSpan={4}>
                                                    <div className="w-100 d-flex justify-content-center text-center">
                                                        <div className="fw-bold fs-18">
                                                            No Plants Found!
                                                        </div>
                                                    </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                <>
                                                    {plants.map((plant, index) => (
                                                        <tr 
                                                            key={index} 
                                                            className=""
                                                        >
                                                            <td 
                                                                onClick={() =>
                                                                    navigate(
                                                                        '/plant/view-details',
                                                                        {
                                                                            state: plant,
                                                                        }
                                                                    )
                                                                }
                                                                className="fs-15 fw-500 text-center"
                                                                style={{cursor: 'pointer'}}
                                                            >
                                                                {plant?.plantUniqueId}
                                                            </td>
                                                            <td className="fs-15  fw-500 text-center">
                                                                {plant?.plantUniqueName || '-'}
                                                            </td>
                                                            <td className="fs-15 fw-500 text-center">
                                                                {plant?.userDetails?.name}
                                                            </td>
                                                            <td className="fs-14 fw-500 text-center">
                                                                {
                                                                    // Object.keys(PropertyTypes).find(
                                                                    //     key => PropertyTypes[key as keyof typeof PropertyTypes] ===
                                                                    //         plant?.propertyAddress?.propertyType
                                                                    // ) ?? "—"

                                                                    Method.getPropertyTypeLabel(
                                                                        plant?.propertyAddress?.propertyType
                                                                    ) ?? "—"
                                                                }
                                                            </td>
                                                            <td className="fs-14 fw-500 text-center">
                                                                {plant?.propertyAddress?.address}
                                                            </td>
                                                            <td className="fs-14 fw-500 text-center">
                                                                {plant?.propertyAddress?.city}
                                                            </td> 
                                                            <td className="fs-14 fw-500 text-center">
                                                                <span
                                                                    style={Method.plantStatusBadgeColor(plant?.plantStatus)}
                                                                    className="px-3 py-1 rounded"
                                                                >
                                                                    {
                                                                        Method.getPlantStatusLabel(
                                                                            plant?.plantStatus 
                                                                        ) ?? '-'
                                                                    }
                                                                </span>
                                                            </td>

                                                            <td className="fs-14 fw-500 text-center">
                                                                {plant?.propertyAddress?.billAmount}
                                                            </td> 
                                                            <td className="fs-14 fw-500 text-center">
                                                                {plant?.propertyAddress?.electricityRate}
                                                            </td>
                                                            <td className="text-center">
                                                                {plant?.plantStatus === PlantStatus.Submitted ? (
                                                                    <Button
                                                                        variant="primary"
                                                                        size="sm"
                                                                        className="border-black-2px"
                                                                        onClick={() => handleActionClick(plant._id)}
                                                                    >
                                                                        Action
                                                                    </Button>
                                                                ) : (
                                                                    <Button
                                                                        variant="primary"
                                                                        size="sm"
                                                                        className="border-black-2px"
                                                                        disabled={true}
                                                                    >
                                                                        Action
                                                                    </Button>
                                                                )}
                                                                {/* <CustomSelectTable
                                                                    backgroundColor="white"
                                                                    marginLeft={'0px'}
                                                                    width={'auto'}
                                                                    placeholder={
                                                                    <img
                                                                        src={ThreeDots}
                                                                        width={32}
                                                                        height={32}
                                                                        alt=""
                                                                    />
                                                                    }
                                                                    onChange={(event: any) => {
                                                                        handlePlantOption(
                                                                            event,
                                                                            index,
                                                                            plant
                                                                        );
                                                                    }}
                                                                    options={[
                                                                        {
                                                                            label: (
                                                                                <button className="btn btn-link fs-14 fw-500 text-black w-100 d-flex justify-content-center align-items-center py-3"
                                                                                    onClick={() =>
                                                                                    navigate(
                                                                                        '/plant/view-details',
                                                                                        {
                                                                                            state: plant,
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
                                                                            <button className="btn btn-link fs-14 fw-500 text-danger w-100 d-flex justify-content-center align-items-center py-3">
                                                                                Delete
                                                                            </button>
                                                                            ),
                                                                            value: 3,
                                                                        },
                                                                    ]}
                                                                /> */}
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
            <PlantActionModal
                show={showModal}
                onHide={() => setShowModal(false)}
                plantId={selectedPlantId}
                onSubmit={handleActionSubmit}
                loading={loading}
            />
            
        </div>
    );
}

export default Plants;