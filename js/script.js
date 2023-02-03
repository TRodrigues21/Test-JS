// Busca de endereço via CEP consumindo a API BrasilApi CEP

function buscar_endereco () {
    // Variavel que pega o CEP
    let cep = document.getElementById('cep').value;

    // Verificações
    if(cep != "") {

        // Varias que pega a url com o cep digitado
        let url = `https://brasilapi.com.br/api/cep/v1/${cep}`;

        let req = new XMLHttpRequest(); // Objeteto nativo JS que transmite dados entre clienete e servidor
        req.open("GET", url); // Solicitação assicrona para recursos hgospoedado no servidor via GET
        req.send(); // Acesso ao dados retornados pelo servidor

        // Trata os daods

        req.onload = function() {
            if (req.status == 200) { // Se requisição bem sucedida
                let endereco = JSON.parse(req.response); // Transfroma em arquivo JSON
                // Pega os dados retornados por ID
                document.getElementById("logradouro").value = endereco.street;
                document.getElementById("bairro").value = endereco.neighborhood;
                document.getElementById("cidade").value = endereco.city;
                document.getElementById("estado").value = endereco.state;
            }
            else if (req.status == 404) {
                alert("CEP inválido!");
            }
            else {
                alert("Erro de requisição!"); 
            }
        }
    }
}

// Evento
window.onload = function() {
    let txtCep = document.getElementById("cep"); // Pega o CEP
    txtCep.addEventListener("blur", buscar_endereco); // Ativa o evento e chama a função ao clicar fora do input
}