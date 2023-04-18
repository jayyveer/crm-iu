import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddProject from './components/Projects/AddProject';
import EditProject from './components/Projects/EditProject';
import ProjectFields from './components/Projects/ProjectFields';
import Projects from './components/Projects/Projects';
import ViewProject from './components/Projects/ViewProject';
import ChangePassword from './Pages/Auth/ChangePassword';
import Login from './Pages/Auth/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Notfound from './Pages/NotFound/Notfound';
import Profile from './Pages/User/Profile';
import {checkToken} from './utils/Storage/token'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/addProject",
    element: <AddProject />,
  },
  {
    path: "/editProject/:id",
    element: <EditProject />,
  },
  {
    path: "/viewProject/:id",
    element: <ViewProject />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
