// Oikeat viitteet HTML-elementteihin
const priceInput = document.getElementById("priceInput") as HTMLInputElement; // Verollinen hinta -kenttä
const vatRateInput = document.getElementById("vatRateInput") as HTMLInputElement; // ALV-prosentti -kenttä
const taxFreeInput = document.getElementById("taxFreeInput") as HTMLInputElement; // Veroton hinta -kenttä
const vatAmountInput = document.getElementById("vatAmountInput") as HTMLInputElement; // ALV euroina -kenttä

const vatForm = document.getElementById("vatCalculatorForm") as HTMLFormElement;

// Laskufunktio
function calculateVAT(price: number, vatRate: number): { vatAmount: number; totalPrice: number } {
  const vatAmount = price * (vatRate / 100);
  const totalPrice = price + vatAmount;
  return { vatAmount, totalPrice };
}

function updateFieldsState(): void {
  const price = parseFloat(priceInput.value.replace(",", "."));
  const vatRate = parseFloat(vatRateInput.value);
  const taxFree = parseFloat(taxFreeInput.value);
  const vatAmount = parseFloat(vatAmountInput.value);

  if (!isNaN(price) && !isNaN(vatRate)) {
    // Jos verollinen hinta ja ALV-prosentti on syötetty
    taxFreeInput.disabled = true;
    vatAmountInput.disabled = true;
  } else if (!isNaN(taxFree) && !isNaN(price)) {
    // Jos veroton hinta ja verollinen hinta ovat syötetty
    vatAmountInput.disabled = true;
    vatRateInput.disabled = true;
  } else if (!isNaN(vatAmount) && !isNaN(vatRate)) {
    // Jos ALV euroina ja ALV-prosentti ovat syötetty
    taxFreeInput.disabled = true;
    priceInput.disabled = true;
  } else {
    // Aktivoi kaikki kentät, jos mikään kombinaatio ei ole syötetty
    taxFreeInput.disabled = false;
    vatRateInput.disabled = false;
    vatAmountInput.disabled = false;
    priceInput.disabled = false;
  }
}

function calculateVatFunc(): void {
  const price = parseFloat(priceInput.value.replace(",", "."));
  const vatRate = parseFloat(vatRateInput.value);
  const taxFree = parseFloat(taxFreeInput.value.replace(",", "."));
  const vatAmount = parseFloat(vatAmountInput.value.replace(",", "."));

  const resultBox = document.getElementById("result") as HTMLDivElement;
  const taxFreeResult = document.getElementById("taxFreeResult") as HTMLSpanElement;
  const priceWithVATResult = document.getElementById("priceWithVATResult") as HTMLSpanElement;
  const vatAmountResult = document.getElementById("vatAmountResult") as HTMLSpanElement;
  const vatRateResult = document.getElementById("vatRateResult") as HTMLSpanElement;

  if (!isNaN(price) && !isNaN(vatRate)) {
    const { vatAmount: calculatedVatAmount, totalPrice } = calculateVAT(price, vatRate);

    taxFreeResult.textContent = (price - calculatedVatAmount).toFixed(2).replace(".", ",");
    priceWithVATResult.textContent = totalPrice.toFixed(2).replace(".", ",");
    vatAmountResult.textContent = calculatedVatAmount.toFixed(2).replace(".", ",");
    vatRateResult.textContent = vatRate.toFixed(2).replace(".", ",");

    resultBox.classList.remove("hidden");
  } else if (!isNaN(taxFree) && !isNaN(vatAmount)) {
    const totalFromTaxFree = taxFree + vatAmount;
    const rateFromTaxFree = (vatAmount / taxFree) * 100;

    taxFreeResult.textContent = taxFree.toFixed(2).replace(".", ",");
    priceWithVATResult.textContent = totalFromTaxFree.toFixed(2).replace(".", ",");
    vatAmountResult.textContent = vatAmount.toFixed(2).replace(".", ",");
    vatRateResult.textContent = rateFromTaxFree.toFixed(2).replace(".", ",");

    resultBox.classList.remove("hidden");
  } else if (!isNaN(vatAmount) && !isNaN(vatRate)) {
    const calculatedTaxFree = vatAmount / (vatRate / 100);
    const calculatedPrice = calculatedTaxFree + vatAmount;

    taxFreeResult.textContent = calculatedTaxFree.toFixed(2).replace(".", ",");
    priceWithVATResult.textContent = calculatedPrice.toFixed(2).replace(".", ",");
    vatAmountResult.textContent = vatAmount.toFixed(2).replace(".", ",");
    vatRateResult.textContent = vatRate.toFixed(2).replace(".", ",");

    resultBox.classList.remove("hidden");
  } else {
    taxFreeResult.textContent = "-";
    priceWithVATResult.textContent = "-";
    vatAmountResult.textContent = "-";
    vatRateResult.textContent = "-";

    resultBox.classList.add("hidden");
  }
}

vatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  calculateVatFunc();
});

// Lisää tapahtumankuuntelijat syöttökentille
priceInput.addEventListener("input", updateFieldsState);
vatRateInput.addEventListener("input", updateFieldsState);
taxFreeInput.addEventListener("input", updateFieldsState);
vatAmountInput.addEventListener("input", updateFieldsState);