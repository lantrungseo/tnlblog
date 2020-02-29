import * as firebaseAdmin from 'firebase-admin'


firebaseAdmin.initializeApp({
  credential : firebaseAdmin.credential.cert(require('./firebase_service_account.json')),
  databaseURL : "",
  storageBucket : ""
})

export const database =  firebaseAdmin.database()
export const storage = firebaseAdmin.storage().bucket();