import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { PageTitle } from '../../../_admin/layout/core';
import Ppa from './Ppas';

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
            </Route>
        </Routes>
    )
}

export default ManagePpaPage;