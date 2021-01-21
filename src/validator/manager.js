const { celebrate, Segments, Joi } = require("celebrate");
const  BodyParser  =  require ('body-parser');


module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().email({minDomainSegments: 2, tlds:{allow: ['com', 'net']}}).min(8).max(255).required(),
        password: Joi.string().min(6).max(255).required(),
        ra: Joi.string().min(7).max(7).required(),
    }),
  }),
};