import classes from "../components/MainHeader/MainHeader.module.css";
import Signup from "../components/Signup";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/UI/Button/Button";

const UserSignUp = () => {
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const userAlert = () => {
    Swal.fire({
      text: "Account created successfully",
      icon: "success",
      confirmButtonText: "Continue to Login",
    }).then(() => {
      navigate("/user/login");
    });
  };

  const addUserHandler = (userData) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, userData)
      .then((result) => {
        if (result.status === 200) {
          userAlert();
        } else {
          // Handle unexpected response status
          setError({ message: "Unexpected response status: " + result.status });
        }
      })
      .catch((error) => {
        // Improved error handling
        if (error.response) {
          // If server responded with an error
          setError(error.response.data);
        } else if (error.request) {
          // If request was made but no response received
          setError({ message: "No response received from the server." });
        } else {
          // Something happened in setting up the request
          setError({ message: error.message });
        }
      });
  };

  return (
    <>
      <header className={classes["main-header"]}>
        <h3>User Sign Up</h3>
        <Link to="/">
          <Button>Home</Button>
        </Link>
      </header>
      <Signup error={error?.message} addUser={addUserHandler} />
    </>
  );
};

export default UserSignUp;
