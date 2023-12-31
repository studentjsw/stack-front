import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../App";
import icon from "../../assets/icon.png";
import Button from "@mui/material/Button";
import Spinner from "react-bootstrap/Spinner";

import "./signup.css";

export default function Signup() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  let handleSubmit = async () => {
    // console.log(displayName, email, password);
    setLoading(true);
    let res = await axios.post(`${API_URL}/signup`, {
      displayName,
      email,
      password,
    });
    if (res.data.statusCode === 200) {
      navigate("/login");
    } else {
      if (res.data.statusCode === 400) {
        setMessage(res.data.message);
      } else {
        setMessage(res.data.error.message);
      }
      // console.log(res.data);
    }
    setLoading(false);
  };

  return (
    <div>
      <form className="signup-form d-flex flex-column align-items-center my-5 mx-66">
        <img src={icon} alt="logo" />
        <div>
          <div className="form-inputs align-items-center">
            <label htmlFor="displayName">Display name </label>
            <br />
            <input
              type="text"
              name="displayName"
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div className="form-inputs align-items-center">
            <label htmlFor="email">Email </label>
            <br />
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-inputs align-items-center">
            <label htmlFor="password">Password </label>
            <br />
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center px-3">
            <Button
              className="w-100 h-50"
              variant="contained"
              size="small"
              onClick={() => handleSubmit()}
            >
              {loading ? (
                <Spinner animation="border" variant="light" />
              ) : (
                "Sign up"
              )}
            </Button>
          </div>
        </div>
        <span>
          {message ? (
            <div style={{ color: "red", textAlign: "Center" }}>{message}</div>
          ) : (
            <></>
          )}
        </span>
      </form>
    </div>
  );
}