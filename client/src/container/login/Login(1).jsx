import styles from "./Login.module.css";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Stack } from "react-bootstrap";
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

const Login = () => {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      if (userData?.userType == "admin") {
        navigate("/home");
      } else {
        navigate("/studentExam");
      }
    }
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data = {};
      let formData = new FormData(event.target);

      for (let [key, val] of formData.entries()) {
        data[key] = val;
      }

      let response = await axios.get(
        `http://localhost:3000/user?email=${data?.email}&&password=${data?.password}`,
      );

      if (response?.data?.success && response?.data?.data?.length) {
        localStorage.setItem(
          "userData",
          JSON.stringify(response?.data?.data?.[0]),
        );
        alert("Authenticated Successfully!");
        if (response?.data?.data?.[0]?.userType == "admin") {
          navigate("/home");
        } else {
          navigate("/studentExam");
        }
      } else {
        alert("Invalid Credentials.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles?.loginMain}>
      <div className={`${styles?.loginContainer} shadow border rounded`}>
        <p className={styles?.loginText}>Login Page</p>
        <Form className={styles?.loginForm} onSubmit={onSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              name="email"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p
              onClick={() => setShowPassword(!showPassword)}
              className={styles?.passwordToggle}
            >
              {showPassword ? (
                <AiOutlineEye size={25} color="blue" />
              ) : (
                <AiOutlineEyeInvisible size={25} color="red" />
              )}
            </p>
          </FloatingLabel>
          <Button variant="primary" type="submit" className={styles?.loginBtn}>
            Login
          </Button>
          <Button
            variant="warning"
            type="button"
            className={styles?.loginBtn}
            onClick={() => navigate("/signup")}
          >
            Signup
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default Login;
