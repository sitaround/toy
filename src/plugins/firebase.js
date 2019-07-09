import Vue from 'vue'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from '../../firebaseConfig'

firebase.initializeApp(firebaseConfig)
const FIRESTORE = firebase.firestore()
const PORTFOLIOS = 'portfolios'

export default {
  postPortfolio (data) {
    return FIRESTORE.collection(PORTFOLIOS).add({
      data,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    }).then(response => alert('저장 완료.'))
      .catch(error => console.log(error))
  },
  getPortfolio () {
    const postsCollection = FIRESTORE.collection(PORTFOLIOS)
    return postsCollection
      .orderBy('created_at', 'desc')
      .get()
      .then((docSnapshots) => {
        return docSnapshots.docs.map((doc) => {
          let data = doc.data()
          data.created_at = new Date(data.created_at.toDate())
          return data
        })
      })
      .catch(error => console.log(error))
  }
}
