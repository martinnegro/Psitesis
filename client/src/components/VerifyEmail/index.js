import React from "react";
import { sendVerificationEmail } from "../../utils/auth";
import { useAuth0 } from "@auth0/auth0-react";
export default function VerifyEmail() {
  const { user, getAccessTokenSilently } = useAuth0();
  function handleClick(e) {
    e.preventDefault();
    sendVerificationEmail(user);
  }

  return (
    <div>
      <h2>
        Por favor verifique el link verificacion que fue enviado a su direccion
      </h2>
      <button onClick={handleClick}>Re send verification Email</button>
    </div>
  );
}
