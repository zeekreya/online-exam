import styles from "./Signup.module.css";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");
  let [username, setUsername] = useState("");
  let [phone, setPhone] = useState("");
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

      let response = await axios.post("http://localhost:3000/user", data);

      alert(response?.data?.message);
      if (response?.data?.success) {
        navigate("/");
      }
      if (response?.data?.user) {
        alert(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles?.signupMain}>
      <div className={`${styles?.signupContainer} shadow border rounded`}>
        <p className={styles?.signupText}>Signup Page</p>
        <Form className={styles?.signupForm} onSubmit={onSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="User Name"
            className="mb-3"
          >
            <Form.Control
              name="name"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </FloatingLabel>
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
          <FloatingLabel
            controlId="floatingInput"
            label="Phone Number"
            className="mb-3"
          >
            <Form.Control
              name="phone"
              placeholder="Phone Number"
              onChange={(e) => setPhone(e.target.value)}
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
          <Button variant="primary" type="submit" className={styles?.signupBtn}>
            Signup
          </Button>
          <Button
            variant="warning"
            type="button"
            className={styles?.signupBtn}
            onClick={() => navigate("/")}
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default Signup;
