import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddVisa from './components/AddVisa.jsx';
import AllVisas from './components/AllVisas.jsx';
import VisaDetails from './components/VisaDetails.jsx';
import MyApplications from './components/MyApplications.jsx';
import Error from './components/error/Error.jsx';
import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import ForgetPassword from './pages/ForgetPassword.jsx';
import AuthProvider from './context/AuthContext.jsx';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from './components/routes/PrivateRoute.jsx';
import MyAddedVisas from './components/MyAddedVisas.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: <Error/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/addVisa",
        element: <PrivateRoute><AddVisa /></PrivateRoute>
      },
      {
        path: "/allVisa",
        element: <AllVisas />,
      },
      {
        path: "/visa-details/:id",
        element: <PrivateRoute><VisaDetails /></PrivateRoute>,
      },
      {
        path: "/my-visas",
        element: <PrivateRoute><MyAddedVisas /></PrivateRoute>,
      },
      {
        path: "/my-applications",
        element: <PrivateRoute><MyApplications /></PrivateRoute>,
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/forget-password",
        element: <ForgetPassword/>
      },

    ],
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
        <AuthProvider>
            <HelmetProvider>
                <RouterProvider router={router} />
            </HelmetProvider>
        </AuthProvider>
    </StrictMode>,
)
