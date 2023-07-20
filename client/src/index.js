import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App';
import Public from './components/Public';
import Details from './components/Details';
import AddInterest from './components/AddInterest';
import Interests from './components/Interests';

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
    path: "/interests",
    element: <Interests />,
  },
  {
    path: "/dogdetails/:id",
    element: <Details />,
  },
  {
    path: "/interest/:id",
    element: <AddInterest />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
