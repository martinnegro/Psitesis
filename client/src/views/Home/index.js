import { LoginButton, LogoutButton } from "../../components";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
const URL_API = "http://localhost:3001";

const Home = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  async function callApiPublicRoute() {
    try {
      const response = await axios.get(`${URL_API}/public`);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function callApiPost() {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios({
        method: "post",
        url: `${URL_API}/article/`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function callApiPrivateRoute() {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.post(`${URL_API}/article`, {
        headers: { authorization: `Bearer ${token}` },
        data: {
          grant_type: "client_credentials",
          client_id: "gxlsQzApgtMwcI5P7Oi8PtqMUHvTsDEN",
          client_secret:
            "NXlfzqiWrJF95NkHHoyrzuFgijavS13BMtYfBS8mRErs6xFo72eNTs66y-K5p9fK",
          audience: "http://localhost:3001/",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function callApiPrivateScopedRoute() {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get(`${URL_API}/private-scoped`, {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>pagina de Home estando logeado</h1>
          <pre style={{ textAlign: "center" }}>
            {JSON.stringify(user, null, 2)}
          </pre>
          <LogoutButton btnText="Cerrar session" />
        </div>
      ) : (
        <div>
          <h1>pagina de Home sin logear</h1>
          <LoginButton btnText="Comencemos" loginWith="Popup" />
        </div>
      )}
      <div>
        {/* BOTON SOLO DE PRUEBA,SIN PERMISO NI DE AUTENTICACION */}
        <button onClick={callApiPublicRoute}>Call API public route</button>
        {/* BOTON QUE SERIA PARA CREAR UN POST, PERMISO DE ADMIN */}
        <button onClick={callApiPost}>Call API private route</button>
      </div>
    </div>
  );
};

export default Home;
