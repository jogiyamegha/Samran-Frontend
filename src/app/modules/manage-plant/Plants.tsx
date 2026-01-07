import React, {useEffect, useState} from "react";
import {Button, Card, Col, FormLabel, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {KTSVG} from "../../../_admin/helpers";
import Loader from "../../../global/loader";
import {PAGE_LIMIT} from "../../../utils/constants";
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
    const [userOptions, setUserOptions] = useState<any[]>([]);

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
        fetchPlants(page, pageLimit);
    }, [] );

    const fetchPlants = async  (
        pageNo: number,
        limit: number,
        searchTerm: string = '',
        userId: string | undefined = undefined,
    ) => {
        setLoading(true);
        let params = {
            page: pageNo,
            limit: limit,
            sortKey: '_createdAt',
            sortOrder: -1,
            needCount: true,
            searchTerm: searchTerm ? searchTerm : undefined,
            // userId: userId ? userId : undefined,
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
        // value = value.trimStart();
        // const regex = /^(\S+( \S+)*)? ?$/;
        // const isValid = regex.test(value);
        // if (!isValid) {
        //     return;
        // }
        setSearchTerm(value.trimStart());
        setPage(1);
        setLoading(true);
        setTotalRecords(0);
        await fetchPlants(1, pageLimit, value);
    };  

    const handleSelectChange = (eventKey: string | number | undefined | null) => {
        const newUserId = eventKey ? eventKey.toString() : undefined;
        setUserId(newUserId);
        setPage(1);
        fetchPlants(1, pageLimit, searchTerm, newUserId);
    };
    const handleCurrentPage = async (val: number) => {
        if (val === page || val.toString() === '...') return;
        setPage(val);
        await fetchPlants(
            val,
            pageLimit,
            searchTerm,
            userId,
        );
    }

    const handleNextPage = async (val: number) => {
        setPage(val + 1);
        await fetchPlants(
            val + 1,
            pageLimit,
            searchTerm,
            userId,
        );
    };

    const handlePreviousPage = async (val: number) => {
        setPage(val - 1);
        await fetchPlants(
            val - 1,
            pageLimit,
            searchTerm,
            userId,
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
        );
    }

    const handlePlantOption = async (
        event: any,
        index: number,
        plant: any
    ) => {
        switch (event.value) {
            case 1:
                navigate('/plant/all-plants/view-details', { state: plant });
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
                <Col
                    xs={12}
                    className="mb-4"
                >
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center">
                        <h1 className="fs-22 mt-2 fw-bolder">Plants</h1>
                        <div className="badge badge-primary ms-3 rounded-pill">
                            <span className="p-1 fs-14 text-white">{totalRecords}</span>
                        </div>
                    </div>
                    <Button
                        variant="primary"
                        className="fs-16 fw-bold btn-lg"
                        onClick={() => navigate('/plant/all-plants/add-plant')}
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
                
                <Col
                    xs={12}
                    className="mb-4"
                >
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
                                    className="form-control form-control-white min-h-60px form-control-lg ps-10"
                                    placeholder="Search by certificate title or user name"
                                    value={searchTerm}
                                    onChange={(event) => handleSearch(event.target.value)}
                                />
                            </div>
                        </Col>
                        
                        <Col sm={4} xl={3}>
                            <FormLabel className="fs-16 fw-500 text-dark">User</FormLabel>
                            <CustomSelectWhite
                                placeholder="Select User"
                                options={[
                                    ...userOptions,
                                    // { value: undefined, label: "Clear Filter" }, // Acts as clear option
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
                                    minHeight="60px"
                                    controlFontSize="14px"
                                    fontWeight="500"
                                />
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
                                    <th className="min-w-150px text-center">User Name</th>
                                    <th className="min-w-160px text-center">Property Type</th>
                                    <th className="min-w-160px text-center">Property Address</th>
                                    <th className="min-w-160px text-center">City</th>
                                    <th className="min-w-160px text-center">Bill Amount</th>
                                    <th className="min-w-160px text-center">Electricity Rate</th>
                                    <th className="min-w-150px text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                    <tr>
                                        <td colSpan={4}>
                                        <div className="w-100 d-flex justify-content-center text-center">
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
                                                            className="fs-15 fw-500 text-center"
                                                            onClick={() =>
                                                                navigate(
                                                                    '/plant/view-details',
                                                                    {
                                                                        state: plant,
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            {plant?.userDetails?.name}
                                                        </td>
                                                        <td className="fs-14 fw-500 text-center">
                                                            {plant?.propertyAddress?.propertyType}
                                                        </td>
                                                        <td className="fs-14 fw-500 text-center">
                                                            {plant?.propertyAddress?.address}
                                                        </td>
                                                        <td className="fs-14 fw-500 text-center">
                                                            {plant?.propertyAddress?.city}
                                                        </td>
                                                        <td className="fs-14 fw-500 text-center">
                                                            {plant?.propertyAddress?.billAmount}
                                                        </td> 
                                                        <td className="fs-14 fw-500 text-center">
                                                            {plant?.propertyAddress?.electricityRate}
                                                        </td>
                                                        <td className="text-center">
                                                            <CustomSelectTable
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
                                                                        <button className="btn btn-link fs-14 fw-500 text-black w-100 d-flex justify-content-center align-items-center py-3">
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
        </div>
    );
}

export default Plants;