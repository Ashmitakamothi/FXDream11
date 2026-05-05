import { Suspense } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import GlobalLoader from "../components/loader/GlobalLoader";
import routes from "./routes";
import ProtectedRoute from "./ProtectedRoute";
import { Grid } from "antd";
const generateRoutes = (routes) => {
  return routes.map(({ type, component: WebComponent, mobile: MobileComponent, children, ...rest }) => {
    
    const RouteElement = () => {
      const screens = Grid.useBreakpoint();
      const isMobile = !screens.md;

      const ComponentToRender = isMobile
        ? (MobileComponent || WebComponent)
        : WebComponent;

      return (
        <ProtectedRoute type={type} {...rest}>
          <ComponentToRender />
        </ProtectedRoute>
      );
    };

    return {
      element: <RouteElement />,
      children: children?.length ? generateRoutes(children) : null,
      ...rest,
    };
  });
};

const RoutesWrapper = () => {
  return useRoutes(generateRoutes(routes));
};

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={null}>
        <RoutesWrapper />
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
