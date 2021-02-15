const { index } = require("./questions");
const Question = require("../models/Question");
const getShip = require("sequelize")




module.exports = {
    async index(req,res) {
            const limitId = 5
            const page = 1
        try {
            const feed = await Question.findAndCountAll({
                //offset: page, limit: limitId,
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

   
            //const hisShip = await feed.getShip() 
            res.send(feed)
        } catch (error) {
            console.log(error)
            res.status(500).send(error);
        }
    }
}