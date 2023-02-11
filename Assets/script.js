// Assignment Code
var generateBtn = document.querySelector("#generate");
var alphaList = 'abcdefghijklmnopqrstuvwxyz'
var lowerCasePool = Array.from(alphaList)
var upperCasePool = Array.from(alphaList.toUpperCase())
var specialPool = Array.from("!#$%&()*+,-./:;<=>?@[]^_{|}~")
var ynResponse = ['y', 'yes', 'n', 'no']

function generatePassword(){
  var passLength = 0
  var passTypes = []
  var genPass = ""

  /*
  get password length, keeps prompting incase input isnt an integer
  also sets lower and upper bound limits for input
  */
  do{
    passLength = window.prompt("How long would you like your password to be? (Needs to be an integer between 8 and 128)")
  }
  while (isNaN(passLength) || passLength < 8 || passLength > 128)

  //get chracter types for passwords
  if (passTypePrompt("Would you like Uppercase Letters in your password?\n\n[Y]es or [N]o") === 'y'){
    passTypes.unshift('uppercase')
  }

  if (passTypePrompt("Would you like Lowercase Letters in your password?\n\n[Y]es or [N]o") === 'y'){
    passTypes.unshift('lowercase')
  }

  if (passTypePrompt("Would you like numbers in your password?\n\n[Y]es or [N]o") === 'y'){
    passTypes.unshift('numbers')
  }

  if (passTypePrompt("Would you like special characters in your password?\n\n[Y]es or [N]o") === 'y'){
    passTypes.unshift('special')
  }
  //check to make sure that at least one character type has been selected.
  if (passTypes.length < 1){
    window.alert("No character types were selected. Please try again by clicking the generate button.")
    return ""
  }

  // Set tracker variables to false, with these we can ensure that random anomalies will
  // not prevent selected types from being used
  var trackUpper = false
  var trackLower = false
  var trackNumber = false
  var trackSpecial = false

  // Loop number of times equal to the length chosen
  // Randomly select through the types chosen
  // Randomly select character
  // Then generate password
  do{
    for (i=0; i < passLength; i++){
      var newChar = ""
      var checkType = genRandom(passTypes)

      if ( checkType == 'uppercase'){
        genPass += genRandom(upperCasePool)
        trackUpper = true
      }else if (checkType == 'lowercase'){
        genPass += genRandom(lowerCasePool)
        trackLower = true
      }else if (checkType == 'special'){
        genPass += genRandom(specialPool)
        trackSpecial = true
      }else{
        genPass += Math.floor(Math.random() * 9 )
        trackNumber = true
      }
    }
  }
  // Ensuring selected types are used.
  while((trackUpper === false && passTypes.includes('uppercase')) ||
        (trackLower === false && passTypes.includes('lowercase')) ||
        (trackNumber === false && passTypes.includes('numbers')) ||
        (trackSpecial === false && passTypes.includes('special'))
  )
  return genPass
}

//random generator function
function genRandom(x){
  return x[Math.floor(Math.random() * x.length)]
}

/*
Function to return prompt answers with yes or no response for password
character types accepts command prompt message as parameters and validates input
*/
function passTypePrompt(msg){
  var answer = ""
  //variable tracker for alerting user if input was incorrect
  var incorrect = 0

  do{
    if (incorrect === 0){
      answer = window.prompt(msg)
    }else{
      answer = window.prompt("Incorrect Response: Please Try Again.\n\n\n" + msg)
    }
    // while loop is running keep incorrect at 1 so user will be force to use valid input
    incorrect  = 1
  }
  while (!ynResponse.includes(answer))

  answer = answer.toLowerCase()
  if (answer === 'y' || answer === 'yes'){
    return "y"
  }else{
    return "n"
  }
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);