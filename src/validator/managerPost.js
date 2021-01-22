const { celebrate, Segments, Joi } = require("celebrate");
const  BodyParser  =  require ('body-parser');

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().max(255).min(5).required(),
        description : Joi.string().max(255).min(10).required(),
        gist : Joi.string().max(255).min(20),
        categories: Joi.string().min(1).max(100),
    }),
  }),
};