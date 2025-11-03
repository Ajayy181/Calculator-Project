const inputElement = document.querySelector('.js-input-value');
const acButton = document.querySelector('.js-ac-button');
let calculation = '';
//Note that: in all case calculation here would be a string
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

//From here when we run this function, we add number the number to the input, the number is being passed from the onclick in html, then that number is added to the inputElement.value
function calculate(number) {
  signValue = false;

  if (inputElement.value === '' && (number === ' ÷ ' || number === ' x ' || number === ' + ' || number === ' - ')) {
    alert('Invalid!');
    return;
  }

  acButton.innerHTML = '⌫';

  //.endsWith is a method that checks if a strings ends with a specific substring, a specific substring is a string that's with the string value, while .startWith() method works the same way just from the beginning.
  if ((number === ' ÷ ' || number === ' x ' || number === 
    ' - ' || number === ' + ' || number === '.') && (calculation.endsWith(' ÷ ') || calculation.endsWith(' x ') || calculation.endsWith(' - ') || calculation.endsWith(' + ') || calculation.endsWith('.'))) {
    signValue = true;
  }

  if (number === '.' && calculation === '') {
    calculation = '0';
  }

  //So if the signValue is true in this case, it'll return, and when we click on any number again, it turns false and then continues like that.... Although to be honest we don't really need all that i just want to use it to learn, normally if we return from there it will work the same way, it restarts normally and returns only if the signValue is true
  if (signValue) {
    return;
  }

  //Whenever we click on the = the justCalculated variable becomes true allowing this if statement to run, so anytime we click on another button, it run and then the old calculation reset so we can start a new calculation afresh....And then we make it false again so anytime, so it'll stop the statement, until we make it through again from =;

  if (justCalculated) {
    //What are we doing here: I want to always make sure that i can still calculate after solving something, so that why anytime i click on the equal to, and then i use a sign it saves the result into calculation then it makes the justCalculated false so it won't run again when we click on a number and then it add the number which is the sign into the calculation and then it display it as the result we have already saved into calculation ready for another maths and then the new number which is a sign, but when we click on the equal to sign and then a number next, justCalculated will run else then reset normally
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
  const acButton = document.querySelector('.js-ac-button')
  //.slice works on strings too not just arrays, 0 makes sure it starts from the first character, you can look at it like an array, index 0, the -1 remove 1 input value from the back, the more we push the -1 e.g to -3 it removes three spaces of values from the back, so we'll use (-3) for the signs because they have extra spaces
  //This is temporary, so in order to make it permanent we have to assign the current removal back to calculation
  //We'll create a variable to store the last three characters of the calculation string.... which is a character with 2 extra spaces which makes it three

  //This below checks for any of the string that has three characters, which are the signs, it gets the last three characters of the string "no matter what they are number or sign" and saves it in spaceValues, so spaceValues contain the final 3 characters of calculation...because if we don't do it like that and we use inputElement.value === ' x ', then it'll take three numbers of the input and then remove them when we click on the button.
  //This below saves any value that has space before and after which make it .slice(-3) and saves it in spaceValues...Note that: we can't use only inputElement.value or calculation to check if we have + or - etc... because that's the whole input it'll never be true so it keep running else regardless of what's there, but by using spaceValues we save any number with (-3); so we check if they are available in the input then run that remove input.
  const spaceValues = inputElement.value.slice(-3);

  //So below we check if any of the Characters are either x or - etc...
  if (spaceValues === ' ÷ ' || spaceValues === ' x ' || spaceValues === ' - ' || spaceValues === ' + ') {
    inputElement.value = inputElement.value.slice(0, -3);
  }
  else {
    inputElement.value = inputElement.value.slice(0, -1);
  }
  //This updates the calculation
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

  //We understand that it's calculation that's running the inputElement.value, so whatever is in calculation would be displayed to input  when the function runs so now after we calculate, we make the calculation/result empty, so when we restart another calculation, the input will start off as empty, instead of it continuing from the old string the we just calculated
  
  //Replace allows us to take the ÷ and replace it with / but, after that we have to assign it so the calculation can be updated
  //Replace is a method that returns a new strings with some parts replaced, it won't change until you assign it. g there means the global variable, which allows it to replace all not just one. so replace looks through the string, finds the global occurrence and returns the new string where each is replaced
  calculation = calculation.replace(/ ÷ /g, ' / ').replace(/ x /g, ' * ');

  //Note that: when there is an error like the syntax error, there's no result to display so it automatically take the global variable result = ''; removing our inputElement.value
  try {
    //eval() executes a calculation if the string is valid, then saves it in result...if valid, the catch() is skipped because there is no error, error runs when an error is thrown, and error is passed to verity the error, then display the string in alert...that's what makes try and catch useful instead of stopping the code after an error it uses that to run something.
    result = eval(calculation);
  } catch (error) {
    alert('Syntax Error');
  }
  //So we really don't need this error here actually because I've fixed the issue with multiple sign but either way there can always be an error to handle from the eval so it'sensible to use there.
  

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
      //For the sin calculation what we are to do first is to take the calculation value first and then change it to radians before using Math.sin, so basically how to convert to radius is take our string (calculation) multiply it by Math.PI and divide it by 180.... then we save it to result...it's the same with cos
      result = Math.sin(calculation * Math.PI / 180);
    }
    //I'm adding this line here just in a case we get NaN as an error for both sin and cos
    if (isNaN(result)) throw new Error();
  } catch (error) {
    alert('Syntax Error');
    result = '';
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
      //For the cos calculation what we are to do first is to take the calculation value first and then change it to radians before using Math.cos then we save it to result
      result = Math.cos(calculation * Math.PI / 180);
    }
    if (isNaN(result)) throw new Error();
  } catch (error) {
    alert('Syntax Error');
    result = '';
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
  //I decided to place the try here just in case there's any error, I mean we can't tell javascript can be very crazy
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



