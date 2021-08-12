import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "../../views/Home/Home";
import VerifyEmail from "../VerifyEmail";

const ProtectedRoute = ({ component, ...args }) => {
  const { user } = useAuth0();
  return user?.email_verified ? (
    <Route component={withAuthenticationRequired(component)} {...args} />
  ) : (
    <VerifyEmail />
  );
};

export default ProtectedRoute;
