import React from 'react'
import { useLocation } from 'react-router';
import SideBar from '../Sidebar';
import ProjectFields from './ProjectFields';

const EditProject = () => {

    const { state } = useLocation();
  return (
    <div>
      <div>
        <div className="dashboard d-flex">
          <div>
            <SideBar />
          </div>
          <div
            style={{
              flex: "1 1 auto",
              display: "flex",
              flexFlow: "column",
              // height: "100vh",
              overflowY: "hidden",
            }}
          >
            <ProjectFields operation={"edit"} data={state.data} />
          </div>
        </div>
      </div>
      ;
    </div>
  );
}

export default EditProject
