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
            res.send(student);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error })
        }
    }
}