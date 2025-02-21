import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ViewUser from "./components/module/user/ViewUser";
import AddUser from "./components/module/user/AddUser";
import Login from "./components/module/login/Login";
import { useSelector } from "react-redux";
import PageNotFound from "./components/base/appbase/PageNotFound";
import DashboardMetrics from "./components/module/Dashboad";

const RouterHome = () => {
    const loggedIn = useSelector(state => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const onRouteChanged = () => {
        // Define your route change logic here
        console.log("Route changed");
    };
    const user = useSelector(state => state.auth.user);
    const role = user?.role;
    console.log(role);


    useEffect(() => {
        const handleRouteChange = () => {
            onRouteChanged();

            if (loggedIn) {
                // Redirect to home if logged in and on login page
                if (window.location.pathname === "/login") {
                    navigate("/");
                }
            } else {
                // Redirect to login page if not logged in
                navigate("/login");
            }
        };

        handleRouteChange();
    }, [loggedIn, navigate]);

 
  
    return (
        <Routes>
            <Route
                path="/user-management/view-user"
                element={
                    
                        loggedIn &&
                        <ViewUser/>
                 
                }
                // render={}
            />
            <Route 
            path="/user-management/add-user" 
            element={
                loggedIn && 
            <AddUser  />
        } 
            />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={loggedIn && <>
            <DashboardMetrics />
            </>}/>
        </Routes>
    );
};

export default RouterHome;
