import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { PageTitle } from '../../../_admin/layout/core';
import Bills from './Bills';
import AddBill from './AddBill';
import ViewBill from './ViewBill';
import EditBill from './EditBill';

const ManageBillPage = () => {
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    index
                    element={<Navigate to='bill/all-bills' />}
                />
                <Route
                    path='/all-bills'
                    element={
                        <>
                            <PageTitle>Bills</PageTitle>
                            <Bills />
                        </>
                    }
                />
                <Route
                    path='/add-bill'
                    element={
                        <>
                            <PageTitle>Add Bill</PageTitle>
                            <AddBill />
                        </>
                    }
                />
                <Route
                    path="/view-details"
                    element={
                        <>
                            <PageTitle>View Bill</PageTitle>
                            <ViewBill />
                        </>
                    }
                />
                    <Route
                        path='/edit-bill'
                        element={
                            <>
                                <PageTitle>Edit Bill</PageTitle>
                                <EditBill />
                            </>
                        }
                    />
            </Route>
        </Routes>
    ) }
export default ManageBillPage;