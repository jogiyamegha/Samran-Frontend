import {FC, Suspense} from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {MasterLayout} from "../../_admin/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import Dashboard from "../modules/dashboard/Dashboard";
import {getCSSVariableValue} from "../../_admin/assets/ts/_utils";
import {WithChildren} from "../../_admin/helpers";
import CmsPage from "../modules/cms";
import Plants from "../modules/manage-plant/Plants";
import Ppas from "../modules/manage-ppa/Ppas";
// import ManageUsersPage from "../modules/manage-user";
// import ManageJobsPage from "../modules/manage-job";
// import ManageSitesPage from "../modules/manage-site";
// import ManageLeavesPage from "../modules/manage-leave";
// import ManageQueriesPage from "../modules/manage-query";
// import ManageCertificatePage from "../modules/manage-certificate";
// import ManageToolsPage from "../modules/manage-tool";
// import WorkUpdatePage from "../modules/work-update";
// import SendNotificationPage from "../modules/manage-notification";
// import ManageTimeSheetPage from "../modules/timesheets";
// import ManageRequisitionsPage from "../modules/requisitions";
// import ManageFieldTypePage from "../modules/manage-field-type";
// import ManageDepartmentPage from "../modules/manage-department";

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route element={<MasterLayout />}>
                <Route path="auth/*" element={<Navigate to="/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="plant/*" element={<Plants />} />
                {/* <Route path="ppa/*" element={<Ppas />} /> */}
                {/* <Route path="manage-tools/*" element={<ManageToolsPage />} />
                <Route path="manage-jobs/*" element={<ManageJobsPage />} />
                <Route path="manage-sites/*" element={<ManageSitesPage />} />
                <Route path="manage-leaves/*" element={<ManageLeavesPage />} />
                <Route path="manage-queries/*" element={<ManageQueriesPage />} />
                <Route path="manage-Certificates/*" element={<ManageCertificatePage />} />
                <Route path="manage-time-sheets/*" element={<ManageTimeSheetPage />} />
                <Route path="manage-requisitions/*" element={<ManageRequisitionsPage />} />
                <Route path="manage-field-types/*" element={<ManageFieldTypePage />} />
                <Route path="manage-departments/*" element={<ManageDepartmentPage />} />
                <Route path="send-notification/*" element={<SendNotificationPage />} />
                <Route path="cms/*" element={<CmsPage />} /> */}
    
                <Route path="*" element={<Navigate to="/error/404" />} />
            </Route>
        </Routes>
    );
};

const SuspensedView: FC<WithChildren> = ({children}) => {
    const baseColor = getCSSVariableValue("--bs-primary");
    TopBarProgress.config({
        barColors: {
            "0": baseColor,
        },
        barThickness: 1,
        shadowBlur: 5,
    });
    return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export {PrivateRoutes};
