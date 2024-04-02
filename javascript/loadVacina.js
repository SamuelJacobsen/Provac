
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');


const logadoJSON = localStorage.getItem("usuarioLogado");
const logado = JSON.parse(logadoJSON);

var user;

if(logado == null){
    window.location.href = "index.html";
}else{
    user = logado[0].uid;
}


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, collection, addDoc, doc , query, where, getDocs, getDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

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
var db = getFirestore(app);

const q = query(collection(db, "usuario"), where("userId", "==", user));

const querySnapshot = await getDocs(q);

const usuarioDoc = querySnapshot.docs[0];
if (usuarioDoc) {
    try {
        const list = document.getElementById("listaVacinas");
        const usuarioRef = doc(db, "usuario", usuarioDoc.id);

        const vacinaDocRef = doc(collection(usuarioRef, "vacinas"), id);
        const vacinaDocSnapshot = await getDoc(vacinaDocRef);

        if (vacinaDocSnapshot.exists()) {
           const vacinaSelecionada = vacinaDocSnapshot.data();
            const container = document.getElementById("container");
            var prox =  vacinaSelecionada.dataProx;
            var radioSelecionado = ["","","","",""];
            const selecionado = vacinaSelecionada.dose;
            switch (selecionado) {
                case '1a. dose':
                radioSelecionado[0] = 'checked="checked"'
                break;
                case '2a. dose':
                    radioSelecionado[1] = 'checked="checked"'
                break;
                case '3a. dose':
                    radioSelecionado[2] ='checked="checked"'
                break;
                case 'Reforço':
                    radioSelecionado[3] = 'checked="checked"'
                break;
                case 'Dose única':
                    radioSelecionado[4] = 'checked="checked"'
                    break;
                default:
                console.log('Sorry, we do not have that fruit.');
            }
            if(prox[0] == 'N' || prox.length < 1){
                prox = '1999-01-01'
            }
            container.innerHTML = `   <label fname="dataVac"class="formLabel">Data de vacinação</label>
            <input type="date" name="dataVac" class="formInput" id="dataVac" value="`+vacinaSelecionada.dataVacinacao+`">
            <label for="vacina" class="formLabel">Vacina</label>
            <input type="text" value="`+vacinaSelecionada.vacinaNome+`" name="vacinaNome" id="vacinaNome" class="formInput">
            <div class="formLabel">Dose</div>
            <div class="formInput" id="radios">
            <input type="radio" name="dose" class="radio" `+radioSelecionado[0]+` id="1a. dose" value="1a. dose">
            <label for="1a. dose" >1a. Dose</label>
            <input type="radio" name="dose" class="radio" `+radioSelecionado[1]+` id="2a. dose" value="2a. dose">
            <label for="2a. dose">2a. Dose</label>
            <input type="radio" name="dose" class="radio" `+radioSelecionado[2]+` id="3a. dose" value="3a. dose">
            <label for="3a. dose">3a. Dose</label>
            <input type="radio" name="dose" class="radio" `+radioSelecionado[3]+ `id="reforço" value="Reforço">
            <label for="reforço">Reforço</label>
            <input type="radio" name="dose" class="radio" `+radioSelecionado[4]+` id="dose única" value="Dose única">
            <label for="dose única">Dose Única</label>
            </div>
            <div class="formLabel">Comprovante da vacina</div>
            <div class="formInput2">
                <label for="comprovante" class="botao" id="labelComprovante">Selecionar imagem...</label> 
                <input type="file" name="comprovante" id="comprovante"></input>
                <img  class="comprovanteImagem" src="/img/comprovanteVacina.jpg" alt="comprovante de vacinação">
            </div>
            <label for="dataProx" class="formLabel">Próxima Vacinação</label>
            <input type="date" name="dataProx" class="formInput" id="dataProx" value="`+prox+`">`;
          } else {
            console.error("Vacina not found");
          }
       
    } catch (error) {
        console.error("Error loading vacina: ", error);
    }
} else {
console.error("Usuario not found");
}