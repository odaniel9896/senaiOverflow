//IMPORT DE BIBLIOTECAS
const express = require("express");
const BodyParser = require('body-parser');
const { celebrate, Joi,  Segments } = require("celebrate");
const Multer = require("multer")

const multer = Multer()

const authMiddleware = require("./middleware/authorization")
const uploadQuestions = require("./services/uploadQuestions")


const studentController = require("./controllers/students");
const questionController = require("./controllers/questions");
const answerController = require("./controllers/answers");
const feedControler = require("./controllers/feed");
const sessionController = require("./controllers/sessions");
const studentImageController = require("./controllers/studentImage");

//VALIDACAO
const studentValidator = require("./validator/manager");
const postValidator = require("./validator/managerPost");
const answerValidator = require("./validator/managerAnswer");
const categoriesControler = require("./controllers/categories")




const routes = express.Router();

//ROTAS PUBLICAS

//criar session
routes.post("/sessions", sessionController.store);
routes.get("/students", studentController.index);
routes.get("/categories", categoriesControler.index);

//criar aluno
routes.post("/students", studentValidator.create, studentController.store);



//usa o authorization
routes.use(authMiddleware)
routes.use(BodyParser.json());



//rotas de students

routes.get("/students/:id", studentController.find);
routes.post("/students/:id/images", multer.single("image"), uploadQuestions, studentImageController.store);
routes.delete("/students/:id", studentController.delete);
routes.put("/students/:id", studentController.update);

//rota do feed
routes.get("/feed", feedControler.index);
//routes.get("/questions/:id", questionControllezr.find);

routes.post("/questions", multer.single("image"), uploadQuestions, postValidator.create, questionController.store);
routes.delete("/questions/:id", questionController.delete);
routes.put("/questions/:id", questionController.update);

routes.post("/questions/:id/answer", answerValidator.create, answerController.store);

module.exports = routes;


