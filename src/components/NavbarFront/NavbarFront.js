import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  AiFillAppstore,
  AiOutlineUserSwitch,
  AiOutlineSchedule,
  AiOutlineUserAdd,
  AiOutlineUsergroupAdd,
  AiOutlineTeam,
} from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import "./NavbarFront.css";
import { useDispatch } from "react-redux";

const NavbarFront = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {};
  return (
    <div className="navbar__container">
      <div className="navbar__logo">
        <img src={logo} alt="ACA" />
      </div>
      <div className="navbar__links">
        <Link to="/admin/dashboard" className="links__dashboard">
          <div className="link">
            <AiFillAppstore />
            <h3>Dashboard</h3>
          </div>
        </Link>
        <Link to="/admin/guest" className="links__guest">
          <div className="link">
            <AiOutlineUserSwitch />
            <h3>Verify Guest</h3>
          </div>
        </Link>
        <Link to="/admin/logs" className="links__logs">
          <div className="link">
            <AiOutlineSchedule />
            <h3>Logs</h3>
          </div>
        </Link>
        <Link to="/admin/register" className="links__add__admin">
          <div className="link">
            <AiOutlineUserAdd />
            <h3>Add Admin</h3>
          </div>
        </Link>
        <Link to="/admin/register" className="links__add__staff">
          <div className="link">
            <AiOutlineUsergroupAdd />
            <h3>Add Staff</h3>
          </div>
        </Link>
        <button onClick={logoutHandler} className="links__logout">
          <div className="link">
            <FaSignOutAlt />
            <h3>Logout</h3>
          </div>
        </button>
      </div>
    </div>
  );
};

export default NavbarFront;
