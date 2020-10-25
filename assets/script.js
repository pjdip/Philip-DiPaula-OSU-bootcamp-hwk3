// Functions
function generatePassword() {
    var passWord = "";

    // Individual char sets
    // Creating a string that includes all special chars except double quotes, then concatenating double quotes on the end
    const specialCha = " !#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
    const specialChar = specialCha + '"';
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";

    // Pair char sets
    const lowup = lowercase + uppercase;
    const lownum = lowercase + nums;
    const lowspec = lowercase + specialChar;
    const upnum = uppercase + nums;
    const upspec = uppercase + specialChar;
    const numspec = nums + specialChar;

    // Triple char sets
    const lowupnum = lowercase + uppercase + nums;
    const lowupspec = lowercase + uppercase + specialChar;
    const lownumspec =  lowercase + nums + specialChar;
    const upnumspec =  uppercase + nums + specialChar;

    // Full char set
    const lowupnumspec = lowercase + uppercase + nums + specialChar;

    alert("You will be prompted to indicate the length and what type of characters you want your password to contain");

    var len = prompt("Please enter a number between 8 - 128 to designate desired password length:");
    while (len < 8 || len > 128) {
        len = prompt("You must choose a number betwee 8 - 128:");
    }

    var lower = confirm("Would you like your password to contain lowercase characters?");
    var upper = confirm("Would you like your password to contain uppercase characters?");
    var num = confirm("Would you like your password to contain numbers?");
    var spec = confirm("Would you like your password to contain special characters?");
    while ((lower === false) && (upper === false) && (num === false) && (spec === false)) {
        alert("You must choose at least 1 character type to include in your password, please try the process again");
        var lower = confirm("Would you like your password to contain lowercase characters?");
        var upper = confirm("Would you like your password to contain uppercase characters?");
        var num = confirm("Would you like your password to contain numbers?");
        var spec = confirm("Would you like your password to contain special characters?");
    }

    if ((lower === true) && (upper === true) && (num === true) && (spec === true)) {
        passwordConcat (len, passWord, lowupnumspec);
    }
    else if ((lower === true) && (upper === true) && (num === true) && (spec === false)) {
        passwordConcat (len, passWord, lowupnum);
    }
    else if ((lower === true) && (upper === true) && (num === false) && (spec === true)) {
        passwordConcat (len, passWord, lowupspec);
    }
    else if ((lower === true) && (upper === false) && (num === true) && (spec === true)) {
        passwordConcat (len, passWord, lownumspec);
    }
    else if ((lower === false) && (upper === true) && (num === true) && (spec === true)) {
        passwordConcat (len, passWord, upnumspec);
    }
    else if ((lower === true) && (upper === false) && (num === false) && (spec === false)) {
        passwordConcat (len, passWord, lowercase);
    }
    else if ((lower === false) && (upper === true) && (num === false) && (spec === false)) {
        passwordConcat (len, passWord, uppercase);
    }
    else if ((lower === false) && (upper === false) && (num === true) && (spec === false)) {
        passwordConcat (len, passWord, nums);
    }
    else if ((lower === false) && (upper === false) && (num === false) && (spec === true)) {
        passwordConcat (len, passWord, specialChar);
    }
    else if ((lower === true) && (upper === true) && (num === false) && (spec === false)) {
        passwordConcat (len, passWord, lowup);
    }
    else if ((lower === true) && (upper === false) && (num === true) && (spec === false)) {
        passwordConcat (len, passWord, lownum);
    }
    else if ((lower === true) && (upper === false) && (num === false) && (spec === true)) {
        passwordConcat (len, passWord, lowspec);
    }
    else if ((lower === false) && (upper === true) && (num === true) && (spec === false)) {
        passwordConcat (len, passWord, upnum);
    }
    else if ((lower === false) && (upper === true) && (num === false) && (spec === true)) {
        passwordConcat (len, passWord, upspec);
    }
    else if ((lower === false) && (upper === false) && (num === true) && (spec === true)) {
        passwordConcat (len, passWord, numspec);
    }
    return passWord;
}

function passwordConcat (length, pwd, aString) {
    for (var i = 0; i < length; i++) {
        pwd += randomIndex(aString);
    }
}

function randomIndex (indexed) {
    x = Math.floor(Math.random() * indexed.length);
    return indexed[x];
}

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;
}


// Assignment Code
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
