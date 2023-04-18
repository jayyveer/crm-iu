import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";
import { NavLink } from "react-router-dom";


const SideBar = () => {
  return (
    <>
      <CDBSidebar
        className="border"
        textColor={""}
        backgroundColor={"bg-primary"}
        breakpoint={0}
        toggled={false}
        minWidth={""}
        maxWidth={""}
      >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="p-2 " style={{ color: "inherit" }}>
            Credential Manager
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/dashboard" className="activeClicked" >
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/projects" className="activeClicked">
              <CDBSidebarMenuItem icon="table">Projects</CDBSidebarMenuItem>
            </NavLink>
            {/* <NavLink to="/attendance-report" className="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">
                Attendance Report
              </CDBSidebarMenuItem>
            </NavLink> */}
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </>
  );
};

export default SideBar;
