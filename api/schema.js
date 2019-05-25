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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // get the user token from the headers
    const auth = req.headers.authorization;

    // try to retrieve a user with the token
    if (auth) {
      const receivedToken = auth.split(" ")[1];
      const decoded = getUser(receivedToken);
      // add the user to the context
      return { decoded, receivedToken };
    }
  }
});

module.exports = server;
