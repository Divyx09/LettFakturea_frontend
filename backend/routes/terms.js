const termsController = async (fastify, options) => {
  fastify.get("/terms", async (request, reply) => {
    const { language } = request.query;

    if (!language) {
      return reply.status(400).send({ error: "Language query is required" });
    }

    try {
      const result = await fastify.db.models.term.findAll({
        where: { language },
      });

      if (result.length === 0) {
        return reply.status(404).send({ error: "No terms found for this language" });
      }

      return reply.send(result);
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: "Database query failed" });
    }
  });
};

module.exports = termsController;
