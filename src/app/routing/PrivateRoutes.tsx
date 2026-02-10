import { FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../_admin/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import Dashboard from "../modules/dashboard/Dashboard";
import { getCSSVariableValue } from "../../_admin/assets/ts/_utils";
import { WithChildren } from "../../_admin/helpers";
import ManagePpaPage from "../modules/manage-ppa";
import ManagePlantPage from "../modules/manage-plant";
import ManageBillPage from "../modules/manage-bill";
import ManageUsersPage from "../modules/manage-user";
import ManageReportsPage from "../modules/reports";
import ManageWalletPage from "../modules/manage-wallet";

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route element={<MasterLayout />}>
                <Route path="auth/*" element={<Navigate to="/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="user/*" element={<ManageUsersPage />} />
                <Route path="plant/*" element={<ManagePlantPage />} />
                <Route path="ppa/*" element={<ManagePpaPage />} />
                <Route path="bill/*" element={<ManageBillPage />} />
                <Route path="report/*" element={<ManageReportsPage />} />
                <Route path="wallet/*" element={<ManageWalletPage />} />

                <Route path="*" element={<Navigate to="/error/404" />} />
            </Route>
        </Routes>
    );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
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

export { PrivateRoutes };
