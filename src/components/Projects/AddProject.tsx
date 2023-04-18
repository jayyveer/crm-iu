import React from 'react'
import SideBar from '../Sidebar';
import ProjectFields from './ProjectFields'
import { ProjectForm } from './ProjectForm';

interface FormModal {
  projectName: string;
  clientName: string;
  status: string;
  startDate: any;
  endDate: any;
  urls: string[];
}

const AddProject = () => {
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
            <ProjectFields operation={"add"} />
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default AddProject
