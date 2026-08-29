import styles from "./Dashboard.module.css";
import StudentHeader from "../../components/studentHeader/StudentHeader";
import { Form, Button, FloatingLabel, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BoxArrowRight } from "react-bootstrap-icons";

import { useState } from "react";
import {
  House,
  Gear,
  Bell,
  Person,
  Eye,
  EyeSlash,
  Plus,
  Trash,
} from "react-bootstrap-icons";
import { PlusCircle, Pencil } from "react-bootstrap-icons";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Dashboard = () => {
  const navigate = useNavigate();
  let [exam, setExam] = useState("");

  return (
    <div
      className="vh-100 vw-100 d-flex justify-content-start align-items-center flex-column "
      style={{ position: "relative" }}
    >
      <StudentHeader />

      <div className="row w-100 h-100">
        <div className="col-md-4 h-25">
          <div className=" h-100 w-100 bg-primary text-light  d-flex justify-content-center align-itmes-center rounded rounded-4 shadow flex-column">
            <p
              className="display-2 text-center"
              onClick={() => navigate("/studentExam")}
            >
              Exams
            </p>
            <p className="display-4 text-center">0</p>
          </div>
        </div>

        <div className=" col-md-4 h-25">
          <div className=" h-100 w-100 bg-warning text-light   d-flex justify-content-center align-itmes-center rounded rounded-4 shadow flex-column">
            <p className="display-2 text-center">Questions</p>
            <p className="display-4 text-center">0</p>
          </div>
        </div>
        <div className=" col-md-4 h-25">
          <div className=" h-100 w-100 bg-info text-light  d-flex justify-content-center align-itmes-center rounded rounded-4 shadow flex-column">
            <p className="display-2 text-center">Results</p>
            <p className="display-4 text-center">0</p>
          </div>
        </div>

        <div
          className=" col-md-12  "
          style={{ minHeight: "62vh", height: "auto" }}
        >
          <div className=" h-100 w-100  bg-light d-flex justify-content-center align-itmes-center rounded rounded-4 shadow flex-column">
            <p className="display-6 text-center  ">Upcomming Exams</p>
          </div>
        </div>
      </div>

      <Button
        
        className=" p-2 d-flex justify-content-center align-items-center border border-light border-3 bg-danger text-light"
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,
          borderRadius: "20%",
          height: "50px",
          width: "50px",
          
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        <BoxArrowRight size={40}  />
      </Button>
    </div>
  );
};
export default Dashboard;
