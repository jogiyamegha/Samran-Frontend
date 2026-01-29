import {useEffect, useState} from "react";
import {Button, Card, Col, FormLabel, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {KTSVG} from "../../../_admin/helpers";
import Loader from "../../../global/loader";
import {PAGE_LIMIT} from "../../../utils/constants";
import Pagination from "../../../global/pagination";
import ThreeDots from "../../../_admin/assets/media/svg/threeDots.svg";
import {CustomSelectTable} from "../../custom/select/CustomSelectTable";
import APICallService from "../../../api/apiCallService";
import {Bill, PPA} from "../../../api/apiEndPoints";
import {BILLAPIJSON} from "../../../api/apiJSON/bill";
import {useDebounce} from "../../../utils/useDebounce";
import {IListBill} from "../../../types";
import AddIcon from "../../../_admin/assets/media/svg/add.svg";
import { CustomSelectWhite } from "../../custom/select/CustomSelectWhite";
import { PPAAPIJSON } from "../../../api/apiJSON/ppa";
import Method from "../../../utils/methods";
 
const Bills = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [showModel, setShowModel] = useState<boolean>(false);
    const [bills, setBills] = useState<IListBill[]>([]);
    const [billId, setBillId] = useState<string | null>(null);
    const [ppaId, setppaId] = useState<string | undefined>(undefined);
    const [pageLimit, setPageLimit] = useState(PAGE_LIMIT);
    const [searchTerm, setSearchTerm] = useState('');
    const [ppas, setPpas] = useState<any[]>([]);

    useEffect(() => {
        const fetchPpas = async () => {
            fetchPpaData(page, pageLimit, searchTerm)
        };
        fetchPpas();
    }, []);

    const fetchPpaData = async (pageNo: number, limit: number, searchTerm: string = '') => {
        setLoading(true);
        const params = {
            page: pageNo,
            limit: limit,
            sortKey: '_createdAt',
            sortOrder: -1,
            needCount: true,
            searchTerm: searchTerm ? searchTerm : undefined,
            isSigned: true
        }
        const apiService = new APICallService(PPA.LISTPPA, PPAAPIJSON.listPpa(params));
        const response = await apiService.callAPI();
        if (response && response.records) {
            const options = response.records.map((ppa: any) => ({
                value: ppa._id,
                label: `${ppa.name}`
            }));
            setPpas(options);
        }
    }

    useEffect(() => {
        fetchBills(page, pageLimit);
    }, [] );

    const fetchBills = async  (
        pageNo: number,
        limit: number,
        searchTerm: string = '',
        // ppaId?: string ,
    ) => {
        setLoading(true);
        try {
            let params = {
                page: pageNo,
                limit: limit,
                sortKey: '_createdAt',
                sortOrder: -1,
                needCount: true,
                searchTerm: searchTerm ? searchTerm : undefined,
            }

            let apiService = new APICallService(
                Bill.LISTBILL,
                params
            );
    
            let response = await apiService.callAPI();
            if(response) {
                setTotalRecords(response.total);
                setBills(response.records);
            }
        } catch (error) {
            console.error("Error fetching Bills: ", error);
            setBills([]);
            setTotalRecords(0);
        }
        setLoading(false);
    };

    const debouncedSearch = useDebounce(fetchBills, 400);

    const handleSearch = async (value: string) => {
        setSearchTerm(value.trimStart());
        setPage(1);
        setLoading(true);
        setTotalRecords(0);
        await fetchBills(1, pageLimit, value);
    };  

    const handlePpaFilter = (eventKey: string | null) => {
        const newId = eventKey || undefined;
        setppaId(newId);
        fetchBills(1, pageLimit, searchTerm)
    }

    const handleCurrentPage = async (val: number) => {
        if (val === page || val.toString() === '...') return;
        setPage(val);
        await fetchBills(
            val,
            pageLimit,
            searchTerm,
        );
    }

    const handleNextPage = async (val: number) => {
        setPage(val + 1);
        await fetchBills(
            val + 1,
            pageLimit,
            searchTerm,
        );
    };

    const handlePreviousPage = async (val: number) => {
        setPage(val - 1);
        await fetchBills(
            val - 1,
            pageLimit,
            searchTerm,
        );
    };

    const handlePageLimit = async (event: any) => {
        setPage(1);
        setPageLimit(+event.target.value);
        await fetchBills(
            1,
            +event.target.value,
            searchTerm,
        );
    }

    const handleBillOption = async (
        event: any,
        index: number,
        bill: any
    ) => {
        switch (event.value) {
            case 1:
                navigate('/bill/view-details', { state: bill });
                break;

            case 3:
                setShowModel(true);
                setBillId(bill._id);
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
                        <h1 className="fs-22 mt-2 fw-bolder">Bills</h1>
                        <div className="badge badge-primary ms-3 rounded-pill">
                            <span className="p-1 fs-14 text-white">{totalRecords}</span>
                        </div>
                    </div>
                    <Button
                        variant="primary"
                        className="fs-16 fw-bold btn-lg"
                        onClick={() => navigate('/bill/add-bill')}
                    >
                        <img
                            src={AddIcon}
                            alt="Add"
                            className="me-2"
                            width={18}
                            height={18}
                        />
                        <span className="fs-14 fw-700">Add Bill</span>
                    </Button>
                </div>
                </Col>
                
                {/* <Col
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
                                    placeholder="Search by Address, city, state"
                                    value={searchTerm}
                                    onChange={(event) => handleSearch(event.target.value)}
                                />
                            </div>
                        </Col>
                    </Row>
                </Col> */}
                
                <Col>
                <Card className="border border-r10px">
                    <Card.Body className="p-0">
                        <div className="table-responsive">
                            <table className="table table-rounded table-row-bordered align-middle gs-7 gy-4">
                                <thead>
                                    <tr className="fw-bold fs-14 fw-600 text-dark border-bottom h-70px align-middle">
                                    <th className="min-w-150px text-center">Plant's Name</th>
                                    <th className="min-w-150px text-center">PPA Name</th>
                                    <th className="min-w-150px text-center">Billing Month</th>
                                    <th className="min-w-160px text-center">Billing Year</th>
                                    <th className="min-w-160px text-center">Generated Unit</th>
                                    <th className="min-w-160px text-center">Consumed Unit</th>
                                    <th className="min-w-160px text-center">Exported Unit</th>
                                    <th className="min-w-160px text-center">Total Amount</th>
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
                                        {bills.length === 0 && !loading ? (
                                            <tr>
                                                <td colSpan={4}>
                                                <div className="w-100 d-flex justify-content-center text-center">
                                                    <div className="fw-bold fs-18">
                                                        No Bills Found!
                                                    </div>
                                                </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            <>
                                                {bills.map((bill, index) => (
                                                    <tr
                                                        key={index}
                                                        className=""
                                                    >
                                                        <td 
                                                            className="fs-14 fw-500 text-center"
                                                            onClick={() =>
                                                                navigate(
                                                                    '/bill/view-details',
                                                                    {
                                                                        state: bill,
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            {bill?.ppaDetail?.plantUniqueName}
                                                        </td>
                                                        <td className="fs-14 fw-500 text-center">
                                                            {bill?.ppaDetail?.ppaName}
                                                        </td>
                                                        <td
                                                            className="fs-15 fw-500 text-center"
                                                        >
                                                            {Method.getMonthLabel(
                                                                bill?.billingMonth
                                                            ) ?? "—"}
                                                        </td>
                                                        <td className="fs-14 fw-500 text-center">
                                                            {bill?.billingYear}
                                                        </td>
                                                        <td className="fs-14 fw-500 text-center">
                                                            {bill?.generatedUnits}
                                                        </td>
                                                        <td className="fs-14 fw-500 text-center">
                                                            {bill?.consumedUnits}
                                                        </td>
                                                        <td className="fs-14 fw-500 text-center">
                                                            {bill?.exportedUnits}
                                                        </td>
                                                        <td className="fs-14 fw-500 text-center">
                                                            {bill?.totalAmount}
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
                                                                    handleBillOption(
                                                                        event,
                                                                        index,
                                                                        bill
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

export default Bills;