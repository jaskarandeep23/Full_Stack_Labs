import { NavLink, Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";

function Layout() {
    return (
        <>
            <Header />

            <nav>
                <NavLink to="/employees">Employees</NavLink>
                <NavLink to="/organization">Organization</NavLink>
            </nav>

            <Outlet />

            <Footer />
        </>
    );
}

export default Layout;