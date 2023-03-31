// ✅ Implement the Apollo Server and apply it to the Express server as middleware.
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");

const express = require("express");
const path = require("path");
const db = require("./config/connection");
// ❄️ routes are no longer needed
// const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

// ❄️ Create a new Apollo server and pass in the schema data.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// ❄️ commented out below
// server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// ❄️ use Apollo Server instead of the Express routes
// app.use(routes);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once("open", () => {
    app.listen(PORT, () =>
      console.log(`🌍 Now listening on localhost:${PORT}`)
    );
    // ❄️ log the Apollo Server URL
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startApolloServer(typeDefs, resolvers);