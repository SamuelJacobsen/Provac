const logadoJSON = localStorage.getItem("usuarioLogado");
if(logadoJSON){
    window.location.href = "home.html";
}

 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
 import { getAuth } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
 import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
     apiKey: "AIzaSyBBRZZFQlmx-XAu2lG_NqLymPA1rammWB0",
     authDomain: "myhealth-d1dcc.firebaseapp.com",
     projectId: "myhealth-d1dcc",
     storageBucket: "myhealth-d1dcc.appspot.com",
     messagingSenderId: "956659268017",
     appId: "1:956659268017:web:034ca0be6970e04c332590",
     measurementId: "G-YRSQ1PBKGB"
     };

 var app = initializeApp(firebaseConfig);

 const auth = getAuth(app);

 const entrarBtn = document.getElementById("entrarBtn");
 entrarBtn.addEventListener("click", entrar);


 function entrar(){
     const senha = document.getElementById("senha").value;
     const email = document.getElementById("email").value;

         signInWithEmailAndPassword(auth, email, senha)
     .then((userCredential) => {
         const user = userCredential.user
         localStorage.setItem("usuarioLogado", '[{"uid":"'+user.uid+'"}]');
         window.location.href = "home.html";
     })
     .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         console.error("Login failed:", errorCode, errorMessage);
         document.getElementById("erro").className = "erro";
     });
 }

 export {entrar}