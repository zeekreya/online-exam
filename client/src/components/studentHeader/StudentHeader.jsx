import styles from "./StudentHeader.module.css";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom"; 
import { BoxArrowRight } from "react-bootstrap-icons";

const StudentHeader = () => {
  let navigate = useNavigate();

  // Style helper to keep the code clean
  const navLinkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "black" : "grey",
    borderBottom: isActive ? "2px solid red" : "none",
    paddingBottom: "5px",
  });

  return (
    <div style={{ minHeight: "12vh", height: "auto" }} className="vw-100 pb-3">
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-light border border-1 shadow shadow-color-primary"
      >
        <Container fluid>
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              height: "50px",
              width: "auto",
              marginRight: "10px",
              borderRadius: "50%",
            }}
          />
          <Navbar.Brand>Online Exam</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto h-100">
              {/* Use 'end' on the home route so it doesn't highlight for every sub-route */}
              {/* <NavLink
                className="fs-6 p-3"
                style={navLinkStyle}
                to="/dashboard/"
                end
              >
                Home
              </NavLink> */}
              <NavLink
                className="fs-6 p-3"
                style={navLinkStyle}
                to="/studentExam"
              >
                Exam
              </NavLink>
              <NavLink
                className="fs-6 p-3"
                style={navLinkStyle}
                to="/studentResult"
              >
                Result
              </NavLink>
            </Nav>
            <Nav className="align-items-center ">
              <div
                className="border border-3 border-danger d-flex justify-content-center align-items-center h3 "
                style={{
                  height: "50px",
                  width: "50px",
                  marginRight: "10px",
                  borderRadius: "50%",
                }}
              >
                {JSON.parse(localStorage.getItem("userData"))?.name?.slice(0,2)?.toUpperCase()}
              </div>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
export default StudentHeader;
