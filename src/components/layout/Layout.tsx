import { NavLink, Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";

function Layout() {
  return (
    <>
      <Header />

      <nav style={{ display: "flex", gap: "20px", padding: "15px" }}>
        <NavLink to="/" end>
          Employees
        </NavLink>

        <NavLink to="/add-employee">
          Add Employee
        </NavLink>

        <NavLink to="/organization">
          Organization
        </NavLink>
      </nav>

      <Outlet />

      <Footer />
    </>
  );
}

export default Layout;
