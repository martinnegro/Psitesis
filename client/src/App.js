import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import User_Detail from "./views/User_Detail/User_Detail";
import Art_Detail from "./views/Art_Detail/Art_Detail";
import Home from "./views/Home/Home.jsx";
import Admin_Panel from "./views/Admin_Panel/Admin_Panel";
import Post from "./views/Post/Post.jsx";
import Colaborators from "./views/Colaborators/Colaborators";
import Library from "./views/UploadFile/UploadFile.jsx";
import InstitutionBio from "./components/InstitutionBio/InstitutionBio";
import ProtectedRoute from "./components/ProtectedRoute";
import GuiaDeTesis from "./views/Guia de Tesis/GuiaDeTesis";
import Forum from "./views/Forum/Forum";
import Forum_Post from "./views/Forum_Post/Forum_Post";
import GetForumSubTopic from "./views/GetForumSubtopic/GetForumSubtopic";
import CreatePostForum from "./views/CreatePostForum/CreatePostForum";
import Notifications from "./views/Notifications";
import { userHasPermission } from "./utils/roles";
import { useSelector } from "react-redux";
const App = () => {
  const user = useSelector((state) => state.authReducer.user);
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Landing} />
        {userHasPermission(
          user?.roles[0],
          ["superadmin", "admin", "collaborator"],
          true,
          false
        ) ? (
          <ProtectedRoute path="/post" exact component={Post} />
        ) : null}
        {userHasPermission(user?.roles[0], [
          "superadmin",
          "admin",
          "collaborator",
        ]) ? (
          <ProtectedRoute path="/postEdit/:id" exact component={Post} />
        ) : null}
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
        <ProtectedRoute path="/notifications" exact component={Notifications} />
        {userHasPermission(
          user?.roles[0],
          ["superadmin", "admin"],
          true,
          false
        ) ? (
          <ProtectedRoute path="/adminpanel" exact component={Admin_Panel} />
        ) : null}
        <ProtectedRoute path="/library" exact component={Library} />
        <ProtectedRoute path="/home" exact component={Home} />
        <ProtectedRoute path="/guiadetesis" exact component={GuiaDeTesis} />
        <ProtectedRoute path="/forum" exact component={Forum} />
        <ProtectedRoute
          path="/forum/crearpost"
          exact
          component={CreatePostForum}
        />
        <ProtectedRoute
          path="/forum/subtopic/:sub_topic_id"
          exact
          component={GetForumSubTopic}
        />
        <ProtectedRoute
          path="/forum/post/:post_id"
          exact
          component={Forum_Post}
        />
        <ProtectedRoute>
          <Route exact path="/colaborators" component={Colaborators}></Route>
        </ProtectedRoute>
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default App;
