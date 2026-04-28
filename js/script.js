// Tasas de cambio (1 MXN = X moneda)
const exchangeRates = {
    USD: 0.059,   // Dólar estadounidense
    GBP: 0.046,   // Libra esterlina
    EUR: 0.054   // Euro
};

// Nombres de monedas
const currencyNames = {
    USD: 'Dólares estadounidenses',
    GBP: 'Libras esterlinas',
    EUR: 'Euros'
};

// Elementos del DOM
const form = document.getElementById('currencyForm');
const amountInput = document.getElementById('amount');
const currencySelect = document.getElementById('currency');
const errorMessage = document.getElementById('errorMessage');
const resultDiv = document.getElementById('result');

// Función para validar la cantidad
function validateAmount(value) {
    // Comprobar que no está vacío
    if (value === '' || value === null) {
        return { valid: false, error: 'El campo no puede estar vacío' };
    }
    
    // Comprobar que es un número
    const num = Number(value);
    if (isNaN(num)) {
        return { valid: false, error: 'Debes introducir un número válido' };
    }
    
    // Comprobar que no es menor a 0
    if (num < 0) {
        return { valid: false, error: 'La cantidad no puede ser menor a 0' };
    }
    
    return { valid: true, value: num };
}

// Función para convertir moneda
function convertCurrency(amount, targetCurrency) {
    const rate = exchangeRates[targetCurrency];
    const result = amount * rate;
    return result.toFixed(2);
}

// Función para mostrar error
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    resultDiv.classList.add('hidden');
}

// Función para mostrar resultado
function showResult(amount, currency, result) {
    errorMessage.classList.add('hidden');
    resultDiv.innerHTML = `${amount} MXN = ${result} ${currencyNames[currency]}`;
    resultDiv.classList.remove('hidden');
    
    // Mostrar resultado por consola
    console.log('=== RESULTADO DE CONVERSIÓN ===');
    console.log(`Cantidad original: ${amount} MXN`);
    console.log(`Moneda destino: ${currency}`);
    console.log(`Cantidad convertida: ${result} ${currency}`);
    console.log('================================');
}

// Evento del botón
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const amountValue = amountInput.value;
    const targetCurrency = currencySelect.value;
    
    // Validar cantidad
    const validation = validateAmount(amountValue);
    
    if (!validation.valid) {
        showError(validation.error);
        return;
    }
    
    // Convertir moneda
    const convertedAmount = convertCurrency(validation.value, targetCurrency);
    
    // Mostrar resultado
    showResult(validation.value, targetCurrency, convertedAmount);
});