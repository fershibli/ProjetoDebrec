const ruaElement = document.getElementById("rua")
const bairroElement = document.getElementById("bairro")
const cidadeElement = document.getElementById("cidade")
const ufElement = document.getElementById("uf")

const resultElement = document.getElementById("resultado-calculadora")
const eolicaElement = document.getElementById("resultado-eolica")
const biomassaElement = document.getElementById("resultado-biomassa")
const solarElement = document.getElementById("resultado-solar")
const resultTextElement = document.getElementById("resultado-texto")

function define_excelente(tipoPropriedadeElement, tamanhoPropriedadeElement) {
    const tipoPropriedade = tipoPropriedadeElement.value
    const tamanhoPropriedade = tamanhoPropriedadeElement.value

    let eolica = false
    let biomassa = false
    let solar = true

    console.log(tipoPropriedade, tamanhoPropriedade)

    console.log(tipoPropriedade == "apartamento")
    console.log(tamanhoPropriedade == "familiar")

    if (tipoPropriedade == "apartamento" && tamanhoPropriedade == "familiar") {
        solar = false
    }

    if (tipoPropriedade == "fazenda" || tipoPropriedade == "casa") {
        if (tamanhoPropriedade == "grande") {
            eolica = true
        }
        if (tamanhoPropriedade == "medio" || tamanhoPropriedade == "grande") {
            biomassa = true
        }
    }

    resultElement.className = resultElement.className.replace("d-none", "")

    const energiasLista = []

    if (eolica) {
        eolicaElement.className += " excelente"
        energiasLista.push("eólica")
    }
    if (biomassa) {
        biomassaElement.className += " excelente"
        energiasLista.push("biomassa")
    }
    if (solar) {
        solarElement.className += " excelente"
        energiasLista.push("solar")
    }

    resultTextElement.className = resultTextElement.className.replace(
        "d-none",
        ""
    )

    if (energiasLista.length == 0) {
        resultTextElement.innerHTML =
            "A sua propriedade não é adequada para a geração de energia alternativa."
        return
    }

    let energiasTexto = energiasLista.join(", ")

    energiasTexto = energiasTexto.replace(/,([^,]*)$/, " e $1")

    resultTextElement.innerHTML = `A sua propriedade é excelente para a geração de energia${
        energiasLista.length > 1 ? "s" : ""
    }: ${energiasTexto}.`
}

function validaFormulario() {
    if (
        !ruaElement.value &&
        !bairroElement.value &&
        !cidadeElement.value &&
        !ufElement.value
    ) {
        alert("Preencha o campo CEP")
        return false
    }

    const tipoPropriedadeElement = document.querySelector(
        'input[name="tipoPropriedade"]:checked'
    )
    if (!tipoPropriedadeElement) {
        alert("Selecione o tipo da propriedade")
        return false
    }

    const tamanhoPropriedadeElement = document.querySelector(
        'input[name="tamanhoPropriedade"]:checked'
    )
    if (!tamanhoPropriedadeElement) {
        alert("Selecione o tamanho da propriedade")
        return false
    }

    limpa_excelente()

    define_excelente(tipoPropriedadeElement, tamanhoPropriedadeElement)
}

function limpa_excelente() {
    if (resultTextElement.className.indexOf("d-none") == -1) {
        resultTextElement.className += " d-none"
    }
    if (eolicaElement.className.indexOf("excelente") != -1) {
        eolicaElement.className = eolicaElement.className.replace(
            " excelente",
            ""
        )
    }
    if (biomassaElement.className.indexOf("excelente") != -1) {
        biomassaElement.className = biomassaElement.className.replace(
            " excelente",
            ""
        )
    }
    if (solarElement.className.indexOf("excelente") != -1) {
        solarElement.className = solarElement.className.replace(
            " excelente",
            ""
        )
    }
}

// JavaScript Document
function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    ruaElement.value = ""
    bairroElement.value = ""
    cidadeElement.value = ""
    ufElement.value = ""
    if (resultElement.className.indexOf("d-none") == -1) {
        resultElement.className += " d-none"
    }
    limpa_excelente()
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
