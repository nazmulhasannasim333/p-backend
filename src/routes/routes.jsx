import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import BlogManagement from "../pages/Blogs/BlogsManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/blogs",
        element: (
            <BlogManagement />
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
