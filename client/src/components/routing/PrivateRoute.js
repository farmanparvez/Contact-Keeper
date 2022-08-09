import React, { Fragment } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component }) => {
  const auth = localStorage.getItem("token");
  return (
    <Fragment>{!auth ? <Navigate to="/login" /> : <Component />}</Fragment>
  );
};

export default PrivateRoute;

// const PrivateRoute = ({ component: Component }) => {
//   // const { }
// const token = localStorage.getItems('token')
// {!token ? <Spin/> : <}
//   const [authState] = useAuth();
//   const { isAuthenticated, loading } = authState;
//   if (loading) return <Spinner />;
//   if (isAuthenticated) return <Component />;
//   return <Navigate to='/login' />;
// };

// export default PrivateRoute;
