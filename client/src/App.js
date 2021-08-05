import { useAuth0 } from "@auth0/auth0-react";
import { Route, Switch } from "react-router-dom";
import { Loading } from "./components";
import Login from "./components/Login/index";
import Art_Detail from "./views/Art_Detail/Art_Detail";
import Home from "./views/Home/Home.jsx";
import Post from "./views/Post/Post.jsx";
import { ProtectedRoute } from "./components";

const App = () => {
  const { isLoading } = useAuth0();

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
        <Route path="/" exact component={Login} />
        <ProtectedRoute path="/home" exact component={Home} />
        <ProtectedRoute path="/post" exact component={Post} />
        <ProtectedRoute path="/post/:id" exact component={Art_Detail} />
      </Switch>
    </div>
  );
};

export default App;
