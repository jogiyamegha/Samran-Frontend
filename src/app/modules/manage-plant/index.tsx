import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { PageTitle } from '../../../_admin/layout/core';
import Plants from './Plants';
import AddPlant from './AddPlant';
import ViewPlant from './ViewPlant';
import EditPlant from './EditPlant';

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
                <Route
                    path='/add-plant'
                    element={
                        <>
                            <PageTitle>Add Plant</PageTitle>
                            <AddPlant />
                        </>
                    }
                /> 
                <Route
                    path='/edit-plant'
                    element={
                        <>
                            <PageTitle>Edit Plant</PageTitle>
                            <EditPlant />
                        </>
                    }
                />
                <Route
                    path="/view-details"
                    element={
                        <>
                            <PageTitle>View Plant</PageTitle>
                            <ViewPlant />
                        </>
                    }
                />
            </Route>
        </Routes>
    ) }
export default ManagePlantPage;