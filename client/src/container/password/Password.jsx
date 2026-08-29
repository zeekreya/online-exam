import styles from "./Password.module.css";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BoxArrowRight } from "react-bootstrap-icons";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Stack } from 'react-bootstrap';
import { House, Gear, Bell, Person, Eye, EyeSlash, Plus, Trash } from 'react-bootstrap-icons';
import { PlusCircle, Pencil } from 'react-bootstrap-icons';
import axios from "axios";

const Password = () => {
    const navigate = useNavigate();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data = {};
            let formData = new FormData(event.target);

            for (let [key, val] of formData.entries()) {
                data[key] = val;
            }

            let response = await axios.get(`http://localhost:3000/user?}`)


            if (response?.data?.email) {
                alert("Password Reset Successfully");
                navigate("/");
            } else {
                alert("Invalid Credentials.");
            }


        } catch (error) {
            console.log(error);
        }



    }


    return (
        <div className={styles?.passwordMain}>
            <div className={`${styles?.passwordContainer} shadow border rounded`}>
                <p className={styles?.passwordText}>Reset Password</p>
                <Form className={styles?.passwordForm} onSubmit={onSubmit}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control name="email" type = "email"   placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control name="password" type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <p onClick={() => setShowPassword(!showPassword)} className={styles?.passwordToggle}>
                            {showPassword ? <AiOutlineEye size={25} color="blue" /> : <AiOutlineEyeInvisible size={25} color="red" />}
                        </p>
                    </FloatingLabel>
                    <Button variant="primary" type="submit" className={styles?.passwordBtn}>
                      Reset Password
                    </Button>
                    <Button variant="warning" type="button" className={styles?.passwordBtn} onClick={() => navigate("/")}>
                        Login
                    </Button>


                </Form>

            </div>
        </div>
    )
}
export default Password;