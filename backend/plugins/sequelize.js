const fp = require("fastify-plugin");
const { Sequelize, DataTypes } = require("sequelize");

module.exports = fp(async (fastify, opts) => {
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: console.log,
  });

  try {
    await sequelize.authenticate();
    fastify.log.info("Database connected");
  } catch (err) {
    fastify.log.error("Database connection failed:", err);
    throw err;
  }

  // Define model
  const Term = require("../models/term")(sequelize, DataTypes);

  await sequelize.sync();

  // Attach db + models to fastify
  fastify.decorate("db", {
    sequelize,
    models: {
      term: Term,
    },
  });
});
