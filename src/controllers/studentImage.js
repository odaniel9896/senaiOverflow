
const Student = require("../models/Student");

module.exports = {
    async index(req, res) {

    },
    async store(req, res) {
        const {firebaseUrl} = req.file;

        const {studentId} = req;


        if(!firebaseUrl)
            return res.status(404).send({ error: "Campo imagem é obrigatorio" });
        try {
            

             const student = await Student.findByPk(studentId);

             student.image = firebaseUrl;

             student.save();

            res.status(201).send({
                studentId,
                image: firebaseUrl,
            })

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}