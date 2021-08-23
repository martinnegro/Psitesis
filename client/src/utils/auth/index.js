import axios from "axios";
const { REACT_APP_URL_API } = process.env;

export function sendVerificationEmail(user) {
  const userRequesting = {
    user_id: user.sub,
  };
  axios
    .post(`${REACT_APP_URL_API}/users/verifyemail`, userRequesting)
    .then((response) => response)
    .catch((err) => console.log(err));
}

export const postComment = async (obj) => {
  try {
    const response = await axios.post(
      `${REACT_APP_URL_API}/forum_comments`,
      obj
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editComment = async (id, obj) => {
  try {
    const response = await axios.put(
      `${REACT_APP_URL_API}/forum_comments/edit/${id}`,
      obj
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//DELETE COMMENT VERSION CAMBIAR CONTENIDO A MENSAJE ELIMINADO

export const deleteComment = async (id) => {
  try {
    const response = await axios.put(
      `${REACT_APP_URL_API}/forum_comments/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
// Una función que recibe un timestamp en formato string y devuelve la fecha y la hora en formato string
export const getDateTime = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let hour = date.getHours();
  let min = date.getMinutes();
  if (min < 10) min = "0" + min;
  if (hour < 10) hour = "0" + hour;
  const dateTime = `${day}-${month}-${year} ${hour}:${min}`;
  return dateTime;
};
