import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Switch } from "react-router-dom";
import { Loading, ProtectedRoute } from "./components";
import Login from "./views/Login";

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
        {/* <ProtectedRoute path="/example" exact component={ExamplePage} /> */}
      </Switch>
    </div>
  );
};

export default App;
