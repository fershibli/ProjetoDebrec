const ruaElement = document.getElementById("rua")
const bairroElement = document.getElementById("bairro")
const cidadeElement = document.getElementById("cidade")
const ufElement = document.getElementById("uf")
// JavaScript Document
function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    ruaElement.value = ""
    bairroElement.value = ""
    cidadeElement.value = ""
    ufElement.value = ""
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        ruaElement.value = conteudo.logradouro
        bairroElement.value = conteudo.bairro
        cidadeElement.value = conteudo.localidade
        ufElement.value = conteudo.uf
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep()
        alert("CEP não encontrado.")
    }
}

function cepMask(event) {
    let cepInput = event.target
    let cepValue = cepInput.value
    if (cepValue.length < 9) {
        limpa_formulário_cep()
    }
    if (event.keyCode == 8) {
        //backspace
        return
    }
    cepValue = cepValue.replace(/\D/g, "")

    if (cepValue.length >= 5) {
        cepValue = cepValue.substring(0, 5) + "-" + cepValue.substring(5)
    }

    event.target.value = cepValue
    if (cepValue.length >= 9) {
        pesquisacep(cepValue)
    }
}

function pesquisacep(valor) {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, "")

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/

        //Valida o formato do CEP.
        if (validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById("rua").value = "..."
            document.getElementById("bairro").value = "..."
            document.getElementById("cidade").value = "..."
            document.getElementById("uf").value = "..."

            //Cria um elemento javascript.
            var script = document.createElement("script")

            //Sincroniza com o callback.
            script.src =
                "https://viacep.com.br/ws/" +
                cep +
                "/json/?callback=meu_callback"

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script)
        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep()
            alert("Formato de CEP inválido.")
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep()
    }
}

function mostra_mensagem() {
    const alert_sucesso = document.getElementById("mensagem")
    const class_list = alert_sucesso.className.split(" ")
    if (class_list[class_list.length - 1] == "d-none") {
        class_list.pop()
        alert_sucesso.className = class_list.join(" ")
    }
}
