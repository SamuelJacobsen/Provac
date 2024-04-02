const searchElement = document.getElementById("search");
const vacinasList = document.getElementsByTagName("li");

const vacinas = vacinasList;

searchElement.addEventListener("input", pesquisar);

function pesquisar(event) {
    const inputValue = event.target.value;
    var i = 0;
    for(i = 0; i < vacinas.length; i++){
        const itemName = vacinas[i].querySelector("a").getAttribute("name").toLowerCase();
        const valueToCheck = inputValue.toLowerCase();
        if(itemName.includes(inputValue)){
            vacinas[i].className = "";
        }else{
            vacinas[i].className = "escondido";
        }
    } 
}