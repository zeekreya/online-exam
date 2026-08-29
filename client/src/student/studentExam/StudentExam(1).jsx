import styles from "./StudentExam.module.css";
import dayjs from "dayjs";
import { BoxArrowRight } from "react-bootstrap-icons";
import StudentHeader from "../../components/studentHeader/StudentHeader";
import {
  Form,
  Button,
  FloatingLabel,
  Dropdown,
  Table,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { ListGroup } from "react-bootstrap";

const StudentExam = () => {
  const navigate = useNavigate();
  let [exams, setExams] = useState([]);
  let [selectedExam, setSeletedExam] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    if(!userData || userData?.userType !== "student") {
      navigate("/");
    }
    getExam();
  }, []);

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      let data = {};
      let formData = new FormData(event.target);

      for (let [key, val] of formData.entries()) {
        data[key] = val;
      }

      if (selectedExam) {
        let response = await axios.put(
          `http://localhost:3000/exam?_id=${selectedExam?._id}`,
          data,
        );

        alert(response?.data?.message);
        if (response?.data?.success) {
          setShowModal(false);
          setSelectedExam(null);
          getExam();
        }
      } else {
        let response = await axios.post("http://localhost:3000/exam", data);

        alert(response?.data?.message);
        if (response?.data?.success) {
          setShowModal(false);
          setSeletedExam(null);
          getExam();
        }
      }
    } catch (error) {
      console.log(error);
      alert(error?.message);
    }
  };

  const onSubmitExam = async (event) => {
    try {
      event.preventDefault();
      let data = {};
      let reqData = [];
      let formData = new FormData(event.target);

      for (let [key, val] of formData.entries()) {
        data[key] = val;
      }

      for (let key in data) {
        reqData.push({
          questionId: key,
          response: parseInt(data[key]),
        });
      }

      let response = await axios.post(
        `http://localhost:3000/exam/submit-exam?examId=${selectedExam?._id}&userId=${JSON.parse(localStorage.getItem("userData"))?._id}`,
        reqData,
      );

      alert(response?.data?.message);
      if (response?.data?.success) {
        setShowModal(false);
        setSeletedExam(null);
        getExam();
      }
    } catch (error) {
      console.log(error);
      alert(error?.message);
    }
  };

  const takeExam = async (examId, userId, examData) => {
    try {
      let response = await axios.post("http://localhost:3000/exam/take-exam", {
        examId: examId,
        userId: userId,
      });

      alert(response?.data?.message);
      if (response?.data?.success) {
        setSeletedExam(examData);
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
      alert(error?.message);
    }
  };

  const getExam = async () => {
    try {
      let response = await axios.get("http://localhost:3000/exam");

      if (response?.data?.success) {
        setExams(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
      alert(error?.message);
    }
  };

  const getQuestions = async () => {
    try {
      let response = await axios.get("http://localhost:3000/question");

      if (response?.data?.success) {
        setQuestion(response?.data?.data);
      }
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
      <StudentHeader />

      <div style={{ height: "88vh" }} className="w-100 bg-light shadow ">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Exam Name</th>
              <th>Exam Time</th>
              <th>Total Questions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams?.map((ele, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{ele?.name}</td>
                  <td>{dayjs(ele?.startTime).format("DD-MM-YYYY HH:mm A")}</td>
                  <td>{ele?.questions?.length}</td>
                  <td>
                    <div className="w-100 d-flex justify-content-evenly">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setShowModal(true);
                        }}
                        disabled={dayjs(ele?.startTime).isAfter(dayjs())}
                        onClick={() => {
                          takeExam(
                            ele?._id,
                            JSON.parse(localStorage.getItem("userData"))?._id,
                            ele,
                          );
                        }}
                      >
                        Take Exam
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <Button
        variant="danger"
        className=" p-2 d-flex justify-content-center align-items-center border border-danger border-3 bg-light text-danger"
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

      <Modal
        show={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => {
          setShowModal(false);
          setSeletedExam(null);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Take Exam
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "75vh", overflowY: "scroll" }}>
          <Form onSubmit={onSubmitExam}>
            {selectedExam?.questions?.map((ele, i) => {
              return (
                <div key={i} className="mt-2">
                  <p>
                    Q.{i + 1} {ele?.question}
                  </p>
                  <Form.Check
                    label={`1. ${ele?.optionOne}`}
                    name={ele?._id}
                    type={"radio"}
                    id={`q-${i}-op-1`}
                    value={1}
                  />
                  <Form.Check
                    label={`2. ${ele?.optionTwo}`}
                    name={ele?._id}
                    type={"radio"}
                    id={`q-${i}-op-2`}
                    value={2}
                  />
                  <Form.Check
                    label={`3. ${ele?.optionThree}`}
                    name={ele?._id}
                    type={"radio"}
                    id={`q-${i}-op-3`}
                    value={3}
                  />
                  <Form.Check
                    label={`4. ${ele?.optionFour}`}
                    name={ele?._id}
                    type={"radio"}
                    id={`q-${i}-op-4`}
                    value={4}
                  />
                </div>
              );
            })}
            <Button variant="primary" className="w-100 mt-3" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default StudentExam;
