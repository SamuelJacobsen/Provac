import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import {createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

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

const criarContaBtn = document.getElementById("criarContaBtn");
criarContaBtn.addEventListener("click", criarConta);

function criarConta(){
    const senha = document.getElementById("senha").value;
    const senhaRep = document.getElementById("senhaRep").value;

    if(checarSenha(senha, senhaRep)){
        const nome = document.getElementById("nome").value;
        const generos = document.getElementsByName("generos");
        const dataNascimento = document.getElementById("dataNasc").value;
        const email = document.getElementById("email").value;
        var genero = '';
        var i = 0;
        for(i = 0; i < generos.length; i++){
        if(generos[i].checked){
            genero = generos[i].value;
            break;
        }
    };      
        const usuario = {
            nome: nome,
            genero: genero,
        };

        createUserWithEmailAndPassword(getAuth(app), usuario.email, usuario.senha)
        .then((userCredential) => {
             
            var user = userCredential.user;
            const usuarioPlusID = { ...usuario, userId: user.uid };

            addDoc(collection(getFirestore(app), "usuario"), usuarioPlusID)
                .then(() => {
                    localStorage.setItem("usuarioLogado", user.uid);
                    window.location.href = "index.html";
                })
                .catch((error) => {
                    console.log("Error adding document: ", error);
                });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    }
}


function checarSenha(senha, senhaRep){
    const erroSenha = document.getElementById("erroSenha");

    if(senha === senhaRep){
        erroSenha.className = 'escondido';
        return true
    }else{
        erroSenha.className = 'erro';
        return false;
    }
}

export {criarConta}