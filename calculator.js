const inputElement = document.querySelector('.js-input-value');
const acButton = document.querySelector('.js-ac-button');
let calculation = '';
let justCalculated = false;
let result = '';
let signValue = false;
acButton.innerHTML = 'AC';

acButton.addEventListener('click', () => {
  if (acButton.innerHTML === 'AC') {
    calculateAC();
  }
  else if (acButton.innerHTML === '⌫') {
    removeInput();
  }
});

function calculate(number) {
  signValue = false;

  if (inputElement.value === '' && (number === ' ÷ ' || number === ' x ' || number === ' + ' || number === ' - ')) {
    alert('INVALID INPUT!');
    return;
  }

  acButton.innerHTML = '⌫';

  if ((number === ' ÷ ' || number === ' x ' || number ===
    ' - ' || number === ' + ' || number === '.') && (calculation.endsWith(' ÷ ') || calculation.endsWith(' x ') || calculation.endsWith(' - ') || calculation.endsWith(' + ') || calculation.endsWith('.'))) {
    signValue = true;
  }

  if (number === '.' && calculation === '') {
    calculation = '0';
  }

  if (signValue) {
    return;
  }

  if (justCalculated) {
    if (number === ' ÷ ' || number === ' x ' || number === ' - ' || number === ' + ') {
      calculation = result;
      justCalculated = false;
    }
    else {
      calculation = '';
      justCalculated = false;
    }
    if (number === '.' && calculation === '') {
      calculation = '0';
    }
  }
  calculation += number;
  inputElement.value = calculation;
}

function calculateAC() {
  const inputElement = document.querySelector('.js-input-value');
  inputElement.value = '';
  calculation = '';
  result = '';
}

function removeInput(number) {
  const inputElement = document.querySelector('.js-input-value');
  const acButton = document.querySelector('.js-ac-button');
  const spaceValues = inputElement.value.slice(-3);

  if (spaceValues === ' ÷ ' || spaceValues === ' x ' || spaceValues === ' - ' || spaceValues === ' + ') {
    inputElement.value = inputElement.value.slice(0, -3);
  }
  else {
    inputElement.value = inputElement.value.slice(0, -1);
  }
  calculation = inputElement.value;
  if (calculation === '') {
    acButton.innerHTML = 'AC';
  }
}

function displayCalculation() {
  const inputElement = document.querySelector('.js-input-value');
  const acButton = document.querySelector('.js-ac-button');
  if (inputElement.value === '') {
    return;
  }

  calculation = calculation.replace(/ ÷ /g, ' / ').replace(/ x /g, ' * ');

  try {
    result = eval(calculation);
  } catch (error) {
    alert('Syntax Error');
  }

  inputElement.value = result;
  acButton.innerHTML = 'AC';
  justCalculated = true;
}

function sinCalculation() {
  const inputElement = document.querySelector('.js-input-value');
  if (inputElement.value === '') {
    return;
  }
  try {
    if (justCalculated) {
      result = Math.sin(result * Math.PI / 180);
    }
    else {
      result = Math.sin(calculation * Math.PI / 180);
    }
  } catch (error) {
    alert('Syntax Error');
  }

  inputElement.value = result;
  acButton.innerHTML = 'AC';
  justCalculated = true;
}

function cosCalculation() {
  const inputElement = document.querySelector('.js-input-value');
  if (inputElement.value === '') {
    return;
  }
  try {
    if (justCalculated) {
      result = Math.cos(result * Math.PI / 180);
    }
    else {
      result = Math.cos(calculation * Math.PI / 180);
    }
  } catch (error) {
    alert('Syntax Error');
  }

  inputElement.value = result;
  acButton.innerHTML = 'AC';
  justCalculated = true;
}

function percentageCalculation() {
  const inputElement = document.querySelector('.js-input-value');
  if (inputElement.value === '') {
    return;
  }
  try {
    if (justCalculated) {
      result = eval((result) / 100);
    }
    calculation = calculation.replace(/ x /g, ' * ').replace(/ ÷ /g, ' / ');
    result = eval(calculation) / 100;
  } catch (error) {
    alert('Syntax Error');
  }
  inputElement.value = result;
  acButton.innerHTML = 'AC';
  justCalculated = true;
}
