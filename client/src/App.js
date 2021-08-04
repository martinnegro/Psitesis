<<<<<<< HEAD
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Switch } from "react-router-dom";
import { Loading, ProtectedRoute } from "./components";
import Login from "./views/Login";
import ExamplePage from "./views/ExamplePage";
=======
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Switch } from 'react-router-dom';
import { Loading } from './components';
import  Login  from './components/Login/index'
import  Home  from './views/Home/Home.jsx'
import  Post from './views/Post/Post.jsx'
>>>>>>> main

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="App">
        <Loading />
      </div>
    );
  }

<<<<<<< HEAD
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Login} />
        <ProtectedRoute path="/example" exact component={ExamplePage} />
      </Switch>
    </div>
  );
=======
	return (
		<div className="App">
			<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/home" exact component={Home} />
				<Route path="/post" exact component={Post} />
			</Switch>
		</div>
	);
>>>>>>> main
};

export default App;

