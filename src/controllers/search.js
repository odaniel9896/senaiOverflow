const Sequelize = require("sequelize")
const Question = require("../models/Question");
const Op = Sequelize.Op

module.exports = {
    async store (req,res) {

        const {search} = req.body;
        const {stundentId} = req;        
        try {
                const student = await Question.findAll({
                    where:
                        { 
                            [Op.or] : [ 
                                {
                                    title : {
                                        [Op.substring]: search
                                    }
                                },            
                                {
                                    description: {
                                        [Op.substring]: search
                                    }  
                                }
                            ,                 
                            ]
                        }  
                });

        if(student.length === 0)
                return res.status(404).send({ error: "Nenhuma pesquisa foi encontrada" });

            res.send(student);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error })
        }
    }
}