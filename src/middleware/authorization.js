const jwt = require("jsonwebtoken");
const auth = require("../config/auth.json");
 
module.exports = (req, res, next) => {
    //Pegabndo o campo autorização do cabeçalho da requisição 
    const { authorization } = req.headers;
 
    //Verifica se  o campo foi informado, se não, retorna erro
    if(!authorization)
        return res.status(401).send({error: "Token não informado"});
 
    //Separa o prefixo do Token
    const [Bearer, token] = authorization.split(" ");
 
    //Verifica se o Token esta presente, se não, retorna erro
    if(!token)
        res.status(401).send({error: "Token mal formatado"});
 
    try {
        
        //Verifica se o Token é valido, se não, cai no catch
        const payload = jwt.verify(token, auth.secret);
 
        //Coloca o id do aluno na requisição
        req.studentId = payload.studentId;
 
        //Envia a requisição para frente (controller)
        return next();
 
    } catch (error) {
        //Retorna o erro de Token invalido
        console.log(error);
        res.status(401).send({error: "Token inválido"});
    }   
}