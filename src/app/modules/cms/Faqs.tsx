import { Button, Card, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import ThreeDots from '../../../_admin/assets/media/svg/threeDots.svg';
import { useNavigate } from 'react-router-dom';
import { KTSVG } from '../../../_admin/helpers';
import { CustomSelectTable } from '../../custom/select/CustomSelectTable';
import AddFaqs from '../../modals/AddFaqsModal';
import APICallService from '../../../api/apiCallService';
import { CMS } from '../../../api/apiEndPoints';
import Pagination from '../../../global/pagination';
import DeleteFaqModal from '../../modals/DeleteFaqModal';
import Loader from '../../../global/loader';
import { success } from '../../../global/toast';
import { Cms } from '../../../utils/toast';
const Faqs = () => {
    const navigate = useNavigate();
    const [faqModal, setShowFaqModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [faqList, setFaqList] = useState<any>(null);
    const [page, setPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [faqModalTitle, setFaqModalTitle] = useState('');
    const [currentFaq, setCurrentFaq] = useState<any>();
    const fetchFaq = async (
        page: number,
        pageLimit: number,
        searchTerm: string = ''
    ) => {
        let params = {
            pageNo: page,
            limit: pageLimit,
            sortKey: 'createdAt',
            sortOrder: -1,
            searchTerm: searchTerm,
            needCount: true,
        };
        setLoading(true);
        const apiService = new APICallService(CMS.GET_FAQ, params);
        const response = await apiService.callAPI();
        setFaqList(response.records);
        setTotalRecords(response.total);
        setLoading(false);
    };
    useEffect(() => {
        fetchFaq(page, pageLimit, searchTerm);
    }, []);

    const handleCurrentPage = async (val: number) => {
        if (val === page || val.toString() === '...') return;
        setLoading(true);
        setPage(val);
        await fetchFaq(val, pageLimit, searchTerm);
        setLoading(false);
    };

    const handleNextPage = async (val: number) => {
        setLoading(true);
        setPage(val + 1);
        await fetchFaq(val + 1, pageLimit, searchTerm);
        setLoading(false);
    };

    const handlePreviousPage = async (val: number) => {
        setLoading(true);
        setPage(val - 1);
        await fetchFaq(val - 1, pageLimit, searchTerm);
        setLoading(false);
    };
  
    const handlePageLimit = async (event: any) => {
        setLoading(true);
        setPage(1);
        setTotalRecords(0);
        setFaqList([]);
        await setPageLimit(parseInt(event.target.value));
        await fetchFaq(1, event.target.value, searchTerm);
        setLoading(false);
    };
    const handleSearch = async (value: string) => {
        setSearchTerm(value.trimStart());
        setPage(1);
        setLoading(true);
        setTotalRecords(0);
        setFaqList([]);
        await fetchFaq(1, pageLimit, value);
        setLoading(false);
    };
    const handleOption = async (event: any, index: number, data: any) => {
        if (event.value === 1) {
            setCurrentFaq(data);
            setFaqModalTitle('Edit');
            setShowFaqModal(true);
        } else if (event.value === 2) {
            setCurrentFaq(data);
            setShowDeleteModal(true);
        }
    };
    const handleDelete = async (faqId: string) => {
        setLoading(true);
        const apiService = new APICallService(CMS.DELETE_FAQ, faqId);
        const response = await apiService.callAPI();
        if (response) {
        setShowDeleteModal(false);
        await fetchFaq(page, pageLimit, searchTerm);
        success(Cms.deleteFaq);
        }
        setLoading(false);
    };
  return (
        <>
            {faqModal ? (
                <AddFaqs
                    show={faqModal}
                    title={faqModalTitle}
                    question={currentFaq?.question || ''}
                    answer={currentFaq?.answer || ''}
                    id={currentFaq?._id || ''}
                    handleClose={() => {
                        setShowFaqModal(false);
                        setCurrentFaq(undefined);
                    }}
                    onHide={async () => {
                        setShowFaqModal(false);
                        setCurrentFaq(undefined);
                        await fetchFaq(1, pageLimit);
                    }}
                />
            ) : (
                <></>
            )}
            {showDeleteModal ? (
                <DeleteFaqModal
                    show={showDeleteModal}
                    onHide={() => setShowDeleteModal(false)}
                    handleDelete={handleDelete}
                    faqId={currentFaq?._id}
                />
            ) : (
                <></>
            )}
            <div className="p-9">
                <Row className="align-items-center">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h1 className="fs-22 fw-bolder">FAQs</h1>
                        <Button
                            variant="primary"
                            onClick={() => {
                                setCurrentFaq(undefined);
                                setFaqModalTitle('Add');
                                setShowFaqModal(true);
                            }}
                        >
                            Add FAQs
                        </Button>
                    </div>
                <Row>
                    <Col
                        lg={12}
                        className="mt-2"
                    >
                        <>
                            <Card className="border">
                                <Card.Body>
                                    <div className="position-relative">
                                        <KTSVG
                                            path="/media/icons/duotune/general/gen021.svg"
                                            className="svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ps-13"
                                        />
                                        <input
                                            type="text"
                                            className="form-control form-control-custom borde-r8px bg-light w-lg-375px w-md-375px w-sm-150px ps-11"
                                            name="Search Team"
                                            placeholder="Type to search"
                                            onChange={(event: any) => {
                                                handleSearch(event.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-rounded table-row-bordered align-middle gy-4 mb-0">
                                            <thead>
                                                <tr className="fw-bold fs-16 fw-600 text-dark border-bottom h-70px align-middle">
                                                    <th className="min-w-425px">Questions</th>
                                                    <th className="min-w-425px">Answers</th>
                                                    <th className="w-75px text-end"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loading ? (
                                                    <tr>
                                                    <td colSpan={3}>
                                                        <div className="w-100 d-flex justify-content-center">
                                                        <Loader loading={loading} />
                                                        </div>
                                                    </td>
                                                    </tr>
                                                    ) : faqList?.length === 0 ? (
                                                        <tr>
                                                        <td
                                                            colSpan={3}
                                                            className="text-center"
                                                        >
                                                            <span>No data available</span>
                                                        </td>
                                                        </tr>
                                                    ) : (
                                                    faqList?.map((faq: any, index: number) => (
                                                    <tr key={faq?._id}>
                                                        <td>
                                                            <span className="fs-15 fw-500">
                                                                {faq?.question}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="fs-15 fw-500">
                                                                {faq?.answer}
                                                            </span>
                                                        </td>
                                                        <td className="text-end">
                                                            <div className="my-0 pe-2">
                                                                <CustomSelectTable
                                                                    backgroundColor="white"
                                                                    marginLeft={'-50px'}
                                                                    width={'auto'}
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
                                                                            <button className="btn btn-link fs-14 fw-500 text-black ms-3 p-4">
                                                                            Edit
                                                                            </button>
                                                                        ),
                                                                        value: 1,
                                                                        },
                                                                        {
                                                                        label: (
                                                                            <button className="btn btn-link fs-14 fw-500 text-danger ms-3 p-4">
                                                                            Delete
                                                                            </button>
                                                                        ),
                                                                        value: 2,
                                                                        },
                                                                    ]}
                                                                    onChange={(event: any) => {
                                                                        handleOption(event, index, faq);
                                                                    }}
                                                                    isOptionDisabled={(option: {
                                                                        value: number;
                                                                    }) => option.value === 3}
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    {!loading && totalRecords > 0 ? (
                                        <Pagination
                                            totalRecords={totalRecords}
                                            currentPage={page}
                                            pageLimit={pageLimit}
                                            handleCurrentPage={handleCurrentPage}
                                            handleNextPage={handleNextPage}
                                            handlePreviousPage={handlePreviousPage}
                                            handlePageLimit={handlePageLimit}
                                        />
                                        ) : (
                                        <></>
                                    )}
                                </Card.Body>
                            </Card>
                        </>
                    </Col>
                </Row>
                </Row>
            </div>
        </>
  );
};
export default Faqs;
