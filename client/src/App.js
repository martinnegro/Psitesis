import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Loading } from "./components";
import VerifyEmail from "./components/VerifyEmail";
import Landing from "./components/Landing/Landing";
import User_Detail from "./views/User_Detail/User_Detail";
import Art_Detail from "./views/Art_Detail/Art_Detail";
import Home from "./views/Home/Home.jsx";
import Admin_Panel from "./views/Admin_Panel/Admin_Panel";
import Post from "./views/Post/Post.jsx";
import Colaborators from "./views/Colaborators/Colaborators";
import PostOk from "./views/postOk/PostOk.jsx";
import InstitutionBio from "./components/InstitutionBio/InstitutionBio";
import { ProtectedRoute } from "./components";
import { findOrCreateUser as findOrCreateUserAction } from "./redux/actions/usersActions";
import { useDispatch } from "react-redux";
import GuiaDeTesis from "./views/Guia de Tesis/GuiaDeTesis";
import Forum from "./views/Forum/Forum";
import GetForumSubTopic from "./views/GetForumSubtopic/GetForumSubtopic";

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
        <ProtectedRoute
          path="/user/:user_id_A0"
          exact
          component={User_Detail}
        />
        <ProtectedRoute
          path="/institution/:id"
          exact
          component={InstitutionBio}
        />
        <ProtectedRoute path="/adminpanel" exact component={Admin_Panel} />

        <ProtectedRoute path="/post_exitoso/:accion" exact component={PostOk} />
        <ProtectedRoute path="/home" exact component={Home} />
        <ProtectedRoute path="/guiadetesis" exact component={GuiaDeTesis} />
        <ProtectedRoute path="/forum" exact component={Forum} />
        <ProtectedRoute path="/forum/subtopic/:id" exact component={GetForumSubTopic}/>
        <ProtectedRoute>
          <Route exact path="/colaborators" component={Colaborators}></Route>
        </ProtectedRoute>
        <Route path="*" render={() => <Redirect to="/" />} />
        
         
        
      </Switch>
    </div>
  );
};

export default App;
