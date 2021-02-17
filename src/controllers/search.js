const Sequelize = require("sequelize")
const Question = require("../models/Question");
const Op = Sequelize.Op

module.exports = {
    async find(req,res) {    
        const keyWord = req.query.keyWord   
        try {
                const student = await Question.findAll({
                    where:
                        { 
                            [Op.or] : [ 
                                {
                                    title : {
                                        [Op.substring]: keyWord
                                    }
                                },            
                                { 
                                    description: {
                                        [Op.substring]: keyWord
                                    }  
                                }
                            ,                 
                            ]
                        },
                attributes: ["id", "title", "description", "image", "gist", "created_at"],
                include: [
                    {
                        association: "Student",
                        attributes: ["id", "name", "image"]
                    },
                    {
                        association: "Answers",
                        attributes: ["id", "description", "created_at"],
                        include : {
                            association: "Student",
                            attributes: ["id", "name", "image"]
                        }
                    },
                    {
                        association: "Categories",
                        attributes: ["id", "description"],
                        through: {attributes: []}
                    },
                    
                    ],
                order: [["created_at", "DESC"]],                
                subQuery: false  
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