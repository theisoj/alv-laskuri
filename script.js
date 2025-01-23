// Oikeat viitteet HTML-elementteihin
const priceInput = document.getElementById("priceWithVAT") // Verollinen hinta -kenttä
const vatRateInput = document.getElementById("vatPercentage") // ALV-prosentti -kenttä
const taxFreeInput = document.getElementById("priceWithoutVAT") // Veroton hinta -kenttä
const vatAmountInput = document.getElementById("vatAmount") // ALV euroina -kenttä
const calculateVATButton = document.getElementById("calculateVAT") // Laskupainike

const vatForm = document.getElementById("vatForm")

// Laskufunktio
function calculateVAT(price, vatRate) {
  const vatAmount = price * (vatRate / 100)
  const totalPrice = price + vatAmount
  return { vatAmount, totalPrice }
}

function updateFieldsState() {
  const price = parseFloat(priceInput.value.replace(",", "."))
  const vatRate = parseFloat(vatRateInput.value)
  const taxFree = parseFloat(taxFreeInput.value)
  const vatAmount = parseFloat(vatAmountInput.value)

  if (!isNaN(price) && !isNaN(vatRate)) {
    // Jos verollinen hinta ja ALV-prosentti on syötetty
    taxFreeInput.disabled = true
    vatAmountInput.disabled = true
  } else if (!isNaN(taxFree) && !isNaN(price)) {
    // Jos veroton hinta ja verollinen hinta ovat syötetty
    vatAmountInput.disabled = true
    vatRateInput.disabled = true
  } else if (!isNaN(vatAmount) && !isNaN(vatRate)) {
    // Jos ALV euroina ja ALV-prosentti ovat syötetty
    taxFreeInput.disabled = true
    priceInput.disabled = true
  } else {
    // Aktivoi kaikki kentät, jos mikään kombinaatio ei ole syötetty
    taxFreeInput.disabled = false
    vatRateInput.disabled = false
    vatAmountInput.disabled = false
    priceInput.disabled = false
  }
}

function calculateVatFunc() {
  const price = parseFloat(priceInput.value.replace(",", "."));
  const vatRate = parseFloat(vatRateInput.value);
  const taxFree = parseFloat(taxFreeInput.value.replace(",", "."));
  const vatAmount = parseFloat(vatAmountInput.value.replace(",", "."));

  const resultBox = document.getElementById("result");
  const taxFreeResult = document.getElementById("taxFreeResult");
  const priceWithVATResult = document.getElementById("priceWithVATResult");
  const vatAmountResult = document.getElementById("vatAmountResult");
  const vatRateResult = document.getElementById("vatRateResult");

  if (!isNaN(price) && !isNaN(vatRate)) {
    // Laske ALV ja näytä tulos
    const { vatAmount: calculatedVatAmount, totalPrice } = calculateVAT(price, vatRate);

    taxFreeResult.textContent = (price - calculatedVatAmount).toFixed(2).replace(".", ",");
    priceWithVATResult.textContent = totalPrice.toFixed(2).replace(".", ",");
    vatAmountResult.textContent = calculatedVatAmount.toFixed(2).replace(".", ",");
    vatRateResult.textContent = vatRate.toFixed(2).replace(".", ",");

    // Näytä laatikko
    resultBox.classList.remove("hidden");
    taxFreeInput.disabled = true;
    vatAmountInput.disabled = true;
  } else if (!isNaN(taxFree) && !isNaN(vatAmount)) {
    // Jos veroton hinta ja ALV euroina ovat syötetty
    const totalFromTaxFree = taxFree + vatAmount;
    const rateFromTaxFree = (vatAmount / taxFree) * 100;

    taxFreeResult.textContent = taxFree.toFixed(2).replace(".", ",");
    priceWithVATResult.textContent = totalFromTaxFree.toFixed(2).replace(".", ",");
    vatAmountResult.textContent = vatAmount.toFixed(2).replace(".", ",");
    vatRateResult.textContent = rateFromTaxFree.toFixed(2).replace(".", ",");

    // Näytä laatikko
    resultBox.classList.remove("hidden");
    vatRateInput.disabled = true;
    priceInput.disabled = true;
  } else if (!isNaN(vatAmount) && !isNaN(vatRate)) {
    // Jos ALV euroina ja ALV-prosentti ovat syötetty
    const calculatedTaxFree = vatAmount / (vatRate / 100);
    const calculatedPrice = calculatedTaxFree + vatAmount;

    taxFreeResult.textContent = calculatedTaxFree.toFixed(2).replace(".", ",");
    priceWithVATResult.textContent = calculatedPrice.toFixed(2).replace(".", ",");
    vatAmountResult.textContent = vatAmount.toFixed(2).replace(".", ",");
    vatRateResult.textContent = vatRate.toFixed(2).replace(".", ",");

    // Näytä laatikko
    resultBox.classList.remove("hidden");
    taxFreeInput.disabled = true;
    priceInput.disabled = true;
  } else {
    // Tyhjennä tuloskentät ja piilota laatikko
    taxFreeResult.textContent = "-";
    priceWithVATResult.textContent = "-";
    vatAmountResult.textContent = "-";
    vatRateResult.textContent = "-";

    resultBox.classList.add("hidden");

    // Aktivoi kaikki kentät
    taxFreeInput.disabled = false;
    priceInput.disabled = false;
    vatRateInput.disabled = false;
    vatAmountInput.disabled = false;
  }
}

vatForm.addEventListener("submit", (e) => {
  e.preventDefault()
  calculateVatFunc()
})

// Lisää tapahtumankuuntelijat syöttökentille
priceInput.addEventListener("input", updateFieldsState)
vatRateInput.addEventListener("input", updateFieldsState)
taxFreeInput.addEventListener("input", updateFieldsState)
vatAmountInput.addEventListener("input", updateFieldsState)
