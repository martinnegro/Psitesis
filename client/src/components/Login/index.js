import { LoginButton } from "..";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import RegisterEmail from "../RegisterEmail/RegisterEmail";
const URL_API = "http://localhost:3001";

const Login = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <Redirect to="/home" />
      ) : (
        <div>
          <p>Registrate para utilizar todas las funciones de PsiTesis</p>
          <LoginButton btnText="Iniciar sesion con Google" loginWith="Popup" />
          <RegisterEmail />
          
          <br/><hr/>
          <p>¿ya tenés cuenta? Inicia Sesión</p> 
          {/* hacer un link a "inicia sesion" */}
          <p>prefiero hacerlo más tarde</p>
          {/* envolver con un link lo de la linea 24 */}
        </div>
      )}
      <div></div>
    </div>
  );
};

export default Login;
