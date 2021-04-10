const connect = require("./configs/db");
const { app, server } = require("./index");

const start = async () => {
  await connect();

  server.applyMiddleware({ app });

  await new Promise((resolve, reject) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

  app.listen(2244, () => {
    console.log("Listening on port 2244");
  });
};

start();
