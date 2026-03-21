import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

type PrivateRouteProps = {
    children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const user = useAppSelector((state) => state.user);

    if (!user.isAuth) {
        return <Navigate to="/login" />;
    }

    if (user.role.toUpperCase() !== "ADMIN") {
        return <Navigate to="/courses" />;
    }
    return <>{children}</>;
};

export default PrivateRoute;
