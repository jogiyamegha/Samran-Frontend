import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "../../../_admin/layout/core";
import WalletTransactions from "./wallet/WalletTransactions";

const ManageWalletPage = () => {
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    index
                    element={<Navigate to='/wallet/transactions' />}
                />
                <Route
                    path="/transactions"
                    element={
                        <>
                            <PageTitle>Wallet Transactions</PageTitle>
                            <WalletTransactions />
                        </>
                    }
                />
            </Route>
        </Routes>
    );
};

export default ManageWalletPage;
