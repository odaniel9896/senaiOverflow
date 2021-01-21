const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

//imports dos models
const Student = require("../models/Student");
const Question = require("../models/Question");
const Answer = require("../models/Answer")

const Category = require("../models/Category");


const connection = new Sequelize(dbConfig);

//inicializa os models
Student.init(connection);
Answer.init(connection);
Question.init(connection);
Category.init(connection);


//inicializa os relacionamentos
Student.associate(connection.models);
Question.associate(connection.models);
Category.associate(connection.models);
Answer.associate(connection.models);

// for (let assoc of Object.keys(Question.associations)) {
//     for (let accessor of Object.keys(Question.associations[assoc].accessors)) {
//         console.log(Question.name + '.' + Question.associations[assoc].accessors[accessor] + '()');
//     }
// }