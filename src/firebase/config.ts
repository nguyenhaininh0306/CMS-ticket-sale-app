import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyCEBomd1D1CtHxjicbG1fpJVqsWtgyBGAU',
  authDomain: 'cms-ticket-sale-app.firebaseapp.com',
  projectId: 'cms-ticket-sale-app',
  storageBucket: 'cms-ticket-sale-app.appspot.com',
  messagingSenderId: '1034841343956',
  appId: '1:1034841343956:web:e1f3b23f52261da0a6b841',
  measurementId: 'G-ZX0HQ7KT7S',
})

// Initialize Firebase
const db = firebase.firestore()
export default db
