import { useState, useEffect } from "react";
import { Modal, Button, FormLabel, Row, Col, Nav, Tab } from "react-bootstrap";
import { CustomSelectWhite } from "../../custom/select/CustomSelectWhite";
import APICallService from "../../../api/apiCallService";
import { Bill, PPA, USER } from "../../../api/apiEndPoints";
import { USERAPIJSON } from "../../../api/apiJSON/user";
import Loader from "../../../global/loader";
import { error, success } from "../../../global/toast";
import Method from "../../../utils/methods";
import { PPAAPIJSON } from "../../../api/apiJSON/ppa";

interface Option {
    value: string;
    label: string;
}

interface BillDownloadReportModalProps {
    show: boolean;
    onHide: () => void;
}

enum Months {
    January = 1,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December,
}

enum userPaymentMethod {
    Cash = 1,
    Online = 2,
}

const PAYMENT_STATUS_OPTIONS: Option[] = [
    { label: "Paid", value: "true" },
    { label: "Unpaid", value: "false" },
];

const BILLING_MONTH_OPTIONS: Option[] = [
    { label: "January", value: "1" },
    { label: "February", value: "2" },
    { label: "March", value: "3" },
    { label: "April", value: "4" },
    { label: "May", value: "5" },
    { label: "June", value: "6" },
    { label: "July", value: "7" },
    { label: "August", value: "8" },
    { label: "September", value: "9" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
];

const USER_PAYMENT_METHOD_OPTIONS: Option[] = [
    { label: "Cash", value: "1" },
    { label: "Online", value: "2" },
];

const BillDownloadReportModal: React.FC<BillDownloadReportModalProps> = ({
    show,
    onHide,
}) => {
    const [activeTab, setActiveTab] = useState<string>("all");

    const [userOptions, setUserOptions] = useState<Option[]>([]);
    const [ppaOptions, setPpaOptions] = useState<Option[]>([]);
    const [selectedUser, setSelectedUser] = useState<Option | null>(null);
    const [selectedPpa, setSelectedPpa] = useState<Option | null>(null);
    const [selectedBillingMonth, setSelectedBillingMonth] = useState<Option | null>(null);
    const [selectedUserPaymentMethod, setSelectedUserPaymentMethod] = useState<Option | null>(null);
    const [selectedIsPaid, setSelectedIsPaid] = useState<Option | null>(null);

    const [userLoading, setUserLoading] = useState(false);
    const [ppaLoading, setPpaLoading] = useState(false);
    const [downloadLoading, setDownloadLoading] = useState(false);

    useEffect(() => {
        if (show && activeTab === "ppa") fetchPpa();
        if (show && activeTab === "user") fetchUsers();
        if (!show) resetState();
    }, [show, activeTab]);

    const fetchPpa = async (
        pageNo: number = 1,
        limit: number = 20,
        searchTerm: string = ""
    ) => {
        setPpaLoading(true);

        const params = {
            page: pageNo,
            limit,
            sortKey: "_createdAt",
            sortOrder: -1,
            needCount: true,
            searchTerm: searchTerm || undefined,
            isSigned: true,
        };

        const apiService = new APICallService(
            PPA.LISTPPA,
            PPAAPIJSON.listPpa(params)
        );

        const response = await apiService.callAPI();

        if (response?.records?.length) {
            setPpaOptions(
                response.records.map((ppa: any) => ({
                    value: ppa._id,
                    label: `${ppa.ppaName} (${ppa.ppaUniqueId})`,
                }))
            );
        } else {
            setPpaOptions([]);
        }

        setPpaLoading(false);
    };

    const fetchUsers = async (
        pageNo: number = 1,
        limit: number = 20,
        searchTerm: string = ""
    ) => {
        try {
            setUserLoading(true);

            const params = {
                page: pageNo,
                limit,
                sortKey: "_createdAt",
                sortOrder: -1,
                needCount: true,
                searchTerm: searchTerm || undefined,
            };

            const apiService = new APICallService(
                USER.LISTUSER,
                USERAPIJSON.listUser(params)
            );

            const response = await apiService.callAPI();

            if (response?.records?.length) {
                setUserOptions(
                    response.records.map((user: any) => ({
                        value: user._id,
                        label: user.name,
                    }))
                );
            } else {
                setUserOptions([]);
            }
        } catch {
            error("Failed to fetch users");
        } finally {
            setUserLoading(false);
        }
    };

    const handleDownload = async () => {
        try {
            setDownloadLoading(true);

            const params: any = {};

            if (activeTab === "ppa" && selectedPpa) params.ppaId = selectedPpa.value;
            if (activeTab === "user" && selectedUser) params.userId = selectedUser.value;
            if (activeTab === "billingMonth" && selectedBillingMonth)
                params.billingMonth = Number(selectedBillingMonth.value);
            if (activeTab === "userPaymentMethod" && selectedUserPaymentMethod)
                params.userPaymentMethod = Number(selectedUserPaymentMethod.value);
            if (activeTab === "isPaid" && selectedIsPaid)
                params.isPaid = selectedIsPaid.value === "true";

            const apiService = new APICallService(
                Bill.DOWNLOADREPORT,
                params,
                undefined,
                "arraybuffer"
            );

            const response = await apiService.callAPI();
            if (!response) {
                error("Failed to download report");
                return;
            }

            console.log("object", response);

            const blob = new Blob([response], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = `bill-report-${Method.convertDateToFormat(
                new Date().toISOString(),
                "DD-MM-YYYY"
            )}.xlsx`;

            link.click();
            URL.revokeObjectURL(url);

            success("Bill report downloaded successfully");
            handleClose();
        } catch {
            error("Failed to download report");
        } finally {
            setDownloadLoading(false);
        }
    };

    const handleClose = () => {
        resetState();
        onHide();
    };

    const resetState = () => {
        setActiveTab("all");
        setSelectedUser(null);
        setSelectedPpa(null);
        setSelectedBillingMonth(null);
        setSelectedUserPaymentMethod(null);
        setSelectedIsPaid(null);
        setUserOptions([]);
        setPpaOptions([]);
    };

    const canDownload = () => {
        if (activeTab === "ppa") return !!selectedPpa;
        if (activeTab === "user") return !!selectedUser;
        if (activeTab === "billingMonth") return !!selectedBillingMonth;
        if (activeTab === "userPaymentMethod") return !!selectedUserPaymentMethod;
        if (activeTab === "isPaid") return !!selectedIsPaid;
        return true;
    };

    return (
        <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false} size="lg">
            <Modal.Header className="border-bottom-0 pb-0 d-flex justify-content-between">
                <Modal.Title className="fs-20">Download Bill Report</Modal.Title>
                <Button variant="link" className="p-0" onClick={handleClose}>
                    <span className="fs-24 fw-bold text-dark">&times;</span>
                </Button>
            </Modal.Header>

            <Modal.Body>
                <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k || "all")}>
                    <Nav variant="tabs" className="border-bottom mb-4">
                        <Nav.Item><Nav.Link eventKey="all">All Bills</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="ppa">PPA</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="user">User</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="billingMonth">Billing Month</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="userPaymentMethod">Payment Method</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="isPaid">Payment Status</Nav.Link></Nav.Item>
                    </Nav>

                    <Tab.Content>
                        <Tab.Pane eventKey="all" />
                        <Tab.Pane eventKey="ppa">
                            {ppaLoading ? <Loader loading /> :
                                <CustomSelectWhite options={ppaOptions} value={selectedPpa} onChange={setSelectedPpa} />}
                        </Tab.Pane>
                        <Tab.Pane eventKey="user">
                            {userLoading ? <Loader loading /> :
                                <CustomSelectWhite options={userOptions} value={selectedUser} onChange={setSelectedUser} />}
                        </Tab.Pane>
                        <Tab.Pane eventKey="billingMonth">
                            <CustomSelectWhite options={BILLING_MONTH_OPTIONS} value={selectedBillingMonth} onChange={setSelectedBillingMonth} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="userPaymentMethod">
                            <CustomSelectWhite options={USER_PAYMENT_METHOD_OPTIONS} value={selectedUserPaymentMethod} onChange={setSelectedUserPaymentMethod} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="isPaid">
                            <CustomSelectWhite options={PAYMENT_STATUS_OPTIONS} value={selectedIsPaid} onChange={setSelectedIsPaid} />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={handleDownload} disabled={!canDownload() || downloadLoading}>
                    {downloadLoading ? "Please wait..." : "Download Report"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BillDownloadReportModal;
