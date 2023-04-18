import { message } from "antd";
import { useEffect, useState } from "react";
import {
  Navbar as BootstrapNavbar,
  Container,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const userName = localStorage.getItem('name') ?? null
    setUserName(userName !== null ? userName : '');
  }, []);

  const logoutHandler = () =>{
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    navigate('/')
    message.info("Logged out Succesfully")
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid ">
          <div
            className="collapse navbar-collapse justify-content-end "
            id="navbarColor01"
          >
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                {userName}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                   <Link to={"/profile"} className="">
                      Profile
                    </Link></Dropdown.Item>
                <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
