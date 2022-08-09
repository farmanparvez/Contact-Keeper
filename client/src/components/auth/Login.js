import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/authAcitons";
import { reset } from "../../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { openNotificationWithIcon } from "../../utils/notification";
import { Spin } from "antd";

const Login = () => {
  const { isLoading, isSuccess, isError, isMessage } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      openNotificationWithIcon("error", "Failed", isMessage);
    }
    if (isSuccess) navigate("/");

    if (localStorage.getItem("token")) {
      return navigate("/");
    }
    return () => dispatch(reset());
  }, [isError, isMessage, isSuccess, dispatch, navigate]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      openNotificationWithIcon("error", "Failed", "Please fill in all fields");
    } else {
      dispatch(login({ email, password }));
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <Spin spinning={isLoading}>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              <h3>Email Address</h3>
            </label>
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
            <label htmlFor="password">
              <h3>Password</h3>
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <input
            type="submit"
            value="Login"
            className="btn btn-primary btn-block"
          />
        </form>
      </Spin>
    </div>
  );
};

export default Login;
