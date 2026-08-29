import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './container/login/Login';
import Signup from './container/signup/Signup';
import Home from './container/home/Home';
import Exam from './container/exam/Exam';
import Profile from './container/profile/Profile';
import Result from './container/result/Result';
import Password from './container/password/Password';
import Question from './container/question/Question'
import Dashboard from "./student/Dashboard/Dashboard";
import StudentExam from "./student/studentExam/StudentExam"
import StudentResult from "./student/studentResult/StudentResult"
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/result" element={<Result />} />
        <Route path="/password" element={<Password />} />
        <Route path="/question" element={<Question />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/studentExam" element={<StudentExam />} />
        <Route path="/studentResult" element={<StudentResult />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
