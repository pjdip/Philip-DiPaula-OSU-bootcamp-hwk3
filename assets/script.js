// Functions
class Pwd {
    constructor(length, low, up, num, spec) {
        this.length = length;
        this.low = low;
        this.up = up;
        this.num = num;
        this.spec = spec;
    }


}


function getCriteria() {
    alert("You will be prompted to indicate the length and what type of characters you want your password to contain");

    var len = prompt("Please give a password length between 8 - 128 characters:");
    while (len < 8 || len > 128) {
        len = prompt("You must choose a number betwee 8 - 128:");
    }

    var lowercase = confirm("Would you like your password to contain lowercase characters?");
    var uppercase = confirm("Would you like your password to contain uppercase characters?");
    var num = confirm("Would you like your password to contain numbers?");
    var specialChar = confirm("Would you like your password to contain special characters?");
    while ((lowercase === false) && (uppercase === false) && (num === false) && (specialChar === false)) {
        alert("You must choose at least 1 character type to include in your password, please try the process again");
        var lowercase = confirm("Would you like your password to contain lowercase characters?");
        var uppercase = confirm("Would you like your password to contain uppercase characters?");
        var num = confirm("Would you like your password to contain numbers?");
        var specialChar = confirm("Would you like your password to contain special characters?");
    }
    

    console.log(len);
    console.log(lowercase);
    console.log(uppercase);
    console.log(num);
    console.log(specialChar);
}

function generatePassword(length, lower, upper, number, special) {
    const password = new Pwd(length, lower, upper, number, special);
    return password;
}

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;

}

/* var specialChar = " !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"; */

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Main code



// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
generateBtn.addEventListener("click", getCriteria);
