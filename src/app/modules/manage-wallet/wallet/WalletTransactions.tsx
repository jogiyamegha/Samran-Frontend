import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, FormLabel, Row, Modal } from "react-bootstrap";
import { KTSVG } from "../../../../_admin/helpers";
import { WALLET } from "../../../../api/apiEndPoints";
import APICallService from "../../../../api/apiCallService";
import { WALLETAPIJSON } from "../../../../api/apiJSON/wallet";
import Loader from "../../../../global/loader";
import { success, error as showError } from "../../../../global/toast";
import { PAGE_LIMIT, TransactionStatus } from "../../../../utils/constants";
import { useDebounce } from "../../../../utils/useDebounce";
import Pagination from "../../../../global/pagination";
import Method from "../../../../utils/methods";

const WalletTransactions = () => {
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(PAGE_LIMIT);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<number | undefined>(undefined);

    const [showApproveModal, setShowApproveModal] = useState(false);
    const [selectedTx, setSelectedTx] = useState<any>(null);
    const [adminNote, setAdminNote] = useState("");
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchTransactions(page, pageLimit, searchTerm, statusFilter);
    }, []);

    const fetchTransactions = async (
        pageNo: number,
        limit: number,
        search: string = "",
        status: number | undefined = undefined,
    ) => {
        setLoading(true);
        const params = {
            page: pageNo,
            limit: limit,
            searchTerm: search,
            transactionStatus: status,
        };
        const apiService = new APICallService(WALLET.LISTTRANSACTIONS, WALLETAPIJSON.listTransactions(params));
        try {
            const response = await apiService.callAPI();
            if (response) {
                setTransactions(response.records || []);
                setTotalRecords(response.total || 0);
            }
        } catch (err) {
            console.error("Error fetching transactions:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (value: string) => {
        setSearchTerm(value);
        setPage(1);
        debouncedFetch(1, pageLimit, value, statusFilter);
    };

    const debouncedFetch = useDebounce(fetchTransactions, 500);

    const handleStatusFilter = (status: number | undefined) => {
        setStatusFilter(status);
        setPage(1);
        fetchTransactions(1, pageLimit, searchTerm, status);
    };

    const handleApprove = async () => {
        if (!selectedTx) return;
        setActionLoading(true);
        try {
            const apiService = new APICallService(WALLET.APPROVEDEPOSIT, WALLETAPIJSON.approveDeposit(adminNote), selectedTx._id);
            const response = await apiService.callAPI();
            if (response) {
                success("Deposit approved successfully");
                setShowApproveModal(false);
                setAdminNote("");
                fetchTransactions(page, pageLimit, searchTerm, statusFilter);
            }
        } catch (err) {
            showError("Failed to approve deposit");
        } finally {
            setActionLoading(false);
        }
    };

    const getStatusLabel = (status: number) => {
        switch (status) {
            case TransactionStatus.Pending: return <span className="badge badge-light-warning">Pending</span>;
            case TransactionStatus.Successful: return <span className="badge badge-light-success">Successful</span>;
            case TransactionStatus.Failed: return <span className="badge badge-light-danger">Failed</span>;
            case TransactionStatus.InProgress: return <span className="badge badge-light-info">In Progress</span>;
            default: return <span className="badge badge-light-secondary">Unknown</span>;
        }
    };

    return (
        <div className="p-9 bg-light">
            <Row className="align-items-center mb-8">
                <Col>
                    <div className="d-flex align-items-center">
                        <h1 className="fs-22 fw-bolder mb-0">Wallet Transactions</h1>
                        <span className="badge badge-primary ms-3 rounded-pill p-2 fs-14">{totalRecords}</span>
                    </div>
                </Col>
            </Row>

            <Row className="mb-8 g-5 align-items-end">
                <Col md={4} lg={3}>
                    <FormLabel className="fs-14 fw-bold">Search</FormLabel>
                    <div className="position-relative">
                        <KTSVG path="/media/icons/duotune/general/gen021.svg" className="svg-icon-3 position-absolute ms-3 translate-middle-y top-50" />
                        <input
                            type="text"
                            className="form-control form-control-white ps-10"
                            placeholder="Search transactions..."
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                </Col>
                <Col md={4} lg={3}>
                    <FormLabel className="fs-14 fw-bold">Status Filter</FormLabel>
                    <Dropdown onSelect={(k) => handleStatusFilter(k ? parseInt(k) : undefined)}>
                        <Dropdown.Toggle variant="white" className="form-control text-start d-flex justify-content-between align-items-center">
                            {statusFilter ? (statusFilter === 1 ? 'Pending' : statusFilter === 2 ? 'Successful' : 'All') : 'All Status'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-100">
                            <Dropdown.Item eventKey={undefined}>All Status</Dropdown.Item>
                            <Dropdown.Item eventKey="1">Pending</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Successful</Dropdown.Item>
                            <Dropdown.Item eventKey="3">Failed</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

            <div className="table-responsive bg-white rounded-3 shadow-sm">
                <table className="table table-row-bordered table-row-gray-300 align-middle gs-7 gy-4">
                    <thead className="bg-light">
                        <tr className="fw-bold fs-14 text-gray-500">
                            <th>User</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Reference</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={7} className="text-center py-10">
                                    <Loader loading={loading} />
                                </td>
                            </tr>
                        ) : transactions.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-10 fw-bold text-gray-400">No transactions found</td>
                            </tr>
                        ) : (
                            transactions.map((tx) => (
                                <tr key={tx._id}>
                                    <td>
                                        <div className="d-flex flex-column">
                                            <span className="text-dark fw-bold">
                                                {tx.fromUserDetail?.userDetails?.name || tx.fromUserDetail?.name || 'Unknown'}
                                            </span>
                                            <span className="text-muted fs-12">{tx.transactionId}</span>
                                        </div>
                                    </td>
                                    <td>{tx.description}</td>
                                    <td><span className="fw-bold">₹{tx.transactionAmount?.toLocaleString()}</span></td>
                                    <td><code className="bg-light p-1 rounded">{tx.bankReferenceId || 'N/A'}</code></td>
                                    <td>{getStatusLabel(tx.transactionStatus)}</td>
                                    <td>{Method.convertDateToDDMMYYYY(tx._createdAt || tx.createdAt)}</td>
                                    <td className="text-end">
                                        {tx.transactionStatus === TransactionStatus.Pending && (
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                className="fw-bold"
                                                onClick={() => {
                                                    setSelectedTx(tx);
                                                    setShowApproveModal(true);
                                                }}
                                            >
                                                Approve
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {totalRecords > 0 && !loading && (
                <div className="mt-8">
                    <Pagination
                        totalRecords={totalRecords}
                        currentPage={page}
                        handleCurrentPage={(p) => { setPage(p); fetchTransactions(p, pageLimit, searchTerm, statusFilter); }}
                        handleNextPage={(p) => { setPage(p + 1); fetchTransactions(p + 1, pageLimit, searchTerm, statusFilter); }}
                        handlePreviousPage={(p) => { setPage(p - 1); fetchTransactions(p - 1, pageLimit, searchTerm, statusFilter); }}
                        handlePageLimit={(e) => { setPage(1); setPageLimit(+e.target.value); fetchTransactions(1, +e.target.value, searchTerm, statusFilter); }}
                        pageLimit={pageLimit}
                    />
                </div>
            )}

            <Modal show={showApproveModal} onHide={() => setShowApproveModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Approve Deposit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-4">
                        <label className="fw-bold mb-2">Transaction Info</label>
                        <div className="bg-light p-4 rounded-3">
                            <div className="d-flex justify-content-between mb-2">
                                <span>Amount:</span>
                                <span className="fw-bold text-primary">₹{selectedTx?.transactionAmount?.toLocaleString()}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Reference:</span>
                                <span className="fw-bold">{selectedTx?.bankReferenceId || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                    <Form.Group>
                        <Form.Label className="fw-bold">Admin Note (Optional)</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Add a remark for the user..."
                            value={adminNote}
                            onChange={(e) => setAdminNote(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={() => setShowApproveModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleApprove} disabled={actionLoading}>
                        {actionLoading ? "Processing..." : "Confirm Approval"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default WalletTransactions;
