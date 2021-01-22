//IMPORT DE BIBLIOTECAS
const express = require("express");
const BodyParser = require('body-parser');
const { celebrate, Joi,  Segments } = require("celebrate");



const authMiddleware = require("./middleware/authorization")
const uploadQuestions = require("./middleware/uploadQuestions")


const studentController = require("./controllers/students");
const questionController = require("./controllers/questions");
const answerController = require("./controllers/answers");
const feedControler = require("./controllers/feed");
const sessionController = require("./controllers/sessions");

//VALIDACAO
const studentValidator = require("./validator/manager");
const postValidator = require("./validator/managerPost");
const answerValidator = require("./validator/managerAnswer");




const routes = express.Router();

//ROTAS PUBLICAS

//criar session
routes.post("/sessions", sessionController.store);
routes.get("/students", studentController.index);

//criar aluno
routes.post("/students", studentValidator.create, studentController.store);


//usa o authorization
//routes.use(authMiddleware)
routes.use(BodyParser.json());



//rotas de students

routes.get("/students/:id", studentController.find);

routes.delete("/students/:id", studentController.delete);
routes.put("/students/:id", studentController.update);

//rota do feed
routes.get("/feed", feedControler.index);
//routes.get("/questions/:id", questionControllezr.find);


routes.post("/questions", uploadQuestions, postValidator.create, questionController.store);
routes.delete("/questions/:id", questionController.delete);
routes.put("/questions/:id", questionController.update);

routes.post("/questions/:id/answer", answerValidator.create, answerController.store);

module.exports = routes;


