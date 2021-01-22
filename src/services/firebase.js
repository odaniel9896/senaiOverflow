
module.exports = () => {
    var admin = require("firebase-admin");

var serviceAccount = require("../config/firebasekey.json");
const BUCKET = "gs://senaioverflow.appspot.com"

admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
storageBucket: BUCKET})

const bucket = admin.storage().bucket();

}