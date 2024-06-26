import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardManagement from "../pages/Dashboard/DashboardManagement";
import UserManagement from "../pages/Dashboard/UserManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DashboardManagement />,
      },
      {
        path: "/users",
        element: (
            <UserManagement />
        ),
      },
    ]
  },
]);

export default router;
