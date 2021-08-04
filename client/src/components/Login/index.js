import { LoginButton } from "..";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";
import axios from "axios";
const URL_API = "http://localhost:3001";

const Login = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <Redirect to="/home" />
      ) : (
        <div>
          <h1>pagina de Home sin logear</h1>
          <LoginButton btnText="Comencemos" loginWith="Popup" />
        </div>
      )}
      <div></div>
    </div>
  );
};

export default Login;
