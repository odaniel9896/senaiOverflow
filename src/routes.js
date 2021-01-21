//IMPORT DE BIBLIOTECAS
const express = require("express");
const BodyParser = require('body-parser');
const { celebrate, Joi, errors, Segments } = require("celebrate");
const Multer = require("multer")


const authMiddleware = require("./middleware/authorization")
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
//multer vai ser a biblioteca que vai ajudar para fazer o upload de images
const multer = Multer({
    //STORAGE SERA O LOCAL DE ARMAZENAMENTO DO STORAGE 
    storage: Multer.diskStorage({
        //DESTINATION FICARA GUARDADA AS IMAGENS 
        destination: "uploads/",
        filename: (req, file, callback) => {
            //POP SEMPRE PEGA A ULTIMA POSITION DE UM VETOR
            const filename = Date.now() + "." + file.originalname.split(".").pop();

            return callback(null, filename)
        }
    })
});

routes.post("/upload", multer.single("file"), (req, res) => {
    console.log(req.file);

    res.send(req.file)
    
})


//ROTAS PUBLICAS

//criar session
routes.post("/sessions", sessionController.store);
routes.get("/students", studentController.index);

//criar aluno
routes.post("/students", studentValidator.create, studentController.store);


//usa o authorization
routes.use(authMiddleware)
routes.use(BodyParser.json());



//rotas de students

routes.get("/students/:id", studentController.find);

routes.delete("/students/:id", studentController.delete);
routes.put("/students/:id", studentController.update);

//rota do feed
routes.get("/feed", feedControler.index);
//routes.get("/questions/:id", questionControllezr.find);


routes.post("/questions", postValidator.create, questionController.store);
routes.delete("/questions/:id", questionController.delete);
routes.put("/questions/:id", questionController.update);

routes.post("/questions/:id/answer", answerValidator.create, answerController.store);

//USE DE ERROS DA VALIDACAO
routes.use(errors())
module.exports = routes;


