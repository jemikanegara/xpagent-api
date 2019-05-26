const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./type/type");
const resolvers = require("./resolver/resolver");

// JWT
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

// Get User
const getUser = async token => {
  const tokenCheck = await jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.log(err);
      return null;
    } else {
      return decoded;
    }
  });
  return tokenCheck;
};

// Auth
const authCheck = (auth, receivedToken) => {
  // try to retrieve a user with the token
  if (auth) {
    return getUser(receivedToken);
  } else {
    return null;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // get the user token from the headers
    const auth = req.headers.authorization;
    const receivedToken = auth.split(" ")[1];
    // check auth
    const decoded = authCheck(auth, receivedToken);
    // get image file
    const image = req.body.image;
    return { decoded, receivedToken, image };
  }
});

module.exports = server;
