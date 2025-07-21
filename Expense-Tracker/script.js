let totalExpense = 0;
let storedExpenses;

// getting dom elements
const divContainer = document.querySelector('.container');
const expenseList = document.getElementById('expenses');
const clearExpenses = document.getElementById('clear-expenses');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const addExpense = document.getElementById('add-expense');
const total = document.getElementById('total-expense');

// create icon
function createIcon(cls){
    const icon = document.createElement('i');
    icon.className = cls;
    return icon;
}

// create button 
function createButton(cls){
    const button = document.createElement('button');
    button.className = cls;
    return button;
}

// create expense list item
function createExpenseListItem(expense,amount){
    totalExpense += amount;
    storedExpenses.push(expense + 'Rs.' + amount);
    localStorage.setItem('ExpenseList', storedExpenses);
    const li = document.createElement('li');
    li.classname = 'expense-list';
    const expenseName = document.createElement('span');
    expenseName.textContent = expense;
    const expenseAmount = document.createElement('span');
    expenseAmount.className = 'amount';
    expenseAmount.textContent = 'Rs.' + amount;
    li.appendChild(expenseName);
    li.appendChild(expenseAmount);
    const button = createButton('delete-expenses');
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    li.appendChild(button);
    expenseList.appendChild(li);
    total.textContent = 'Rs.' + totalExpense;
}

// clear all expenses
function clearAllExpenses(){
    const expenses = document.querySelectorAll('li');
    expenses.forEach((expense) => {
        expenseList.removeChild(expense);
    });
    totalExpense = 0;
    total.textContent = 'Rs. 0.00';
    localStorage.setItem('ExpenseList', '');
}

// delete expense 
function deleteExpense(e){
    let exp = e.target.parentElement.parentElement;
    expenseList.removeChild(exp);
    const x = [];
    storedExpenses.forEach((t) => {
        if(t !== exp.innerText){
            x.push(t);
        }
    });
    storedExpenses = x;
    localStorage.setItem('ExpenseList', storedExpenses);
    exp = exp.querySelector('.amount');
    exp = exp.innerText.split('Rs.')
    totalExpense -= Number(exp[1]);
}

// on mouse over
function onMouseOver(){
    const expenses = document.querySelectorAll('li');
    expenses.forEach((expense) => {
        expense.querySelector('button i').addEventListener('click' , (e) => {
            deleteExpense(e);
            if(totalExpense === 0){
                total.textContent = 'Rs. 0.00';
            }
            else{total.textContent = 'Rs.' + totalExpense;}
        });
    });
}

// getting expense list from localstorage
storedExpenses = localStorage.getItem('ExpenseList');
if(storedExpenses && storedExpenses.length >0){
    storedExpenses = storedExpenses.split(',');
    
    // restoring expenses 
    storedExpenses.forEach((expenses) => {
        expenses = expenses.split('Rs.');
        createExpenseListItem(expenses[0], Number(expenses[1]));
    });
}else{
    storedExpenses = [];
}


// events 
addExpense.addEventListener('click', () => {
    const expense = expenseNameInput.value;
    const amount = Number(expenseAmountInput.value);
    createExpenseListItem(expense, amount);
    expenseAmountInput.value = '';
    expenseNameInput.value = '';
});

clearExpenses.addEventListener('click', clearAllExpenses);

expenseList.addEventListener('mouseover', onMouseOver);

expenseAmountInput.addEventListener('keydown' , (e) => {
    if(e.key === 'Enter'){
        addExpense.click();
    }
});