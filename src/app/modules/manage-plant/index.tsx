import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { PageTitle } from '../../../_admin/layout/core';
import Plants from './Plants';

const ManagePlantPage = () => {
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    index
                    element={<Navigate to='plant/all-plants' />}
                />
                <Route
                    path='/all-plants'
                    element={
                        <>
                            <PageTitle>Plants</PageTitle>
                            <Plants />
                        </>
                    }
                />
            </Route>
        </Routes>
    )
}

export default ManagePlantPage;