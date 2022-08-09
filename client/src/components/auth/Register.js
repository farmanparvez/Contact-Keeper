import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../redux/actions/authAcitons";
import { reset } from "../../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { openNotificationWithIcon } from "../../utils/notification";

const Register = (props) => {
  const { isLoading, isSuccess, isError, isMessage } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate("/");
    if (isError) {
      openNotificationWithIcon("error", "Failed", isMessage);
    }
    if (localStorage.getItem("token")) {
      return navigate("/");
    }
    return () => dispatch(reset());
  }, [isError, isMessage, isSuccess, dispatch, navigate]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      openNotificationWithIcon("info", "Please enter all fields")
    } else if (password !== password2) {
      openNotificationWithIcon("error", "Failed", "Passwords do not match");
    } else {
      dispatch(
        signUp({
          username: name,
          email,
          password,
          confirmPassword: password2,
        })
      );
    }
  };

  return (
    <Spin spinning={isLoading}>
      <div className="form-container">
        <h1>
          Account <span className="text-primary">Register</span>
        </h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name"><h3>Name</h3></label>
            <input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email"><h3>Email Address</h3></label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"><h3>Password</h3></label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              minLength="6"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2"><h3>Confirm Password</h3></label>
            <input
              id="password2"
              type="password"
              name="password2"
              value={password2}
              onChange={onChange}
              required
              minLength="6"
            />
          </div>
          <input
            type="submit"
            value="Register"
            className="btn btn-primary btn-block"
          />
        </form>
      </div>
    </Spin>
  );
};

export default Register;
