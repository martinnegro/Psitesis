import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './components/AuthProvider';
import store from '../src/redux/store/store';

ReactDOM.render(
	<Provider store={store}>
		<AuthProvider>
			<React.StrictMode>
				<Router>
					<App />
				</Router>
			</React.StrictMode>
		</AuthProvider>
	</Provider>,
	document.getElementById('root')
);
