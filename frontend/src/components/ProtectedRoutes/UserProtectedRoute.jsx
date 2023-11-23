import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

const checkUserSession = async () => {
    //  debugger;

    try {
        await axios.get('http://localhost:3333/me', {
            withCredentials: true,
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        })
      
        return true;
    } catch (err) {
        return false
    }

}

const UserProtectedRoute = () => {
    // debugger;
    const [loggedIn, setLoggedIn] = useState(true);

    useEffect(() => {
        // debugger;
        checkLogin()
    }, [])

    const checkLogin = async () => {

        const isLoggedIn = await checkUserSession();
        if (isLoggedIn) {
            console.log("------------reached")
            setLoggedIn(true)
        }

    }

    console.log("logged in state", loggedIn)
    return (
        loggedIn ? <Outlet /> : <Navigate to={"/login"} />
    )

}

export default UserProtectedRoute;