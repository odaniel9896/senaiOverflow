const { index } = require("./questions");
const Question = require("../models/Question");
const getShip = require("sequelize")




module.exports = {
    async index(req,res) {
        const idPage = req.query.idPage
            const page = (idPage -1) * 5

        try {
            const feed = await Question.findAll({
                
                attributes: ["id", "title", "description", "image", "gist", "created_at", "StudentId"],
                include: [
                    {
                        association: "Student",
                        attributes: ["id", "name", "image"],
                      
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
                limit: 5,
                offset: page                         
            });

   
            //const hisShip = await feed.getShip() 
            res.send(feed)
        } catch (error) {
            console.log(error)
            res.status(500).send(error);
        }
    }
}