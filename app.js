//Getting dom elements
const payForm = document.getElementById('calculator-form');
const resultParagraph = document.querySelector('.result>p'); //Could have had an id, but showing different selectors

//Adding event listeners
payForm.addEventListener('submit', payFormSubmitHandler);

//Functions
function payFormSubmitHandler(e){
    e.preventDefault(); //Stopping the form from actually submitting any data
    
    let userInput = Object.fromEntries( new FormData(e.target)); //Fancy way of getting an object with all the data from the form (can also use payForm instead of e.target but this way is a bit more reusable)

    //Checking if the input data is actually a number event though the field is marked as number it doesn't work in every browser e.g. Firefox
    let errors = []; //empty array to hold eventual errors
    Object.keys(userInput).forEach(key => { // using keys instead of values to have acces to the key name
        if(!isNumber(userInput[key])){
            errors.push(`${properName(key)} should be a valid number!`);
        }
    });
    if(errors.length > 0){
        alert(errors.join('\n')); // join the errors by a new row;
        return; // stop executing the function here
    }

    // if all chechs successfull calculate
    let pay = Number(userInput['hours']) * Number(userInput['rate']);
    displayPay(pay.toFixed(2)); // rounding to 2 decimal places

    //Usually would've cleared the input at this stage but it wasn't in the description
}

function displayPay(pay){
    resultParagraph.textContent = `Your total pay will be: ₤${pay}`;
}

function properName(input){
    return input[0].toUpperCase() + input.slice(1,input.length); //Capitalize the first letter of a string
}

function isNumber(input){
    if(input.trim() === '') return false; //Does two things one cheks if we have whitespace also empty strings in JS equate to 0 and give incorrect result in isNan;
    if(isNaN(input)) return false; // Can also 'return !isNaN(input);' and save myself the return true at the end but I find this way a bit easier to read without the bang
    if(Number(input) < 0) return false; //Technically still a valid number but not for the use case we have
	
    return true; 
}