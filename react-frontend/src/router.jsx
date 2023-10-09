import {
    createBrowserRouter, Navigate,
} from "react-router-dom";
import Home from "./views/Home.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import NotFound from "./views/NotFound.jsx";
import Login from "./views/Login.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }

])

export default router;
