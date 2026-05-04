import { Navigate, useParams, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import PrivateLayout from "../layouts/PrivateLayout";
import MobileLayout from "../mobileView/common/MobileLayout";
import AuthLayout from "../layouts/AuthLayout";
import { Grid } from "antd";

const { useBreakpoint } = Grid;

const ProtectedRoute = ({ type, title, children }) => {
  const { isLogin } = useAuthStore();
  const params = useParams();
  const location = useLocation();

  const screens = useBreakpoint();
  const isMobile = !screens.md;

  if (type === "auth") {
    return !isLogin ? (
      <AuthLayout>{children}</AuthLayout>
    ) : (
      <Navigate to="/" replace />
    );
  }

  if (type === "private") {
    if (!isLogin) return <Navigate to="/login" replace />;

    const resolvedTitle =
      typeof title === "function" ? title(params, location) : title;

    return isMobile ? (
      <MobileLayout title={resolvedTitle}>{children}</MobileLayout>
    ) : (
      <PrivateLayout title={resolvedTitle}>{children}</PrivateLayout>
    );
  }
};

export default ProtectedRoute;