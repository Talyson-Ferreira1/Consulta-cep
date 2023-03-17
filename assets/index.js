
const sendButton = document.querySelector("#botão");
const inputCep = document.querySelector("#cep");
const warningText = document.querySelector(".warningText");
const infoContainer = document.querySelector(".container-secundario")


function validarCEP(cep){
    // Remover espaços em branco e traços
    cep = cep.replace(/\s|-/g, '');
    
    // Verificar se o CEP tem 8 dígitos
    if (cep.length !== 8) {
      return false
    }
    
    // Verificar se o CEP contém apenas números
    if (!/^\d+$/.test(cep)) {
        return false
    }

    return true;
}
function getCep(cep){

    activeConteinerInfo()

    let script = document.createElement("script");
    script.src = `https://viacep.com.br/ws/${cep}/json/?callback=popularForm`
    document.body.appendChild(script);
    
}

function activeConteinerInfo(){
    infoContainer.classList.add("active");
}
function removeConteinerInfo(){
    infoContainer.classList.remove("active");
}

function addWarning(){
    inputCep.parentElement.classList.add("warning");
    warningText.classList.add("active");
}
function removeWarning(){
    inputCep.parentElement.classList.remove("warning")
    warningText.classList.remove("active");
}

function popularForm(resposta){

    const rua = document.querySelector(".rua");
    const bairro = document.querySelector(".bairro");
    const cidade = document.querySelector(".cidade");
    const estado = document.querySelector(".estado");

    rua.innerText = `Rua: ${resposta.logradouro}` 
    bairro.innerText = `Bairro: ${resposta.bairro}` 
    cidade.innerText = `Cidade: ${resposta.localidade}` 
    estado.innerText = `Estado: ${resposta.uf}` 
}


inputCep.addEventListener("focus",()=>{
    removeWarning()
    removeConteinerInfo()
})


sendButton.addEventListener("click", ()=>{
    let Cep = inputCep.value;
    validarCEP(Cep)? getCep(Cep):addWarning()
})




