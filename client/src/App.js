import { useAuth0 } from '@auth0/auth0-react';
import { Route, Switch } from 'react-router-dom';
import { Loading } from './components';
import  Login  from './components/Login/index'
import  Home  from './views/Home/Home.jsx'
import  Post from './views/Post/Post.jsx'

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
				<Route path="/home" exact component={Home} />
				<Route path="/post" exact component={Post} />
			</Switch>
		</div>
	);
};

export default App;

