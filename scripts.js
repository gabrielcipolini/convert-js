// Cotação de moedas
const USD = 4.87
const EUR = 5.32
const GBP = 6.08

// Obtendo elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, "")
})

// Capturando o evento de submit do formulário.
form.onsubmit = (event) => {
  event.preventDefault()

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$")
      break

    case "EUR":
      convertCurrency(amount.value, EUR, "€")
      break

    case "GBP":
      convertCurrency(amount.value, GBP, "£")
      break
  }
}

// Conversão da moeda.
function convertCurrency(amount, price, symbol) {
  try {
    // Exibindo a cotação da moeda selecionada.
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

    // Calcula o valor de conversão com a cotação do dia.
    let total = amount * price

    // Verifica se o resultado é um número
    if (isNaN(total)) {
      return alert("Por favor, digite o valor corretamente para converter.")
    }

    // Formatar o valor total.
    total = formatCurrencyBRL(total).replace("R$", "")

    // Exibe o resultado total.
    result.textContent = `${total} Reais`

    // Aplica a classe de exibição do footer para mostrar o resultado.
    footer.classList.add("show-result")
  } catch (error) {
    // Remove a classe de exibição do footer.
    footer.classList.remove("show-result")

    console.log(error)
    alert("Não foi possível converte. Tente novamente mais tarde!")
  }
}

// Formata a moeda em Real Brasileiro
function formatCurrencyBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}
