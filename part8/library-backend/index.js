const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const http = require("http");
// const DataLoader = require("dataloader");
// const { execute, subscribe } = require("graphql");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

const config = require("./utils/config");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
// const Author = require("./models/Author");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

console.log("connecting to ", config.MONGOOSE_URI);

mongoose
  .connect(config.MONGOOSE_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB: ", error.message);
  });

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });
  const serverCleanup = useServer({ schema }, wsServer);

  //
  // const allTheAuthors = async (keys) => {
  //   const authors = await Author.find({
  //     _id: {
  //       $in: keys,
  //     },
  //   });
  // .findAll({
  //   where: {
  //     author: {
  //       name: {
  //         $in: keys,
  //       },
  //     },
  //   },
  // });

  //   return keys.map(
  //     (key) =>
  //       authors.find((author) => author.id === key) ||
  //       new Error(`No result for ${key}`)
  //   );
  // };
  //

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(
          auth.substring(7),
          process.env.JWT_SECRET
        );
        const currentUser = await User.findById({
          // findOne
          _id: decodedToken.id,
        }); // .populate("favoriteGenre");
        // console.log("context user ", currentUser);
        return {
          currentUser,
          // loaders: {
          //   author: new DataLoader((keys) => allTheAuthors(keys)),
          // },
        };
      }
      // return {
      //   loaders: {
      //     author: new DataLoader((keys) => allTheAuthors(keys)),
      //   },
      // };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: "/",
  });

  const PORT = process.env.PORT; // 4000;

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  );
};

start();
