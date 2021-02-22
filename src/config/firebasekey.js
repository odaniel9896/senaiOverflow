module.exports= {
  "type": "service_account",
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": "0319a0c73fecabf41afdef21cfb7e6a73ec2bd04",
  "private_key": process.env.FIREBASE_PROJECT_KEY.replace(/\\n/g, "\n"),
  "client_email": process.env.FIREBASE_PROJECT_EMAIL,
  "client_id": "100600572491766724992",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3ks8d%40senaioverflow.iam.gserviceaccount.com"
}
