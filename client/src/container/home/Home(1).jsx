import styles from "./Home.module.css";
import Header from "../../components/header/Header";
import { Form, Button, FloatingLabel, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { BoxArrowRight } from "react-bootstrap-icons";

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

const Home = () => {
  const navigate = useNavigate();
  let [data, setData] = useState(null);

  useEffect(() => {
    getData();
    let userData = JSON.parse(localStorage.getItem("userData"));
    if(!userData || userData?.userType !== "admin") {
      navigate("/");
    }
  }, []);

  const getData = async () => {
    try {
      let response = await axios.get(
        `http://localhost:3000/user/dashboard-data`,
      );

      if (response?.data?.success) {
        setData(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
      alert(error?.message);
    }
  };

  return (
    <div
      className="vh-100 vw-100 d-flex justify-content-start align-items-center flex-column "
      style={{ position: "relative" }}
    >
      <Header />

      <div className="row w-100 h-100 p-0 m-0">
        <div className="col-md-4 h-25">
          <div className=" h-100 w-100 bg-primary text-light  d-flex justify-content-center align-itmes-center rounded rounded-4 shadow flex-column">
            <p
              className="display-2 text-center"
              onClick={() => navigate("/exam")}
            >
              Exams
            </p>
            <p className="display-4 text-center">{data?.examCount}</p>
          </div>
        </div>

        <div className="col-md-4 h-25">
          <div className=" h-100 w-100 bg-warning text-light   d-flex justify-content-center align-itmes-center rounded rounded-4 shadow flex-column">
            <p className="display-2 text-center">Questions</p>
            <p className="display-4 text-center">{data?.questionCount}</p>
          </div>
        </div>
        <div className="col-md-4 h-25">
          <div className=" h-100 w-100 bg-info text-light  d-flex justify-content-center align-itmes-center rounded rounded-4 shadow flex-column">
            <p className="display-2 text-center">Students</p>
            <p className="display-4 text-center">{data?.userCount}</p>
          </div>
        </div>

        <div
          className=" col-md-12"
          style={{ minHeight: "62vh", height: "auto" }}
        >
          <div
            className=" h-100 w-100  bg-secondary d-flex justify-content-start align-items-start rounded rounded-4 shadow flex-column"
            style={{ overflowY: "scroll" }}
          >
            {data?.upComingExam ? (
              data?.upComingExam?.map((ele, i) => {
                return (
                  <div key={i} className="w-100 p-3">
                    <div className="w-100 h-100 bg-light rounded shadow p-2">
                      <p className="display-6">
                        Exam Name:{" "}
                        <span className="text-primary">
                          <b>{ele?.name}</b>
                        </span>
                      </p>
                      <p className="display-6">
                        Date and Time:{" "}
                        <span className="text-primary">
                          <b>
                            {dayjs(ele?.startTime)?.format(
                              "DD-MM-YYYY HH:mm A",
                            )}
                          </b>
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="display-6 text-center  ">No Upcomming Exams</p>
            )}
          </div>
        </div>
      </div>

      <Button
        variant="primary"
        className="p-2 d-flex justify-content-center align-items-center"
        style={{
          position: "absolute",
          right: 20,
          bottom: 80,
          borderRadius: "50%",
          height: "50px",
          width: "50px",
        }}
      >
        <PlusCircle
          size={35}
          className=" d-flex justify-content-center align-items-center"
        />
      </Button>
      <Button
        variant="danger"
        className="text-center"
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,
          borderRadius: "50%",
          height: "50px",
          width: "50px",
        }}
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        <BoxArrowRight size={35} className="p-1" />
      </Button>
    </div>
  );
};
export default Home;
