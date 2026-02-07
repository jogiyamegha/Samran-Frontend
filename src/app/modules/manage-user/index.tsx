import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "../../../_admin/layout/core";
import Users from "./user/Users";
import AddUser from "./user/AddUser";
import EditUser from "./user/EditUser";
import UserDetails from "./user/UserDetails";
import ViewUser from "./user/UserDetails";

const ManageUsersPage = () => {
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    index
                    element={<Navigate to='/user/all-users' />}
                />
                <Route
                    path="/all-users"
                    element={
                        <>
                            <PageTitle>Users</PageTitle>
                            <Users />
                        </>
                    }
                />
                <Route
                    path="/add-user"
                    element={
                        <>
                            <PageTitle>Add User</PageTitle>
                            <AddUser />
                        </>
                    }
                />
                <Route
                    path="/edit-user"
                    element={
                        <>
                            <PageTitle>Edit User</PageTitle>
                            <EditUser />
                        </>
                    }
                />
                <Route
                    path="/user-details"
                    element={
                        <>
                            <PageTitle>User Details</PageTitle>
                            <UserDetails />
                        </>
                    }
                />
            </Route>
        </Routes>
    );
};

export default ManageUsersPage;
