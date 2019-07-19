import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from '../../firebaseConfig'

firebase.initializeApp(firebaseConfig)
const FIRESTORE = firebase.firestore()
const PORTFOLIOS = 'portfolios'

export default {
  postPortfolio (title, body) {
    return FIRESTORE.collection(PORTFOLIOS).add({
      title: title,
      body: body,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    }).then(response => alert('저장 완료.'))
      .catch(error => console.log(error))
  }
}
