import Vue from 'vue'
import App from './App.vue'
import router from "./routes/index";
import * as firebase from "firebase";
import store from "./store";

Vue.config.productionTip = false

const configOptions = {
  apiKey: "AIzaSyBeBmi12Jqr6W8e860GZNtvsYVWlZx3_9Y",
  authDomain: "cloud-21b8f.firebaseapp.com",
  databaseURL: "https://vue-firebase-auth-2802d.firebaseio.com", // hmm maybe http://localhost:8080/ ? idk
  projectId: "cloud-21b8f",
  storageBucket: "cloud-21b8f.appspot.com",
  messagingSenderId: "1038659760662",
  appId: "1:1038659760662:web:f820d46ccd89f63642fb37"
};

firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");