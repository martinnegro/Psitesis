const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const jwtAuthz = require("express-jwt-authz");
require("dotenv").config();
const { JWKSURI, AUDIENCE, ISSUER, ALGORITHMS } = process.env;
const authorizeAccessToken = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${JWKSURI}/.well-known/jwks.json`,
  }),
  audience: AUDIENCE,
  issuer: `https://${JWKSURI}/`,
  algorithms: ["RS256"],
});

const checkAdminPermission = jwtAuthz(["read:messages"], {
  customScopeKey: "permissions",
  checkAllScopes: true,
});

module.exports = { authorizeAccessToken, checkAdminPermission };
