import * as firebase from 'firebase/app'
import 'firebase/database'

if (!firebase.apps.length) {
  firebase.initializeApp({
    databaseURL: process.env.DB_URL
  })
}

export default firebase
