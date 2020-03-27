const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const OngController = require("./controllers/OngController");
const SessionController = require("./controllers/SessionController");
const IncidentController = require("./controllers/IncidentController");
const OngIncidentsController = require("./controllers/OngIncidentsController");

const routes = express.Router();

routes.post("/session", SessionController.create);

routes.get("/ongs", OngController.index);
routes.post(
  "/ongs",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.number()
        .required()
        .min(9999999999)
        .max(99999999999999),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2)
    })
  }),
  OngController.create
);

routes.get(
  "/ongs/:ong_id/incidents",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      ong_id: Joi.string()
        .required()
        .length(8)
    })
  }),
  OngIncidentsController.index
);

routes.get(
  "/incident",
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  }),
  IncidentController.index
);
routes.post("/incident", IncidentController.create);
routes.delete(
  "/incident/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  }),
  IncidentController.delete
);

module.exports = routes;
