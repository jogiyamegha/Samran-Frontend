import {useEffect, useState} from "react";
import {Button, Card, Col, Dropdown, FormLabel, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {KTSVG} from "../../../_admin/helpers";
import Loader from "../../../global/loader";
import {PAGE_LIMIT, UserPaymentMethod} from "../../../utils/constants";
import Pagination from "../../../global/pagination";
import ThreeDots from "../../../_admin/assets/media/svg/threeDots.svg";
import {CustomSelectTable} from "../../custom/select/CustomSelectTable";
import APICallService from "../../../api/apiCallService";
import {Bill, PAYMENT, PPA} from "../../../api/apiEndPoints";
import {BILLAPIJSON} from "../../../api/apiJSON/bill";
import {useDebounce} from "../../../utils/useDebounce";
import {IListBill, IListBillParams} from "../../../types";
import AddIcon from "../../../_admin/assets/media/svg/add.svg";
import { CustomSelectWhite } from "../../custom/select/CustomSelectWhite";
import { PPAAPIJSON } from "../../../api/apiJSON/ppa";
import Method from "../../../utils/methods";
import CashPaymentModal from "../../modals/CashPaymentModal";
import { success } from "../../../global/toast";
 
const Bills = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [showModel, setShowModel] = useState<boolean>(false);
    const [bills, setBills] = useState<IListBill[]>([]);
    const [billId, setBillId] = useState<string | null>(null);
    const [ppaId, setppaId] = useState<string | undefined>(undefined);
    const [plantId, setPlantId] = useState<string | undefined>(undefined);
    const [userId, setUserId] = useState<string | undefined>(undefined);
    const [pageLimit, setPageLimit] = useState(PAGE_LIMIT);
    const [searchTerm, setSearchTerm] = useState('');
    const [ppas, setPpas] = useState<any[]>([]);
    const [ppaOptions, setPpaOptions] = useState<any[]>([]);
    const [billingMonth, setBillingMonth] = useState<number | undefined>(undefined);
    const [billingYear, setBillingYear] = useState<number | undefined>(undefined);
    const [userPaymentMethod, setUserPaymentMethod] = useState<number | undefined>(undefined);
    const [isPaid, setIsPaid] = useState<boolean | undefined>(undefined);
    const [showModal, setShowModal] = useState<boolean>(false);
    
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
                label: `${ppa?.ppaName} (${ppa?.ppaUniqueId})`
            }));
            setPpaOptions(options);
        }
    }

    useEffect(() => {
        fetchBills(page, pageLimit);
    }, [] );

    const fetchBills = async (
        pageNo: number,
        limit: number,
        searchTerm?: string,
        ppaId?: string,
        plantId?: string,
        userId?: string,
        billingMonth?: number,
        billingYear?: number,
        userPaymentMethod?: number,
        isPaid?: boolean
    ) => {
        setLoading(true);

        try {
            const params: IListBillParams = {
                page: pageNo,
                limit,
                sortKey: "_createdAt",
                sortOrder: -1,
                needCount: true,
            };

            if (searchTerm?.trim()) params.searchTerm = searchTerm.trim();
            if (ppaId !== undefined) params.ppaId = ppaId;
            if (plantId !== undefined) params.plantId = plantId;
            if (userId !== undefined) params.userId = userId;
            if (billingMonth !== undefined) params.billingMonth = billingMonth;
            if (billingYear !== undefined) params.billingYear = billingYear;
            if (userPaymentMethod !== undefined) params.userPaymentMethod = userPaymentMethod;
            if (isPaid !== undefined) params.isPaid = isPaid;

            const apiService = new APICallService(
                Bill.LISTBILL,
                params
            );

            const response = await apiService.callAPI();
            if (response?.records) {
                setBills(response.records);
                setTotalRecords(response.total || 0);
            } else {
                setBills([]);
                setTotalRecords(0);
            }
        } catch (error) {
            console.error("Error fetching Bills:", error);
            setBills([]);
            setTotalRecords(0);
        } finally {
            setLoading(false);
        }
    };

    const debouncedSearch = useDebounce(fetchBills, 400);

    const handleSearch = async (value: string) => {
        setSearchTerm(value.trimStart());
        setPage(1);
        setLoading(true);
        setTotalRecords(0);
        await fetchBills(1, pageLimit, value);
    };  

    const handleSelectChange = (eventKey: string | number | undefined | null) => {
        const newUserId = eventKey ? eventKey.toString() : undefined;
        setUserId(newUserId);
        setPage(1);
        fetchBills(page, pageLimit, searchTerm, ppaId, plantId, newUserId, billingMonth, billingYear , userPaymentMethod, isPaid);
    };

    const handleSelectBillingMonthChange = (eventKey: number | undefined) => {
        const billingMonth = eventKey ? eventKey : undefined;
        setBillingMonth(billingMonth);
        setPage(1);
        fetchBills(page, pageLimit, searchTerm, ppaId, plantId, userId, billingMonth, billingYear, userPaymentMethod, isPaid);
    };

    const handleStatusChange = (eventKey: string | null) => {
        let filter: boolean | undefined = undefined;

        if (eventKey === "true") filter = true;
        if (eventKey === "false") filter = false;

        setIsPaid(filter);
        setPage(1);

        fetchBills(1, pageLimit, searchTerm,ppaId, plantId, userId, billingMonth, billingYear, userPaymentMethod, filter);  
    };

    const handleUserPaymentMethodChange = (eventKey: string | null) => {
        let filter: number | undefined = undefined;

        if (eventKey === "1") filter = UserPaymentMethod.Online;
        if (eventKey === "2") filter = UserPaymentMethod.Cash;

        setUserPaymentMethod(filter);
        setPage(1);
        fetchBills(1, pageLimit, searchTerm,ppaId, plantId, userId, billingMonth, billingYear, filter, isPaid);  
    }

    const handlePpaChange = (selected: any) => {
        const newPpaId = selected ? selected.value : undefined;
        setppaId(newPpaId);
        setPage(1);

        fetchBills( 1, pageLimit, searchTerm, newPpaId, plantId, userId, billingMonth, billingYear, userPaymentMethod, isPaid );
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

    const handleCashPayment = async (billId: string | null) => {
        if (!billId) {
            setShowModal(false);
            return;
        }
        console.log(billId);
        setLoading(true);
        const apiService = new APICallService(PAYMENT.UPDATECASHPAYMENT, {}, { _id: billId });
        const response = await apiService.callAPI();
        if (response) {
            success("Cash Payment updated successfully");
            await fetchBills(page, pageLimit, searchTerm, ppaId, plantId, userId, billingMonth, billingYear , userPaymentMethod, isPaid)
        }
        setLoading(false);
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
            case 2: 
                setBillId(bill._id);
                setShowModal(true);   
                break;
            case 3:
                setBillId(bill._id);
                setShowModel(true);
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
                                    placeholder="Search by PPA Id and name"
                                    value={searchTerm}
                                    onChange={(event) => handleSearch(event.target.value)}
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col sm={4} xl={3}>
                    <FormLabel className="fs-16 fw-500 text-dark">PPA</FormLabel>
                    <CustomSelectWhite
                        placeholder="Select PPA"
                        options={[
                            ...ppaOptions,
                            { value: undefined, label: "Clear Filter" },
                        ]}
                        isMulti={false}
                        onChange={handlePpaChange}
                        value={
                            ppaId
                                ? ppaOptions.find((option) => option.value === ppaId) || null
                                : null
                        }
                        minHeight="60px"
                        controlFontSize="14px"
                        fontWeight="500"
                    />
                </Col>
                <Col sm={4} xl={3}>
                        <FormLabel className="fs-16 fw-500 text-dark">
                            Billing Month
                        </FormLabel>
                        <Dropdown
                            onSelect={(eventKey) =>
                                handleSelectBillingMonthChange(eventKey ? parseInt(eventKey) : undefined)
                            }
                        >
                                <Dropdown.Toggle
                                    variant="white"
                                    className="form-control bg-white min-h-60px fs-14 fw-bold text-dark min-w-md-288px min-w-175px text-start border border-3px border-radius-15px"
                                    id="dropdown-user-type"
                                >
                                    {billingMonth
                                        ? Method.getMonthLabel(billingMonth)
                                        : 'Select Billing Month'}
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
                                        January
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
                                        February
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
                                        March
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="4"
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
                                        April
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="5"
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
                                        May
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="6"
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
                                        June
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="7"
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
                                        July
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="8"
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
                                        August
                                    </Dropdown.Item> 
                                    <Dropdown.Item
                                        eventKey="9"
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
                                        September
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="10"
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
                                        October
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="11"
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
                                        November
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="12"
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
                                        December
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
                <Col
                    sm={4}
                    xl={3}
                >
                    <FormLabel className="fs-16 fw-500 text-dark">Payment Satatus</FormLabel>
                    <Dropdown onSelect={(eventKey) => handleStatusChange(eventKey)}>
                        <Dropdown.Toggle
                            variant="white"
                            className="form-control bg-white min-h-60px fs-14 fw-bold text-dark min-w-md-288px min-w-175px text-start border border-3px border-radius-15px"
                            id="dropdown-status"
                        >
                            Payment Status
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                            className="border border-3px border-radius-15px"
                            style={{ padding: '8px 0', minWidth: '100%' }}
                        >
                            <Dropdown.Item
                                eventKey="true"
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
                                Paid
                            </Dropdown.Item>
                            <Dropdown.Item
                                eventKey="false"
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
                                Unpaid
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
                <Col
                    sm={4}
                    xl={3}
                >
                    <FormLabel className="fs-16 fw-500 text-dark">Payment Method</FormLabel>
                    <Dropdown onSelect={(eventKey) => handleUserPaymentMethodChange(eventKey)}>
                        <Dropdown.Toggle
                            variant="white"
                            className="form-control bg-white min-h-60px fs-14 fw-bold text-dark min-w-md-288px min-w-175px text-start border border-3px border-radius-15px"
                            id="dropdown-status"
                        >
                            Payment Method
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
                                Online Payment
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
                                Cash Payment
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
                        
                <Col>
                <Card className="border border-r10px mt-3">
                    <Card.Body className="p-0">
                        <div className="table-responsive">
                            <table className="table table-rounded table-row-bordered align-middle gs-7 gy-4">
                                <thead>
                                    <tr className="fw-bold fs-14 fw-600 text-dark border-bottom h-70px align-middle">
                                    <th className="min-w-150px text-center">Plant's Name</th>
                                    <th className="min-w-150px text-center">PPA Name</th>
                                    <th className="min-w-150px text-center">PPA UniqueId</th>
                                    <th className="min-w-150px text-center">Billing Month</th>
                                    <th className="min-w-160px text-center">Billing Year</th>
                                    <th className="min-w-160px text-center">Payment Status</th>
                                    <th className="min-w-160px text-center">Payment Method</th>
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
                                                            style={{cursor: 'pointer'}}
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
                                                        <td className="fs-14 fw-500 text-center">
                                                            {bill?.ppaDetail?.ppaUniqueId}
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
                                                            {bill?.isPaid === true ? 'Paid' : 'Unpaid'}
                                                        </td>
                                                        <td className="fs-14 fw-500 text-center">
                                                            {bill?.userPaymentMethod ? Method.getUserPaymentMethodLabel(bill?.userPaymentMethod) : '-'}
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
                                                                            <button className="btn btn-link fs-14 fw-500 text-black w-100 d-flex justify-content-center align-items-center py-3">
                                                                                Cash Payment
                                                                            </button>
                                                                        ),
                                                                        value: 2,
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
            <CashPaymentModal
                show={showModal}
                onHide={() => setShowModal(false)}
                handleCashPayment={() => handleCashPayment(billId)} 
            />
        </div>
    );
}

export default Bills;