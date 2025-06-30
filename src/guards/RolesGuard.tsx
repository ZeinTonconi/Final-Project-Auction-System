import { Navigate } from "react-router-dom";
import type {ReactNode} from "react";
import {useUser} from "../contexts/userContext.tsx";

interface ProtectedRouteProps {
    children: ReactNode
    requiredRole?: "user" | "admin";
}

export const RolesGuard = ({ children, requiredRole }: ProtectedRouteProps) => {
    const { user } = useUser();

    if (!user) {
        return <Navigate to="/"/>;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/"/>;
    }

    return children;
};
