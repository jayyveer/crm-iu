import { message, Modal, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import SideBar from "../Sidebar";

interface ProjectsData {
  projectName: string;
  clientName: string;
  status: string;
  startDate: any;
  endDate: any;
  urls: string[];
  _id: string;
}

const Projects = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [projectsData, setProjectsData] = useState<readonly ProjectsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);

  const columns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      render: (text: string, record: ProjectsData, index: number) => index + 1,
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      render: (text: string, record: ProjectsData) =>
        record.clientName ? record.clientName : " - ",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text: string, record: ProjectsData) =>
        record.startDate
          ? new Date(record.startDate).toLocaleDateString()
          : " - ",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text: string, record: ProjectsData) =>
        record.endDate ? new Date(record.endDate).toLocaleDateString() : " - ",
    },
    // {
    //   title: "Site URLs",
    //   dataIndex: "siteUrls",
    //   key: "siteUrls",
    //   render: (siteUrls: string[], record: ProjectsData) =>
    //     siteUrls.map((url) => <div key={url}>{url}</div>),
    // },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string, record: ProjectsData) =>
        record.status ? record.status : " - ",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: ProjectsData) => (
        <Space size="middle">
          <Button
            variant="outline-success"
            size="sm"
            type="button"
            onClick={() => handleView(record)}
          >
            <i className="fas fa-eye"></i>
          </Button>
          <Button
            variant="outline-info"
            size="sm"
            type="button"
            onClick={() => handleEdit(record)}
          >
            <i className="fas fa-edit"></i>
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            type="button"
            onClick={() => handleDelete(record)}
          >
            <i className="fas fa-trash"></i>
          </Button>
        </Space>
      ),
    },
  ];

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchAllProjects = async () => {
    try {
      const response = await axios.get(`${apiUrl}/project`, config);
      setProjectsData(response.data);
      setLoading(false);
    } catch (error) {
      console.log("----------Error---------", error);
    }
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const handleAdd = () => {
    navigate("/addProject");
  };

  const handleView = (record: ProjectsData) => {
    navigate(`/viewProject/${record._id}`, { state: {projectData: record}})
    // window.open(`http://localhost:3000/viewProject/${records._id}`, "_blank");
  };

  const handleEdit = (record: ProjectsData) => {
    navigate(`/editProject/${record._id}`, { state: { data: record } });
  };

  const handleDelete = async (records: ProjectsData) => {
    Modal.confirm({
      title: `Are you sure you want to delete the project "${records.projectName}"?`,
      onOk: async () => {
        try {
          setLoading(true);

          await axios.delete(
            `${apiUrl}/project/${records._id}`,
            config
          );
          message.success("Project deleted");
          fetchAllProjects();
        } catch (error) {
          console.error("Error deleting project:", error);
          message.error("Error deleting project");
        } finally {
          setLoading(false);
        }
      },
    });
  };
  return (
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
          <Navbar />
          <div>
            <div className="card-bg w-100 border d-flex flex-column">
              <div className="p-4 d-flex flex-column h-100">
                <div className="d-flex align-items-center justify-content-between">
                  <h4 className="m-0 h5 font-weight-bold text-dark">
                    Manage Project's
                  </h4>
                  <div className="py-1 px-2 bg-grey rounded-circle">
                    <i className="fas fa-suitcase"></i>
                  </div>
                </div>
                <div
                  className="card-bg w-100 border d-flex flex-column p-4"
                  style={{ gridRow: "span 2" }}
                >
                  <div className="">
                    <Button
                      type="button"
                      variant="primary"
                      style={{ marginBottom: 16 }}
                      onClick={handleAdd}
                    >
                      Add Project
                    </Button>
                  </div>
                  <div>
                    <Table
                      style={{ textAlign: "center" }}
                      columns={columns}
                      dataSource={projectsData}
                      loading={loading}
                      pagination={{
                        position: ["bottomCenter"],
                        current: page,
                        pageSize: pageSize,
                        onChange: (page, pageSize) => {
                          setPage(page);
                          setPageSize(pageSize);
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
