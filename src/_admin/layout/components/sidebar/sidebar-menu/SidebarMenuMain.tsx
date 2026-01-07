import {useIntl} from "react-intl";
import {SidebarMenuItemWithSub} from "./SidebarMenuItemWithSub";
import {SidebarMenuItem} from "./SidebarMenuItem";
import DashboardIcon from "../../../../assets/media/svg/Dashboard.svg";
import JobIcon from "../../../../assets/media/svg/manage-job.svg";
import QueryIcon from "../../../../assets/media/svg/manage-query.svg";
import LeaveIcon from "../../../../assets/media/svg/manage-leave.svg";
import ToolIcon from "../../../../assets/media/svg/manage-tools.svg";
import ManageStudentIcon from "../../../../assets/media/svg/peoples.svg";
import FAQsIcon from "../../../../assets/media/svg/FAQ.svg";
import CertificateIcon from "../../../../assets/media/svg/manage-certificate.svg";
import PurchaseReqIcon from "../../../../assets/media/svg/purchae_req.svg";
import TimeSheetIcon from "../../../../assets/media/svg/time_sheet.svg";
import Dot from "../../../../assets/media/svg/dot.svg";
const SidebarMenuMain = () => {
    const intl = useIntl();

    return (
        <>
            <SidebarMenuItem to="/dashboard" icon={DashboardIcon} title="Dashboard" />
            <SidebarMenuItem to="/users/all-users" icon={ManageStudentIcon} title="Users" />
            <SidebarMenuItem to="/plant/all-plants" icon={JobIcon} title="Plants" />
            <SidebarMenuItem to="/ppa/all-ppa" icon={DashboardIcon} title="PPA" />
            {/* <SidebarMenuItem to="/manage-leaves" icon={LeaveIcon} title="Manage Leaves" />
            <SidebarMenuItem to="/manage-queries" icon={QueryIcon} title="Manage Queries" />
            <SidebarMenuItem to="/manage-Certificates" icon={CertificateIcon} title="Manage Certificates" />
            <SidebarMenuItem to="/manage-time-sheets" icon={TimeSheetIcon} title="Manage Time Sheets" />
            <SidebarMenuItem to="/manage-requisitions" icon={PurchaseReqIcon} title="Requisitions" />
            <SidebarMenuItem to="/manage-field-types" icon={CertificateIcon} title="Field Type" />
            <SidebarMenuItem to="/manage-departments" icon={CertificateIcon} title="Department" /> */}
            {/* <SidebarMenuItemWithSub to="/#" icon={ToolIcon} title="Manage Tool">
                <SidebarMenuItem
                    to="/manage-tools/all-category"
                    icon={Dot}
                    title="Tools Category"
                    fontIcon="bi-app-indicator"
                />
                <SidebarMenuItem to="/manage-tools/all-tool" icon={Dot} title="Tools" fontIcon="bi-app-indicator" />
                <SidebarMenuItem
                    to="/manage-tools/all-gas-bottle"
                    icon={Dot}
                    title="Gas Bottle"
                    fontIcon="bi-app-indicator"
                />
            </SidebarMenuItemWithSub> */}
            {/* <SidebarMenuItem to="/manage-work-updates" icon={CertificateIcon} title="Work Updates" />
            <SidebarMenuItem to="/send-notification" icon={CertificateIcon} title="Send Notification" /> */}
            <SidebarMenuItemWithSub to="/#" icon={FAQsIcon} title="CMS Page">
                <SidebarMenuItem to="/cms/about-us" icon={Dot} title="About Us" fontIcon="bi-app-indicator" />
                <SidebarMenuItem
                    to="/cms/privacy-policy"
                    icon={Dot}
                    title="Privacy Policy"
                    fontIcon="bi-app-indicator"
                />

                <SidebarMenuItem
                    to="/cms/terms-and-conditions"
                    icon={Dot}
                    title="Terms & Conditions"
                    fontIcon="bi-app-indicator"
                />

                {/* <SidebarMenuItem
          to="/cms/contact-us"
          icon={Dot}
          title="Contact Us"
          fontIcon="bi-app-indicator"
        />

        <SidebarMenuItem
          to="/cms/faqs"
          icon={Dot}
          title="FAQs"
          fontIcon="bi-app-indicator"
        /> */}
            </SidebarMenuItemWithSub>
        </>
    );
};

export {SidebarMenuMain};
