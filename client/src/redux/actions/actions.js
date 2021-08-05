import axios from "axios";
const URL_API = "http://localhost:3001";

/* export async function callApiPost() {
  return function () {
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
      console.log(user.sub);
    } catch (error) {
      console.log(error.message);
    }
  };
} */
