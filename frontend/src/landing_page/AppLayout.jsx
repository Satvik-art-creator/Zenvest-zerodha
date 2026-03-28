import {Outlet} from "react-router"
import Navbar from "./common_comp/Navbar"
import Footer from "./common_comp/Footer"
import PublicRoute from "../PublicRoute";

export default function AppLayout() {
    return (
        <>
           <PublicRoute>
                <Navbar />
                <Outlet />
                <Footer />
            </PublicRoute>
        </>
    );
}