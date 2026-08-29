import styles from "./Result.module.css";
import Header from "../../components/header/Header";
import {
  Form,
  Button,
  FloatingLabel,
  Dropdown,
  Table,
  Modal,
} from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

const Result = () => {
  const navigate = useNavigate();
  let [result, setResult] = useState([]);
  let [exam, setExam] = useState([]);
  let [users, setUsers] = useState([]);
  let [filterExamId, setFilterExamId] = useState(null);
  let [filterUserId, setFilterUserId] = useState(null);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    if(!userData || userData?.userType !== "admin") {
      navigate("/");
    }
    getExams();
    getUsers();
    getUserResult();
  }, []);

  const getExams = async () => {
    try {
      let response = await axios.get(`http://localhost:3000/exam`);

      if (response?.data?.success) {
        setExam(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
      alert(error?.message);
    }
  };
  const getUsers = async () => {
    try {
      let response = await axios.get(
        `http://localhost:3000/user?userType=student`,
      );

      if (response?.data?.success) {
        setUsers(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
      alert(error?.message);
    }
  };

  const getUserResult = async () => {
    try {
      let url = `http://localhost:3000/result/exam-result?`;
      if (filterExamId) {
        url = url + `examId=${filterExamId}&`;
      }
      if (filterUserId) {
        url = url + `userId=${filterUserId}&`;
      }
      let response = await axios.get(url);

      let resultData = [];
      if (response?.data?.success) {
        console.log(response?.data?.data);
        for (let i = 0; i < response?.data?.data?.length; i++) {
          let correctAnswersCount = 0;
          for (let j = 0; j < response?.data?.data?.[i]?.data?.length; j++) {
            if (
              parseInt(
                response?.data?.data?.[i]?.data?.[j]?.question?.correctOption,
              ) == response?.data?.data?.[i]?.data?.[j]?.userResponse
            ) {
              correctAnswersCount++;
            }
          }
          resultData.push({
            examName: response?.data?.data?.[i]?.examData?.name,
            userName: response?.data?.data?.[i]?.userData?.name,
            totalQuestions: response?.data?.data?.[i]?.data?.length,
            correctAnswersCount: correctAnswersCount,
            wrongAnswersCount:
              response?.data?.data?.[i]?.data?.length - correctAnswersCount,
            percentage:
              (correctAnswersCount / response?.data?.data?.[i]?.data?.length) *
              100,
          });
        }
      }
      setResult(resultData);
    } catch (error) {
      console.log(error);
      alert(error?.message);
    }
  };

  return (
    <div
      className="vh-100 vw-100  d-flex justify-content-start align-items-center flex-column "
      style={{ position: "relative" }}
    >
      <Header />
      <div style={{ height: "88vh" }} className="w-100 bg-light shadow p-3">
        <div className="row">
          <div className="col-md-5">
            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              name="examName"
              defaultValue={"Select Exam"}
              onChange={(e) => {
                setFilterExamId(e.target.value);
              }}
            >
              <option value={""}>Select Exam</option>
              {exam?.map((ele, i) => {
                return (
                  <option key={i} value={ele?._id}>
                    {ele?.name}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          <div className="col-md-5">
            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              name="userName"
              defaultValue={"Select user"}
              onChange={(e) => {
                setFilterUserId(e.target.value);
              }}
            >
              <option value={""}>Select User</option>
              {users?.map((ele, i) => {
                return (
                  <option key={i} value={ele?._id}>
                    {ele?.name}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          <div className="col-md-2">
            <Button
              variant="primary"
              className="w-100"
              onClick={() => {
                getUserResult();
              }}
            >
              Show Result
            </Button>
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Exam</th>
              <th>Student</th>
              <th>Total Questions</th>
              <th>Correct Answers</th>
              <th>Wrong answers</th>
              <th>Final Result</th>
            </tr>
          </thead>
          <tbody>
            {result?.map((ele, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td> {ele?.examName}</td>
                  <td> {ele?.userName}</td>
                  <td> {ele?.totalQuestions}</td>
                  <td> {ele?.correctAnswersCount}</td>
                  <td> {ele?.wrongAnswersCount}</td>
                  <td>
                    {ele?.percentage > 35 ? "Pass" : "Fail;"} ({ele?.percentage}
                    %)
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Button
        variant="danger"
        className=" p-2 d-flex justify-content-center align-items-center border border-danger border-3 bg-light text-danger "
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
        <BoxArrowRight size={40} />
      </Button>
    </div>
  );
};
export default Result;
