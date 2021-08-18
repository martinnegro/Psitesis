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
