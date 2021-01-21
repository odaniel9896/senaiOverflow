const {Model, DataTypes} = require("sequelize");
 
class Question extends Model
{
    // AQUI INICIALIZAMOS NOSSOS CAMPOS DA TABELA
    static init(sequelize)
    {
        super.init
        (
            {
                title: DataTypes.STRING,
                description:DataTypes.STRING,
                image:DataTypes.STRING,
                gist:DataTypes.STRING
            },
 
            {    
                sequelize,              
            }
        )
    }
    // AQUI CONFIGURAMOS OS RELACIONAMENTOS
    static associate(models)
    {
        this.belongsTo(models.Student);
        this.hasMany(models.Answer)
        this.belongsToMany(models.Category, {through: "question_categories"});
    }
}
 
module.exports = Question;