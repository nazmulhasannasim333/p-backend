import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardManagement from "../pages/Dashboard/DashboardManagement";
import UserManagement from "../pages/Users/UserManagement";
import TaskManagement from "../pages/Tasks/TaskManagement";
import SubmissionManagement from "../pages/Submissions/SubmissionManagement";
import Login from "../pages/Login/Login";

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
      {
        path: "/tasks",
        element: (
            <TaskManagement />
        ),
      },
      {
        path: "/submission/:taskId",
        element: (
            <SubmissionManagement />
        ),
      },
    ]
  },
  {
    path: "/login",
    element: (
        <Login />
    ),
  },
]);

export default router;
