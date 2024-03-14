import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA_98LVr09mVDSHPwAhCgxMkI0lhecJe8c',
  authDomain: 'noteballs-aba30.firebaseapp.com',
  projectId: 'noteballs-aba30',
  storageBucket: 'noteballs-aba30.appspot.com',
  messagingSenderId: '433593508896',
  appId: '1:433593508896:web:488f09d780c46dd5014845'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
