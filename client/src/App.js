import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Loading } from "./components";
import VerifyEmail from "./components/VerifyEmail";
import Landing from "./components/Landing/Landing";
import Art_Detail from "./views/Art_Detail/Art_Detail";
import Home from "./views/Home/Home.jsx";
import Post from "./views/Post/Post.jsx";
import PostOk from "./views/postOk/PostOk.jsx";
import { ProtectedRoute } from "./components";
import { findOrCreateUser as findOrCreateUserAction } from "./redux/actions/actions";
import { useDispatch } from "react-redux";
import User_Detail from "./views/User_Detail/User_Detail";

const App = () => {
  const { isLoading, user, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    const findOrCreateUser = async () => {
      const token = await getAccessTokenSilently();
      dispatch(findOrCreateUserAction(user, token));
    };
    if (user) findOrCreateUser();
  });

  if (isLoading) {
    return (
      <div className="App">
        <Loading />
      </div>
    );
  }

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Landing} />
        <ProtectedRoute path="/post" exact component={Post} />
        <ProtectedRoute path="/postEdit/:id" exact component={Post} />
        <ProtectedRoute path="/post/:id" exact component={Art_Detail} />
        <ProtectedRoute path="/post_exitoso/:accion" exact component={PostOk} />
        <ProtectedRoute path="/home" exact component={Home} />
        <ProtectedRoute path='/user/:user_id_A0' exact component={User_Detail} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default App;
