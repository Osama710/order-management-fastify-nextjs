const fastify = require("fastify")()
const allRoutes = require("./routes/route")
const database = require("./database/index")
allRoutes(fastify)

const startServer = async () => {
  try {
    // await database.sync({ force: false, alter: true });
    await database.sync();
    await fastify.listen({ port: 3002 }, (err, port) => {
      if (err) return err
      console.log(`server is running on ${port}`);
    })
  } catch (err) {
    console.log(err);
    proccess.exit(1)
  }
}

startServer()