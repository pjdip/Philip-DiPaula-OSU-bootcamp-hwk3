// Functions

// Use type coercion to parse the string, and use parseFloat to ensure whitespace fails
function isNumeric(str) {
    // We return the opposite of isNaN, in this way, numbers will come back true
    // Using && means if either statement is false, the whole thing is false
    return !isNaN(str) && !isNaN(parseFloat(str));
}

// Takes an array and returns false if any element is false, otherwise returns true
function checkTrue(arrayF) {
    for (var i = 0; i < arrayF.length; i++) {
        if (arrayF[i] === false) {
            return false;
        }
    }
    return true;
}

// Returns a random index from the argument
function randomIndex (indexed) {
    x = Math.floor(Math.random() * indexed.length);
    return indexed[x];
}

// Add random indexes from str to the password until it reaches the desired length
function passwordConcat (length, charSet) {
    // Starts with empty string to be concatenated
    var passwd = "";
    for (var i = 0; i < length; i++) {
        passwd += randomIndex(charSet);
    }
    return passwd;
}

// Compare 2 strings and check whether they have mutually exclusive characters
function mustContain(str1, str2) {
    for (var j = 0; j < str1.length; j++) {
        for (var k = 0; k < str2.length; k++) {
            // If a single character between the strings matches, we are done
            if (str1.indexOf(str2[k]) !== -1) {
                return true;
            }
        }
    }
    return false;
}

// Takes a map and stores the values of each key/value pair from that map
// in an array in the order (order is important) they were added to the map
function getVals(map1) {
    let vals = [];
    const iterator1 = map1.values();
    for (var i = 0; i < map1.size; i++) {
        vals.push(iterator1.next().value);
    }
    return vals;
}

function generatePassword() {

    // User interaction section
    alert("You will be prompted to indicate the length and what type of characters you want your password to contain");

    var len = prompt("Please enter a number between 8 and 128 to designate desired password length:");

    // Ask the user for a new input if the one they give does not meet our requirements
    while (len < 8 || len > 128 || isNumeric(len) !== true) {
        len = prompt("You must choose a number from 8 - 128:");
    }

    // Initializing values to enter the while loop
    var lower = false, upper = false, num = false, spec = false;
    // User must choose at least 1 confirmation to be true, or will be asked again until they do so
    while ((lower === false) && (upper === false) && (num === false) && (spec === false)) {
        alert("You must choose at least 1 character type (4 options) to include in your password");
        var lower = confirm("Would you like your password to contain lowercase characters?");
        var upper = confirm("Would you like your password to contain uppercase characters?");
        var num = confirm("Would you like your password to contain numbers?");
        var spec = confirm("Would you like your password to contain special characters?");
    }

    // Just doing map things for to learn
    var passMap = new Map ([
        ["length", len],
        ["low", lower],
        ["up", upper],
        ["numb", num],
        ["specChar", spec],
    ])

    var vals = getVals(passMap);
    const specChar = " !#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
    const specChars = specChar + '"';
    const fullCharSet = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789", specChars];

    // Steals the length element from the front of the vals array, leaving an array of booleans
    var length = vals.shift();
    var charCheck = [];
    var requestedCharSet = [];
    var passChar = "";

    // Loop through the list of booleans
    for (var i = 0; i < vals.length; i++) {
        console.log(vals[i]);
        // Each time the user chose to include a particular character set, we do a few things
        if (vals[i] === true) {
            charCheck.push(false);
            // Building a new charSet array because cutting off elements mid loop changes the length,
            // ex: if we exclude spec char after already cutting out one of the other sets, fullCharSet[3] is undefined
            requestedCharSet.push(fullCharSet[i]);
            passChar += fullCharSet[i];
        }
        console.log(requestedCharSet);
    }

    while (checkTrue(charCheck) === false) {
        // Reset all the values to false
        for (var j = 0; j < charCheck.length; j++) {
            charCheck[j] = false;            
        }
        var word = passwordConcat(length, passChar);
        console.log(word);
        // Change the false to true if the generated password contains characters from the set
        for (var k = 0; k < charCheck.length; k++) {
            charCheck[k] = mustContain(word, requestedCharSet[k]);
            console.log(charCheck[k]);
        }
    }
    return word;
}

// Write password to the #password input
function writePassword() {
    let password = generatePassword();
    let passwordText = document.querySelector("#password");
    passwordText.value = password;
}

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);