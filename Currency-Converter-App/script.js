const apiKey = 'a80e2f66d45ae0b1737cf001';
let initialCurrency = 'INR', finalCurrency = 'JPY', amount = 1, convertedAmount = 0;


// selecting dom elements
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const conversionRate = document.querySelector('.conversion-rate');
const convertedCurrency = document.getElementById('converted-amount');
const amountInput = document.getElementById('amount');

//creating currency options
function createFromOption(currency){
    const option = document.createElement('option');
    option.value = currency;
    option.textContent = currency;
    fromCurrency.appendChild(option);
}
function createToOption(currency){
    const option = document.createElement('option');
    option.value = currency;
    option.textContent = currency;
    toCurrency.appendChild(option);
}


// change converted amount
async function changeConvertedAmount(){
    amount = amountInput.value;
    const link = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${initialCurrency}/${finalCurrency}/${amount}`;
    promise = await fetch(link);
    const resultData = await promise.json();
    convertedCurrency.value = resultData.conversion_result;
    conversionRate.textContent = `1 ${initialCurrency} = ${resultData.conversion_rate} ${finalCurrency}`;
}

// create currency option list
async function createOptions(){
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`;
    promise = await fetch(url);
    const data = await promise.json();
    console.log(data.conversion_rates , typeof data.conversion_rates);
    let currencies= Object.keys(data.conversion_rates);
    currencies.forEach((currency) => {
        createFromOption(currency);
        createToOption(currency);
        toCurrency.value = finalCurrency;
    });
}

createOptions();
changeConvertedAmount();

// events
fromCurrency.addEventListener('change', (e) => {
    initialCurrency = e.target.value;
    changeConvertedAmount();
});

toCurrency.addEventListener('change', (e) => {
    finalCurrency = e.target.value;
    changeConvertedAmount();
});

document.querySelector('.swap-btn').addEventListener('click' , () => {
    fromCurrency.value = finalCurrency;
    toCurrency.value = initialCurrency;
    const currenyExchange = finalCurrency;
    finalCurrency = initialCurrency;
    initialCurrency = currenyExchange;
    changeConvertedAmount();
});

