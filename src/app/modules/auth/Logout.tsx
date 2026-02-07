import { useEffect } from "react";
import { useAuth } from ".";

export function Logout() {
    const {logout} = useAuth();
    useEffect(() => {
        logout();
        window.location.href = '/auth/login';
    }, [logout]);

    return null;
}
