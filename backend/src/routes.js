const express = require("express");

const OngController = require("./controllers/OngController");
const SessionController = require("./controllers/SessionController");
const IncidentController = require("./controllers/IncidentController");
const OngIncidentsController = require("./controllers/OngIncidentsController");

const routes = express.Router();

routes.post("/session", SessionController.create);

routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.create);

routes.get("/ongs/:ong_id/incidents", OngIncidentsController.index);

routes.get("/incident", IncidentController.index);
routes.post("/incident", IncidentController.create);
routes.delete("/incident/:id", IncidentController.delete);

module.exports = routes;
