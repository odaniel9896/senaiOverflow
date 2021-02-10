const Question = require("../models/Question");
const Student = require("../models/Student");
const Category = require("../models/Category")



//require("fs") biblioteca para excluir arquivos
module.exports = {
    async index(req, res) {
        
    },

    async store(req, res) {
        const { title, description, image, gist, categories } = req.body;
     
        const { studentId } = req;
     
        const categoriesArr = categories.split(",");
     
        try {
          // BUSCA O ALUNO PELO ID
     
          let student = await Student.findByPk(studentId);
     
          // SE O ALUNO NÃO EXISTIR RETORNA ERRO
     
          if (!student)
            return res.status(404).send({ error: "Aluno não encontrado" });
     
          // CRIO A PERGUNTA PARA O ALUNO
          let question = await student.createQuestion({
            title,
            description,
            image: req.file ? req.file.firebaseUrl : null,
            gist,
          });
     
          await question.addCategories(categoriesArr);
     
          // RETORNO DE SUCESSO
     
          res.status(201).send({
            id: question.id,
            title: question.title,
            description: question.description,
            createdAt: question.created_at,
            gist: question.gist,
            image: req.file ? req.file.firebaseUrl : null,
          });
        } catch (error) {
          console.log(error);
          res.status(500).send(error);
        }
      },

    find(req, res) {

    },

    async update(req, res) {
        const questionId = req.params.id;

        const {title, description} = req.body;

        const {studentId} = req;    


        try {
            const question = await Question.findByPk(questionId);

            if (!question)
                return res.status(404).send({ error: "Questão não encontrada" });

            if(question.StudentId != studentId)
                return res.status(401).send({error: "Não autorizado"})

            question.title = title;
            question.description = description;

            question.save();

            res.status(204).send();

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },

    async delete(req, res) {
        const questionId = req.params.id;

        const {studentId} = req;    


        try {
            const question = await Question.findOne({
                where: {
                    id: questionId,
                    student_id: studentId
                }
            });

            if (!question)
                 res.status(404).send({ error: "Questão não encontrada" });

            await question.destroy();

            res.status(204).send();

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

}