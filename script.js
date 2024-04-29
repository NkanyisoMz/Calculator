let currentInput = '';   // Current input string
let result = null;       // Stores the result of the calculation
let operation = null;    // Stores the chosen operation

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) {
        return; // Prevent adding a decimal if there's already one in the current input
    }
    currentInput += number;
    updateDisplay();
}


function selectOperation(op) {
    if (currentInput === '') return;  // Prevent choosing an operation without an input

    if (result !== null) {  // There is already a result, use it as the first operand
        calculate();
    } else if (currentInput !== '') {
        result = parseFloat(currentInput);  // First time operation selection, set result
    }

    operation = op;
    currentInput = '';
}

function calculate() {
    const current = parseFloat(currentInput);
    if (isNaN(current)) return;
    if (result === null) {
        result = current;  // No operation yet, just set result as current
    } else if (operation) {
        result = operate(result, current, operation);  // Perform the operation
        result = roundResult(result);  // Round the result before displaying
    }
    currentInput = String(result);  // Convert result back to string for display
    updateDisplay();
    operation = null;  // Clear the operation
}

// Helper function to round results to a specified number of decimal places
function roundResult(number) {
    return Number.parseFloat(number.toFixed(4));  // Rounds to 4 decimal places
}


function clearDisplay() {
    currentInput = '';
    result = null;
    operation = null;
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').value = currentInput;
}

// Operation functions
function operate(x, y, op) {
    return op(x, y);
}

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y !== 0) {
        return x / y;
    } else {
        return "Cannot divide by zero!";
    }
}
