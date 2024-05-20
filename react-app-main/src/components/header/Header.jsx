import React, { useEffect, useState } from "react";
import logo from "../../assets/images/pandaa.png";
import "./header.css";
import { User } from "./User";
import { nav } from "../../assets/data/data";
import { Link, useHistory, useLocation } from "react-router-dom";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsLoggedIn(false);
  };

  return (
    <header className="header">
      <div className="scontainer flex">
        <div className="logo">
          <img src={logo} alt="logo" width="100px" />
        </div>
        <nav>
          <ul>
            {nav.map(
              (link) =>
                (link.text === "home" || isLoggedIn) && (
                  <li key={link.id}>
                    <Link to={link.url}>{link.text}</Link>
                  </li>
                )
            )}
          </ul>
        </nav>
        <div className="account flexCenter">
          {isLoggedIn ? (
            <User isLoggedIn={isLoggedIn} logout={logout} history={history} />
          ) : location.pathname === "/" ? (
            <Link to="/login">
              <button className="loginButton">Login</button>
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
};
