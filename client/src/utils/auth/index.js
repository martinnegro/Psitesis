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
