
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');


const logadoJSON = localStorage.getItem("usuarioLogado");
const logado = JSON.parse(logadoJSON);


var adicionadoComp = false;
var user;

if(logado == null){
    window.location.href = "index.html";
}else{
    user = logado[0].uid;
}


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";
import { getFirestore, collection, updateDoc, doc , query, where, getDocs, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

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

async function getVacina(){
    if (usuarioDoc) {
        try {
            const list = document.getElementById("listaVacinas");
            const usuarioRef = doc(db, "usuario", usuarioDoc.id);
    
            const vacinaDocRef = doc(collection(usuarioRef, "vacinas"), id);
            const vacinaDocSnapshot = await getDoc(vacinaDocRef);
    
            if (vacinaDocSnapshot.exists()) {
               return  vacinaDocSnapshot.data();
    
              } else {
                console.error("Vacina not found");
              }
           
        } catch (error) {
            console.error("Error loading vacina: ", error);
        }
    } else {
    console.error("Usuario not found");
    }
}

var selecionada = await getVacina();

function loadHtml(vacinaSelecionada){
    const container = document.getElementById("container");
    if(vacinaSelecionada == undefined){
        container.innerHTML = `   <label fname="dataVac"class="formLabel">Data de vacinação</label>
    <input type="date" name="dataVac" class="formInput" id="dataVac">
    <label for="vacina" class="formLabel">Vacina</label>
    <input type="text" name="vacinaNome" id="vacinaNome" class="formInput">
    <div class="formLabel">Dose</div>
    <div class="formInput" id="radios">
    <input type="radio" name="dose" class="radio" id="1a. dose" value="1a. dose">
    <label for="1a. dose" >1a. Dose</label>
    <input type="radio" name="dose" class="radio"  id="2a. dose" value="2a. dose">
    <label for="2a. dose">2a. Dose</label>
    <input type="radio" name="dose" class="radio"  id="3a. dose" value="3a. dose">
    <label for="3a. dose">3a. Dose</label>
    <input type="radio" name="dose" class="radio" id="reforço" value="Reforço">
    <label for="reforço">Reforço</label>
    <input type="radio" name="dose" class="radio"  id="dose única" value="Dose única">
    <label for="dose única">Dose Única</label>
    </div>
    <div class="formLabel">Comprovante da vacina</div>
    <div class="formInput2">
        <label for="comprovante" class="botao" id="labelComprovante">Selecionar imagem...</label> 
        <input type="file" name="comprovante" id="comprovante"></input>
        <img  class="comprovanteImagem" src="/img/comprovanteVacina.jpg" alt="comprovante de vacinação">
    </div>
    <label for="dataProx" class="formLabel">Próxima Vacinação</label>
    <input type="date" name="dataProx" class="formInput" id="dataProx">`;
    }else{
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
        <img  class="comprovanteImagem" src="`+vacinaSelecionada.comprovante+`" alt="comprovante de vacinação"id="selectedImage">
    </div>
    <label for="dataProx" class="formLabel">Próxima Vacinação</label>
    <input type="date" name="dataProx" class="formInput" id="dataProx" value="`+prox+`">`;
    }
    
    
}

loadHtml(selecionada);


    const inputElement = document.getElementById("comprovante");
    const imageElement = document.getElementById("selectedImage");
    
    let reader;
    var file = null;
    inputElement.addEventListener("change", (event) => {
    file = event.target.files[0];
    reader = new FileReader();
    reader.readAsDataURL(file);
    adicionadoComp = true;
    reader.onload = () => {
        imageElement.src = reader.result;
        imageElement.className = 'comprovanteImagem';
    };
    });
    
        const editarBtn = document.getElementById("salvarBtn");
        editarBtn.addEventListener("click", editarVacina);
    
        function uploadImage(file, vacinaNome, dose){
            const storage = getStorage(app);
    
            const referenceRaw = logado[0].uid+vacinaNome+dose;
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
    
    
        async function editarVacina(){
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
            var comprovante;
            if(adicionadoComp){
                const comprovanteFile = inputElement.files[0];
                const imageSaved = await uploadImage(comprovanteFile, vacinaNome, dose); 
                comprovante = imageSaved;
            }else{
                
                comprovante = imageElement.src;
            }
           
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
                dataProx: prox
            };

            const usuarioRef = doc(db, "usuario", usuarioDoc.id);
    
            const vacinaRef = doc(collection(usuarioRef, "vacinas"), id);
            await updateDoc(vacinaRef, novaVacina);

            window.location.href = "home.html";
        }
    
    
    const excluirBtn = document.getElementById("confirma");
    excluirBtn.addEventListener("click", excluirVacina);

    function excluirVacina(){
        const usuarioRef = doc(db, "usuario", usuarioDoc.id);
    
        const vacinaRef = doc(collection(usuarioRef, "vacinas"), id);

        deleteDoc(vacinaRef)
        .then(() => {
          console.log("Vacina deleted successfully");
          window.location.href = "home.html";
        })
        .catch((error) => {
          console.error("Error deleting vacina: ", error);
        });

    }
