const { index } = require("./questions");
const Question = require("../models/Question");
const getShip = require("sequelize")




module.exports = {
    async index(req,res) {
        try {
            const feed = await Question.findAll({
               
                attributes: ["id", "title", "description", "image", "gist", "created_at"],
                //group: ['Question.id'],
                include: [
                    {
                        association: "Student",
                        attributes: ["id", "name", "image"],
                      
                    },
                    {
                        association: "Answers",
                        separate:true,
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
                    //[Sequelize.fn('GROUP_CONCAT', Sequelize.col('categories.description')), 'description']]
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