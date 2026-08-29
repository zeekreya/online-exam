import styles from "./Header.module.css"
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom'; // Changed Link to NavLink
import { BoxArrowRight } from "react-bootstrap-icons";


const Header = () => {
    let navigate = useNavigate();

    // Style helper to keep the code clean
    const navLinkStyle = ({ isActive }) => ({
        textDecoration: "none",
        color: isActive ? "black" : "grey",
        borderBottom: isActive ? "2px solid red" : "none",
        paddingBottom: "5px"
    });

    return (
        <div style={{ minHeight: "12vh", height: "auto" }} className="vw-100 pb-3">
            <Navbar collapseOnSelect expand="lg" className="bg-light border border-1 shadow shadow-color-primary">
                <Container fluid>
                    <img
                        src="/logo.png"
                        alt="Logo"
                        style={{ height: "50px", width: "auto", marginRight: "10px", borderRadius: "50%" }}
                    />
                    <Navbar.Brand >Online Exam</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto h-100">
                            {/* Use 'end' on the home route so it doesn't highlight for every sub-route */}
                            <NavLink className='fs-6 p-3' style={navLinkStyle} to="/home/" end>Home</NavLink>
                            <NavLink className='fs-6 p-3' style={navLinkStyle} to="/exam">Exam</NavLink>
                            <NavLink className='fs-6 p-3' style={navLinkStyle} to="/question">Question</NavLink>
                            <NavLink className='fs-6 p-3' style={navLinkStyle} to="/Result">Result</NavLink>
                            <NavLink className='fs-6 p-3' style={navLinkStyle} to="/profile">Profile</NavLink>
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
}
export default Header;