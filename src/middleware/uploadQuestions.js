const Multer = require("multer")

const uploadQuestions = Multer({
    //STORAGE SERA O LOCAL DE ARMAZENAMENTO DO STORAGE 
    storage: Multer.diskStorage({
        //DESTINATION FICARA GUARDADA AS IMAGENS 
        destination: "uploads/",
        filename: (req, file, callback) => {
            //POP SEMPRE PEGA A ULTIMA POSITION DE UM VETOR
            const filename = Date.now() + "." + file.originalname.split(".").pop();

            return callback(null, filename)
        }
    }),
    fileFilter: (req, file, callback) => {
        //TIPOS DE IMAGENS PERMITIDOS
        let allowedTypes = ["image/png", "image/jpg"];

        //verifica o type da imagem recebido
        if(allowedTypes.includes(file.mimetype)) {
            callback(null, true)
        }
        else {
            callback(new Error("Tipo de arquivo invalido "))
        }
    },
    limits : {
        fileSize: 1024 * 1024 * 5
    }
});

module.exports = uploadQuestions.single("image");