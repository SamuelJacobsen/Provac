const logadoJSON = localStorage.getItem("usuarioLogado"); // [{"uid":"A098IP26H3NPvZDM2Qfb05bjK0S2"}]
const logado = JSON.parse(logadoJSON);

var user;

if(logado == null){
    window.location.href = "index.html";
}else{
    user = logado[0].uid;
}


const novaBtn = document.getElementById("novaBtn");
novaBtn.addEventListener("click", cadastrarVacina);

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";
import { getFirestore, collection, addDoc, doc , query, where,getDocs } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

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

const inputElement = document.getElementById("comprovante");
const imageElement = document.getElementById("selectedImage");
var imageSaved = "";

function uploadImage(file, vacinaNome, dose){
    const storage = getStorage(app);

    const referenceRaw = logado[0].uid+vacinaNome+dose+file.name;
    const reference = referenceRaw.replace(/\s/g, "");

    const storageRef = ref(storage, reference);

    return uploadBytes(storageRef, file)
    .then((snapshot) => {
      return getDownloadURL(storageRef);
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
    });

 };


let reader;
var file = null;
inputElement.addEventListener("change", (event) => {
 file = event.target.files[0];
reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = () => {
    imageElement.src = reader.result;
    imageElement.className = 'comprovanteImagem';
};
});


async function cadastrarVacina(){
    const dataVacinacao = document.getElementById("dataVac").value;
    const vacinaNome = document.getElementById("vacinaNome").value;
    const doses = document.getElementsByName("dose");
    var dose = '';
    var i = 0;
    for(i = 0; i < doses.length; i++){
        if(doses[i].checked){
            dose = doses[i].value;
            break;
        }
    };
    const comprovanteFile = inputElement.files[0];
    imageSaved = await uploadImage(comprovanteFile, vacinaNome, dose); 
    const comprovante = imageSaved;
    const dataProx = document.getElementById("dataProx").value;
    var prox = dataProx;

    if(dose == 'Dose única' || dose == 'Reforço'){
        prox = 'Não há próxima dose'
    }
    const novaVacina = {
        dataVacinacao: dataVacinacao,
        vacinaNome: vacinaNome,
        dose: dose,
        comprovante: comprovante,
        dataProx: prox,
        usuario: user
    };
    
    const q = query(collection(db, "usuario"), where("userId", "==", user));

    const querySnapshot = await getDocs(q);
    const usuarioDoc = querySnapshot.docs[0];

    if (usuarioDoc) {
        try {
            const vacinaDocRef = await addDoc(collection(usuarioDoc.ref, "vacinas"), novaVacina);
            console.log("Nova vacina added with ID: ", vacinaDocRef.id);
            window.location.href = "home.html";
        } catch (error) {
            console.error("Error adding nova vacina: ", error);
        }
    } else {
    console.error("Usuario not found");
    }
}

export {cadastrarVacina}