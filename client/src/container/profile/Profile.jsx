import styles from "./Profile.module.css";
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
import axios from "axios";
import { PlusCircle, Pencil } from "react-bootstrap-icons";
import Header from "../../components/header/Header";

const Profile = () => {
  const navigate = useNavigate();
  let [userData, setUserData] = useState(null);

  let [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    if(!userData || userData?.userType !== "admin") {
      navigate("/");
    }
    setUserData(JSON.parse(localStorage.getItem("userData")));
  }, []);

  const onFomSubmit = async (event) => {
    try {
      event.preventDefault();
      let data = {};
      let formData = new FormData(event.target);

      for (let [key, val] of formData.entries()) {
        data[key] = val;
      }

      console.log(data);

      let response = await axios.put(
        `http://localhost:3000/user?_id=${userData?._id}`,
        data,
      );

      alert(response?.data?.message);
      if (response?.data?.success) {
        localStorage.setItem("userData", JSON.stringify(response?.data?.data));
        setUserData(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
      alert(error?.message);
    }
  };

  return (
    <div className={styles?.profileMain}>
      <Header />

      <div className={`${styles?.profileContainer} shadow border rounded`}>
        <div className={styles?.profileBox}>
          <p className={styles?.profileText}>Profile Page</p>
          <Form className={styles?.profileForm} onSubmit={onFomSubmit}>
            <FloatingLabel
              controlId="floatingInput"
              label="User Name"
              className="mb-3"
            >
              <Form.Control
                name="name"
                placeholder="username"
                defaultValue={userData?.name}
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
                defaultValue={userData?.email}
                disabled
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
                defaultValue={userData?.phone}
                disabled
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
              name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                defaultValue={userData?.password}
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
            <Button
              variant="primary"
              type="submit"
              className={styles?.profileBtn}
            >
              Update Profile
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Profile;
