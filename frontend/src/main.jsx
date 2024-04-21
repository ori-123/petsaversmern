import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App';
import Public from './components/Public';
import Details from './components/Details';
import AddInquiry from './components/AddInquiry';
import Inquiries from './components/Inquiries';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Public />,
  },
  {
    path: "/admin",
    element: <App />,
  },
  {
    path: "/inquiries",
    element: <Inquiries />,
  },
  {
    path: "/dogdetails/:id",
    element: <Details />,
  },
  {
    path: "/inquiry/:id",
    element: <AddInquiry />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);