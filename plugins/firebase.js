import * as firebase from 'firebase/app'
import 'firebase/database'

if (!firebase.apps.length) {
  firebase.initializeApp({
    databaseURL: process.env.RDB_URL
  })
}

export default firebase
