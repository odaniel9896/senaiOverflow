const Question = require("../models/Question");
const Student = require("../models/Student");
const Answer = require("../models/Answer");

module.exports = {
    index(req, res){

    },
    async store(req, res){
        const {description} = req.body;
        const questionId = req.params.id;
        const {studentId} = req;    


        try {
            let question = await Question.findByPk(questionId)
               
            if(!question)
                return res.status(404).send({ error: "Pergunta não encontrada" });
            // ADICIONA UMA RESMOSTA PARA ESSA DESCRICAO E ESSE ALUNO
            const asnwer =   await question.createAnswer({description, student_id: studentId})

            res.status(201).send(asnwer);

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    },
    find(req, res){

    },
    delete(req, res) {

    },
    update(req, res) {

    }
}