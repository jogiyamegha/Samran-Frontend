import { useIntl } from "react-intl";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";
import DashboardIcon from "../../../../assets/media/svg/dashboard.svg";
import UsersIcon from "../../../../assets/media/svg/people.svg";
import PlantsIcon from "../../../../assets/media/svg/solar-panel.svg";
import PPAIcon from "../../../../assets/media/svg/contract (1).svg";
import BillIcon from "../../../../assets/media/svg/bill.svg";
import ReportIcon from "../../../../assets/media/svg/report.svg";
import JobIcon from "../../../../assets/media/svg/manage-job.svg";
import QueryIcon from "../../../../assets/media/svg/manage-query.svg";
import LeaveIcon from "../../../../assets/media/svg/manage-leave.svg";
import ToolIcon from "../../../../assets/media/svg/manage-tools.svg";
import ManageStudentIcon from "../../../../assets/media/svg/peoples.svg";
import FAQsIcon from "../../../../assets/media/svg/FAQ.svg";
import CertificateIcon from "../../../../assets/media/svg/manage-certificate.svg";
import PurchaseReqIcon from "../../../../assets/media/svg/purchae_req.svg";
import TimeSheetIcon from "../../../../assets/media/svg/time_sheet.svg";
import WalletIcon from "../../../../assets/media/svg/purchae_req.svg";
import Dot from "../../../../assets/media/svg/dot.svg";
const SidebarMenuMain = () => {
    const intl = useIntl();

    return (
        <>
            <SidebarMenuItem to="/dashboard" icon={DashboardIcon} title="Dashboard" />
            <SidebarMenuItem to="/user/all-users" icon={UsersIcon} title="Users" />
            <SidebarMenuItem to="/plant/all-plants" icon={PlantsIcon} title="Plants" />
            <SidebarMenuItem to="/ppa/all-ppa" icon={PPAIcon} title="PPA" />
            <SidebarMenuItem to="/bill/all-bills" icon={BillIcon} title="Bill" />
            <SidebarMenuItem to="/wallet/transactions" icon={WalletIcon} title="Wallet" />
            <SidebarMenuItem to="/report/reports" icon={ReportIcon} title="Reports" />
        </>
    );
};

export { SidebarMenuMain };
