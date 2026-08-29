import styles from "./Question.module.css";
import Header from "../../components/header/Header";
import { BoxArrowRight } from "react-bootstrap-icons";

import {
  Form,
  Button,
  FloatingLabel,
  Dropdown,
  Table,
  Modal,
} from "react-bootstrap";
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

const Question = () => {
  const navigate = useNavigate();
  let [question, setQuestion] = useState([]);
  let [exam, setExam] = useState([]);
  let [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    if(!userData || userData?.userType !== "admin") {
      navigate("/");
    }
    getQuestion();
    getExams();
  }, []);

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      let data = {};
      let formData = new FormData(event.target);

      for (let [key, val] of formData.entries()) {
        data[key] = val;
      }

      if (selectedQuestion) {
        let response = await axios.put(
          `http://localhost:3000/question?_id=${selectedQuestion?._id}`,
          data,
        );

        alert(response?.data?.message);
        if (response?.data?.success) {
          setShowModal(false);
          setSelectedQuestion(null);
          getQuestion();
        }
      } else {
        let response = await axios.post("http://localhost:3000/question", data);

        alert(response?.data?.message);
        if (response?.data?.success) {
          setShowModal(false);
          setSelectedQuestion(null);
          getQuestion();
        }
      }
    } catch (error) {
      console.log(error);
      alert(error?.message);
    }
  };

  const getQuestion = async () => {
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

  const getExams = async () => {
    try {
      let response = await axios.get("http://localhost:3000/exam");

      if (response?.data?.success) {
        setExam(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
      alert(error?.message);
    }
  };

  const deleteQuestion = async (questionId) => {
    try {
      let response = await axios.delete(
        `http://localhost:3000/question?_id=${questionId}`,
      );

      alert(response?.data?.message);
      if (response?.data?.success) {
        setShowModal(false);
        setSelectedQuestion(null);
        getQuestion();
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
      <Header />
      <div style={{ height: "88vh" }} className="w-100 bg-light shadow p-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Question</th>
              <th>Option 1</th>
              <th>Option 2</th>
              <th>Option 3</th>
              <th>Option 4</th>
              <th>Correct Answer</th>
              <th>Exam</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {question?.map((ele, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{ele?.question}</td>
                  <td>{ele?.optionOne}</td>
                  <td>{ele?.optionTwo}</td>
                  <td>{ele?.optionThree}</td>
                  <td>{ele?.optionFour}</td>
                  <td>{ele?.correctOption}</td>
                  <td>{ele?.examName?.name}</td>
                  <td>
                    <div className="d-flex justify-content-evenly">
                      <Button
                        variant="primary"
                        onClick={() => {
                          setSelectedQuestion(ele);
                          setShowModal(true);
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          deleteQuestion(ele?._id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <Modal
        show={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {selectedQuestion ? "Edit Question Details" : "Question Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <FloatingLabel
              controlId="questionInput"
              label="Question Name"
              className="mb-3"
            >
              <Form.Control
                name="question"
                type="text"
                placeholder="Question Name"
                defaultValue={selectedQuestion?.question}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="optionInput"
              label="Option 1 "
              className="mb-3"
            >
              <Form.Control
                name="optionOne"
                type="text"
                placeholder="Option 1"
                defaultValue={selectedQuestion?.optionOne}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="optionInput"
              label="Option 2 "
              className="mb-3"
            >
              <Form.Control
                name="optionTwo"
                type="text"
                placeholder="Option 2"
                defaultValue={selectedQuestion?.optionTwo}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="optionInput"
              label="Option 3 "
              className="mb-3"
            >
              <Form.Control
                name="optionThree"
                type="text"
                placeholder="Option 3"
                defaultValue={selectedQuestion?.optionThree}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="optionInput"
              label="Option 4 "
              className="mb-3"
            >
              <Form.Control
                name="optionFour"
                type="text"
                placeholder="Option 4"
                defaultValue={selectedQuestion?.optionFour}
              />
            </FloatingLabel>
            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              name="correctOption"
              defaultValue={selectedQuestion?.correctOption}
            >
              <option>Correct Answer</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="3">Four</option>
            </Form.Select>

            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              name="examName"
              defaultValue={selectedQuestion?.examName}
            >
              {exam?.map((ele, i) => {
                return (
                  <option key={i} value={ele?._id}>
                    {ele?.name}
                  </option>
                );
              })}
            </Form.Select>
            <Button variant="primary" className="w-100" type="submit">
              {selectedQuestion ? "Update" : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
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
        onClick={() => {
          setShowModal(true);
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
export default Question;
