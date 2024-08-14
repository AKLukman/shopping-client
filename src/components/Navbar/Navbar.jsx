import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { CgMenu } from "react-icons/cg";
import { FaMoon, FaSun } from "react-icons/fa";

// import alessiImage from "../../assets/alessi.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const { user, logOutUser } = useAuth();
  const handleLogOut = () => {
    logOutUser()
      .then((res) => {
        console.log(res.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/addShopping">Add Shopping</NavLink>
      </li>
      <li>
        <NavLink to="/shoppinglist">Shopping List</NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <button onClick={handleLogOut}>Logout</button>
          </li>
        </>
      ) : (
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      )}
    </>
  );
  return (
    <div
      className={`navbar ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } bg-opacity-90`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            onClick={toggleDropdown}
          >
            <CgMenu
              className={`text-2xl ${isDarkMode ? "text-white" : "text-black"}`}
            />
          </div>
          {isOpen && (
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              } rounded-box z-[1] mt-3 w-52 p-2 shadow`}
            >
              {navLinks}
            </ul>
          )}
        </div>
        <a
          className={`btn btn-ghost text-xl ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Alessi
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul
          className={`menu menu-horizontal px-1 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          {navLinks}
        </ul>
      </div>
      <div className="navbar-end">
        <button onClick={toggleTheme} className="btn btn-ghost">
          {isDarkMode ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-gray-800" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
