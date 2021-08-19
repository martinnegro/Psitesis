require('dotenv').config();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');

const {
	JWKSURI,
	AUDIENCE,
	AUTH_CLIENT_DOMAIN,
	AUTH_CLIENT_ID,
	AUTH_CLIENT_SECRET,
} = process.env;

const authorizeAccessToken = jwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://${JWKSURI}/.well-known/jwks.json`,
	}),
	audience: AUDIENCE,
	issuer: `https://${JWKSURI}/`,
	algorithms: ['RS256'],
});

const checkSuperAdminPermission = jwtAuthz(['superadmin:all'], {
	customScopeKey: 'permissions',
	checkAllScopes: true,
});
const checkAdminPermission = jwtAuthz(['admin:all'], {
	customScopeKey: 'permissions',
	checkAllScopes: true,
});
const checkCollaboratorPermission = jwtAuthz(['collaborator:all'], {
	customScopeKey: 'permissions',
	checkAllScopes: true,
});
const checkBasicPermission = jwtAuthz(['basic:all'], {
	customScopeKey: 'permissions',
	checkAllScopes: true,
});

const ManagementClient = require('auth0').ManagementClient;
const management = new ManagementClient({
	domain: AUTH_CLIENT_DOMAIN,
	clientId: AUTH_CLIENT_ID,
	clientSecret: AUTH_CLIENT_SECRET,
});

module.exports = {
	authorizeAccessToken,
	checkSuperAdminPermission,
	checkAdminPermission,
	checkCollaboratorPermission,
	checkBasicPermission,
	management,
};
