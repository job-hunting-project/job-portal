import React from "react";
import { Link, NavLink } from "react-router-dom";

class SidebarNav extends React.Component {
  render() {
    return (
      <ul className="sidebar-nav">
        <li className="sidebar-header">Quản lí</li>

        <li className="sidebar-item">
          <NavLink to="/recruiter/add-job" className="sidebar-link">
            <i className="align-middle" data-feather="sliders"></i>{" "}
            <span className="align-middle">Thêm tin tuyển dụng</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/recruiter/manager-job" className="sidebar-link">
            <i className="align-middle" data-feather="sliders"></i>{" "}
            <span className="align-middle">Quản lý tin tuyển dụng</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/recruiter/recruitment" className="sidebar-link">
            <i className="align-middle" data-feather="sliders"></i>{" "}
            <span className="align-middle">Quản lý ứng viên đã ứng Tuyển</span>
          </NavLink>
        </li>
      </ul>
    );
  }
}
export default SidebarNav;
