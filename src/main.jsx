import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddVisa from './components/AddVisa.jsx';
import UpdateVisa from './components/UpdateVisa.jsx';
import AllVisas from './components/AllVisas.jsx';
import VisaDetails from './components/VisaDetails.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "addVisa",
    element: <AddVisa/>,
  },
  {
    path: "allVisa",
    element: <AllVisas/>,
  },
  {
    path: "visa-details/:id",
    element: <VisaDetails/>,
  },
  {
    path: "updateVisa",
    element: <UpdateVisa/>,
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
