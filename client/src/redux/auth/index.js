import auth0 from 'auth0-js';

const {
	REACT_APP_AUTH0_DOMAIN,
	REACT_APP_AUTH0_CLIENT_ID,
	REACT_APP_AUTH0_AUDIENCE,
} = process.env;

const databaseConnection = 'Username-Password-Authentication';

const params = 
	{
		overrides: {
			__tenant: 'dev-n9f5i3tg',
			__token_issuer: 'https://dev-n9f5i3tg.us.auth0.com/',
		},
		domain: REACT_APP_AUTH0_DOMAIN,
		clientID: REACT_APP_AUTH0_CLIENT_ID,
		redirectUri: 'http://localhost:3000',
		responseType: 'token',
		audience: REACT_APP_AUTH0_AUDIENCE,
		scope: 'openid profile email',
        protocol: 'oauth2',
		response_type: 'token',
		response_mode: 'query',
        code_challenge_method: 'S256',
        		//nonce: 'Qm5PY2p4TWdXMUFLb3ZpLmI1Z2tHRVM4eU1WNUY3NHIxSzc1TnlxT3ZYSA==',
		//code_challenge: 'CcS1AfIu3SL1qADOsTrUMk_ksoKYhmgJrITkyI3JOxo',
		
		//auth0Client: 'eyJuYW1lIjoiYXV0aDAtcmVhY3QiLCJ2ZXJzaW9uIjoiMS42LjAifQ==',
		//_csrf: 'SrPrCUbZ-lY7ySwI0hjZfDhAcY-lSTdN0C0k',
	}

export const ReactAuth0 = new auth0.WebAuth(params);

export const login = (email, password) => {
	ReactAuth0.login(
		{
			realm: databaseConnection,
			email: email,
			password: password,
			//captcha: captcha.getValue(),
		},
		(error) => {
			console.log(error);
			//if (err) displayError(err);
			//button.disabled = false;
		}
	);
};

export const loginWithGoogle = () => {
	ReactAuth0.authorize(
		{
			connection: 'google-oauth2',
            redirectUri: 'http://localhost:3000/',
		},
		(error) => {
			console.log(error);
		}
	);
};
