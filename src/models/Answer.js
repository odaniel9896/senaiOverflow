const {Model, DataTypes} = require("sequelize");
 
class Answer extends Model
{
    // AQUI INICIALIZAMOS NOSSOS CAMPOS DA TABELA
    static init(sequelize)
    {
        super.init
        (
            {
                description: DataTypes.STRING,
                student_id: DataTypes.INTEGER
            },
 
            {
                sequelize,
                tablename: "answer"
            }
        )
    }
    // AQUI CONFIGURAMOS OS RELACIONAMENTOS
    static associate(models)
    {
        this.belongsTo(models.Student)
        this.belongsTo(models.Question) 
    }
}
 
module.exports = Answer;