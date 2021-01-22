const Multer = require("multer");

const admin = require("firebase-admin");

var account = require("../config/firebasekey.json")

const BUCKET = "gs://senaioverflow.appspot.com"

admin.initializeApp({
credential: admin.credential.cert(account),
storageBucket: BUCKET})

const bucket = admin.storage().bucket();

const uploadQuestions = (req,res,next) => {
    if (!req.file)
        return next();

    const image = req.file;

    const filename = Date.now() + "." + image.originalname.split(".").pop();

    const file = bucket.file(filename)

    const stream = file.createWriteStream ({
        metadata: {
            contentType: image.mimetype,
        }
    });

    stream.on("error", (e) => {
        console.log(e)
    })

    stream.on("finish", async() => {
        await file.makePublic();
        req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${filename}`;

        next();
    });

    stream.end(image.buffer)

}



module.exports = uploadQuestions;