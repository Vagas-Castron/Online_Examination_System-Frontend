import React from "react"
import { Outlet } from "react-router-dom"

import Footer from "../components/Footer"


function MainLayout() {
    const user = false;
    return (
        <>  
            <main className="main-container">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default MainLayout