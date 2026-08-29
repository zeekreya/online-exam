import styles from "./Exam.module.css";
import dayjs from "dayjs";
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

const Exam = () => {
  const navigate = useNavigate();
  let [exams, setExams] = useState([]);
  let [selectedExam, setSeletedExam] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData || userData?.userType !== "admin") {
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

  const deleteExam = async (examId) => {
    try {
      let response = await axios.delete(
        `http://localhost:3000/exam?_id=${examId}`,
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

  return (
    <div
      className="vh-100 vw-100  d-flex justify-content-start align-items-center flex-column "
      className={styles.examMain}
      style={{ position: "relative" }}
    >
      <Header />

      <div style={{ height: "88vh" }} className="w-100 bg-light shadow p-3">
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
                          setSeletedExam(ele);
                          setShowModal(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteExam(ele?._id);
                        }}
                      >
                        Delete
                      </button>
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
          setSeletedExam(null);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {selectedExam ? "Edit Exam Details" : "Exam Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <FloatingLabel
              controlId="nameInput"
              label="Exam Name"
              className="mb-3"
            >
              <Form.Control
                name="name"
                type="text"
                placeholder="Exam Name"
                defaultValue={selectedExam?.name}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="timeInput"
              label="Exam Time"
              className="mb-3"
            >
              <Form.Control
                name="startTime"
                type="datetime-local"
                defaultValue={
                  selectedExam?.startTime
                    ? dayjs(selectedExam?.startTime).format("YYYY-MM-DDTHH:mm")
                    : undefined
                }
              />
            </FloatingLabel>
            <Button variant="primary" className="w-100" type="submit">
              {selectedExam ? "Update" : "Submit"}
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
export default Exam;
