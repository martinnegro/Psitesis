import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ExamplePage = () => {
	const { user } = useAuth0();
	return (
		<div>
			<div>
				<h1>Example Page</h1>
				<pre style={{ textAlign: 'center' }}>
					{JSON.stringify(user, null, 2)}
				</pre>
			</div>
		</div>
	);
};

export default ExamplePage;
