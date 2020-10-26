// Functions

// Use type coercion to parse the string, and use parseFloat to ensure whitespace fails
function isNumeric(str) {
    // We return the opposite isNaN, in this way, numbers will come back true
    // Using && means if either statement is false, the whole thing is false
    return !isNaN(str) && !isNaN(parseFloat(str));
}

// Returns a random index from the argument
function randomIndex (indexed) {
    x = Math.floor(Math.random() * indexed.length);
    return indexed[x];
}

// Add random indexes from str to the password until it reaches the desired length
function passwordConcat (length, str) {
    // Starts with empty string to be concatenated
    var passwd = "";
    for (var i = 0; i < length; i++) {
        passwd += randomIndex(str);
    }
    return passwd;
}

// Compare 2 strings and check whether they have mutually exclusive characters
function mustContain(passwd, str) {
    var doesCont = false;
    for (var j = 0; j < passwd.length; j++) {
        for (var k = 0; k < str.length; k++) {
            // If a single character between the strings matches, we are done
            if (passwd.indexOf(str[k]) !== -1) {
                doesCont = true;
            }
        }
    }
    return doesCont;
}

/* function setChange() */

function newPassword(vals) {
    const specCha = " !#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
    const specChar = specCha + '"';
    const charSets = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789", specChar];
    var length = vals.shift();
    var charCheck = [];
    var newSet = [];
    var passChar = "";
    for (var i = 0; i < vals.length; i++) {
        console.log(vals[i]);
        if (vals[i] === true) {
            charCheck.push(false);
            newSet.push(charSets[i]);
            passChar += charSets[i];
        }
        console.log(newSet);
    }

    while (checkTrue(charCheck) === false) {
        for (var j = 0; j < charCheck.length; j++) {
            charCheck[j] = false;            
        }
        var word = passwordConcat(length, passChar);
        console.log(word);
        for (var k = 0; k < charCheck.length; k++) {
            charCheck[k] = mustContain(word, newSet[k]);
            console.log(charCheck[k]);
        }
    }
    return word;
}

function checkTrue(arrayF) {
    for (var i = 0; i < arrayF.length; i++) {
        if (arrayF[i] === false) {
            return false;
        }
    }
    return true;
}

/* // Given 2 strings, creates a password and checks if it contains characters from each string
function contain2 (length, a, b) {
    var contAll1 = false, contAll2 = false;
    // The loop runs until both variables change to true
    while (contAll1 === false || contAll2 === false) {
        // Create a password with given parameters
        var passwd = passwordConcat (length, a + b);
        console.log(passwd);
        // Check that the password contains characters from both building block strings
        contAll1 = mustContain (passwd, a), contAll2 = mustContain (passwd, b);
    }
    return passwd;
}

// Same as above but with 3 strings
function contain3 (length, a, b, c) {
    var contAll1 = false, contAll2 = false, contAll3 = false;
    while (contAll1 === false || contAll2 === false || contAll3 === false) {
        var passwd = passwordConcat (length, a + b + c);
        console.log(passwd);
        contAll1 = mustContain (passwd, a), contAll2 = mustContain (passwd, b), contAll3 = mustContain (passwd, c);
    }
    return passwd;
} */

class Pwd {
    constructor(length, low, up, numb, specChar){
        this.length = length;
        this.low = low;
        this.up = up;
        this.numb = numb;
        this.specChar = specChar;
    }
}

function getVals(map1) {
    let vals = [];
    const iterator1 = map1.values();
    for (var i = 0; i < map1.size; i++) {
        vals.push(iterator1.next().value);
    }
    return vals;
}

function generatePassword() {

    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const specialCha = " !#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
    const specialChar = specialCha + '"';
    var passWord

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

    var passMap = new Map ([
        ["length", len],
        ["low", lower],
        ["up", upper],
        ["numb", num],
        ["specChar", spec],
    ])

    var passWord = new Pwd(len, lower, upper, num, spec);

    values = getVals(passMap);
    passWord = newPassword(values);

/*     // Password is generated depending on user's inputs
    if ((lower === true) && (upper === true) && (num === true) && (spec === true)) {
        // The 4 string version of our 'contain' functions. We only needed it once, so no function
        let contAll1 = false, contAll2 = false, contAll3 = false, contAll4 = false;
        while (contAll1 === false || contAll2 === false || contAll3 === false || contAll4 === false) {
            passWord = passwordConcat (len, lowercase + uppercase + nums + specialChar);
            console.log(passWord);
            contAll1 = mustContain (passWord, lowercase), contAll2 = mustContain (passWord, uppercase);
            contAll3 = mustContain (passWord, nums), contAll4 = mustContain (passWord, specialChar);
        }
    }
    // Building the password from 3 strings
    else if ((lower === true) && (upper === true) && (num === true) && (spec === false)) {
        passWord = contain3 (len, lowercase, uppercase, nums);
    }
    else if ((lower === true) && (upper === true) && (num === false) && (spec === true)) {
        passWord = contain3 (len, lowercase, uppercase, specialChar);
    }
    else if ((lower === true) && (upper === false) && (num === true) && (spec === true)) {
        passWord = contain3 (len, lowercase, nums, specialChar);
    }
    else if ((lower === false) && (upper === true) && (num === true) && (spec === true)) {
        passWord = contain3 (len, uppercase, nums, specialChar);
    }
    // Building the password from 2 strings
    else if ((lower === true) && (upper === true) && (num === false) && (spec === false)) {
        passWord = contain2 (len, lowercase, uppercase);
    }
    else if ((lower === true) && (upper === false) && (num === true) && (spec === false)) {
        passWord = contain2 (len, lowercase, nums);
    }
    else if ((lower === true) && (upper === false) && (num === false) && (spec === true)) {
        passWord = contain2 (len, lowercase, specialChar);
    }
    else if ((lower === false) && (upper === true) && (num === true) && (spec === false)) {
        passWord = contain2 (len, uppercase, nums);
    }
    else if ((lower === false) && (upper === true) && (num === false) && (spec === true)) {
        passWord = contain2 (len, uppercase, specialChar);
    }
    else if ((lower === false) && (upper === false) && (num === true) && (spec === true)) {
        passWord = contain2 (len, nums, specialChar);
    }
    // Only building the password from 1 string, so no need to verify contents
    else if ((lower === true) && (upper === false) && (num === false) && (spec === false)) {
        passWord = passwordConcat (len, lowercase);
    }
    else if ((lower === false) && (upper === true) && (num === false) && (spec === false)) {
        passWord = passwordConcat (len, uppercase);
    }
    else if ((lower === false) && (upper === false) && (num === true) && (spec === false)) {
        passWord = passwordConcat (len, nums);
    }
    else if ((lower === false) && (upper === false) && (num === false) && (spec === true)) {
        passWord = passwordConcat (len, specialChar);
    } */
    return passWord;
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