const display = document.getElementById('display');
const expressionDisplay = document.getElementById('expression');

let currentInput = '';
let expression = '';

function appendCharacter(char) {
  // Prevent multiple consecutive operators
  const operators = ['+', '-', '*', '/', '%'];
  if (operators.includes(char) && operators.includes(currentInput.slice(-1))) {
    currentInput = currentInput.slice(0, -1) + char;
  } else {
    currentInput += char;
  }
  updateDisplay();
}

function clearDisplay() {
  currentInput = '';
  expression = '';
  updateDisplay();
}

function deleteChar() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function updateDisplay() {
  display.textContent = currentInput || '0';
  expressionDisplay.textContent = expression;
}

function calculate() {
  try {
    if (!currentInput) return;
    
    expression = currentInput;
    // Format operators for evaluation
    let sanitizedInput = currentInput.replace(/÷/g, '/').replace(/×/g, '*');
    
    // Evaluate math expression
    let result = eval(sanitizedInput);
    
    if (!isFinite(result)) {
      display.textContent = 'Error';
      currentInput = '';
      return;
    }

    currentInput = result.toString();
    updateDisplay();
  } catch (error) {
    display.textContent = 'Error';
    currentInput = '';
  }
}

// Keyboard Support
document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (!isNaN(key) || key === '.') {
    appendCharacter(key);
  } else if (key === '+') {
    appendCharacter('+');
  } else if (key === '-') {
    appendCharacter('-');
  } else if (key === '*') {
    appendCharacter('*');
  } else if (key === '/') {
    event.preventDefault();
    appendCharacter('/');
  } else if (key === '%') {
    appendCharacter('%');
  } else if (key === 'Enter' || key === '=') {
    calculate();
  } else if (key === 'Backspace') {
    deleteChar();
  } else if (key === 'Escape') {
    clearDisplay();
  }
});
