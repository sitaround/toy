# Toy Project
Vue와 Firebase를 이용한 Toy Project
---

### firebase config file
firebase 설정 파일은 넣지 않음.
수정하고 싶은 경우
```
firebase login
firebase init
```
**./firebaseConfig.js**
```javascript
export default {
  apiKey: '...',
  authDomain: 'x.firebaseapp.com',
  databaseURL: 'https://x.firebaseio.com',
  projectId: 'x',
  storageBucket: 'x.appspot.com',
  messagingSenderId: '...',
  appId: '...'
}
```