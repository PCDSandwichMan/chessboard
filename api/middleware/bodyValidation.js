const joi = require("@hapi/joi");

module.exports = {
  validateBody: (schema) => {
    return async (req, res, next) => {
      const result = await schema.validate(req.body);
      if (result.error) {
        return res
          .status(400)
          .json({ error: result.error.toString().substring(7) });
      }

      if (!req.value) req.value = {};
      req.value["body"] = result.value;
      next();
    };
  },

  schemas: {
      // todo matt: add validation
  },
};
