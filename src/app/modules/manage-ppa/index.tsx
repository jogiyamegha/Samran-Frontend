import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { PageTitle } from '../../../_admin/layout/core';
import Ppa from './Ppa';
import ViewPpa from './ViewPpa';
import AddPpa from './AddPpa';
import EditPpa from './EditPpa';

const ManagePpaPage = () => {
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    index
                    element={<Navigate to='ppa/all-ppas' />}
                />
                <Route
                    path='/all-ppa'
                    element={
                        <>
                            <PageTitle>PPA</PageTitle>
                            <Ppa />
                        </>
                    }
                />
                <Route
                    path='/add-ppa'
                    element={
                        <>
                            <PageTitle>Add PPA</PageTitle>
                            <AddPpa />
                        </>
                    }
                />
                <Route
                    path='/edit-ppa'
                    element={
                        <>
                            <PageTitle>Edit PPA</PageTitle>
                            <EditPpa />
                        </>
                    }
                />
                <Route
                    path='/view-details'
                    element={
                        <>
                            <PageTitle>View Ppa</PageTitle>
                            <ViewPpa />
                        </>
                    }
                />
            </Route>
        </Routes>
    )
}

export default ManagePpaPage;