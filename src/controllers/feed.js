const { index } = require("./questions");
const Question = require("../models/Question");


module.exports = {
    async index(req,res) {
        try {
            const feed = await Question.findAll({
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
                        unique: true,
                        through: {attributes: []}
                    },
                    
                    ],
                order: [["created_at", "DESC"]],
                offset: 5, limit: 5,
                subQuery: false
            });

            //const hisShip = await feed.getShip()

            res.send(hisShip)
        } catch (error) {
            console.log(error)
            res.status(500).send(error);
        }
    }
}