
const logadoJSON = localStorage.getItem("usuarioLogado"); // [{"uid":"A098IP26H3NPvZDM2Qfb05bjK0S2"}]
const logado = JSON.parse(logadoJSON);

var user;

if(logado == null){
    window.location.href = "index.html";
}else{
    user = logado[0].uid;
}


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, collection, doc , query, where,getDocs } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

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
        const vacinaCollectionRef = collection(usuarioRef, "vacinas");
        const vacinaQuerySnapshot = await getDocs(vacinaCollectionRef);
        vacinaQuerySnapshot.forEach((vacinaDoc) => {
            const vacinaData = vacinaDoc.data();
            const novoItem = cardVacina(vacinaData, vacinaDoc.id);
                list.appendChild(novoItem);
        });
    } catch (error) {
        console.error("Error loading vacinas: ", error);
    }
} else {
console.error("Usuario not found");
}

function cardVacina(vacina, id){
    const dataVac = vacina.dataVacinacao;
    const dataVacObj = new Date(dataVac);
    const dataVacFormatada = dataVacObj.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const dataProx = vacina.dataProx;
    var dataProxFormatada = dataProx;
    if(dataProx[0] != 'N'){
        const dataProxObj = new Date(dataProx);
        dataProxFormatada = dataProxObj.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    const src = vacina.comprovante;
    const cardVacina = document.createElement("li");

    cardVacina.innerHTML = `
    <a href="editarVacina.html?id=`+id+`" name="`+vacina.vacinaNome+`" class="listItem">
      <h2>`+vacina.vacinaNome+`</h2>
      <div class="botao dose"><p class="doseText">`+vacina.dose+`</p></div>
      <div class="data">`+dataVacFormatada+`</div>
      <div class="vacinaImagemDiv"><img class="vacinaImagem" src="`+src+`"></div>
      <div class="dataProx">`+dataProxFormatada+`</div>
    </a>`;
  return cardVacina;
}
