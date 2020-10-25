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

    alert("You will be prompted to indicate the length and what type of characters you want your password to contain");

    var len = prompt("Please enter a number between 8 and 128 to designate desired password length:");
    while (len < 8 || len > 128 || typeof(len) !== "number") {
        len = prompt("You must choose a number from 8 - 128:");
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
        let contAll1 = false;
        let contAll2 = false;
        let contAll3 = false;
        let contAll4 = false;
        while (contAll1 === false || contAll2 === false || contAll3 === false || contAll4 === false) {
            let passWord = passwordConcat (len, passWord, lowercase + uppercase + nums + specialChar);
            console.log(passWord);
            contAll1 = mustContain (passWord, lowercase);
            contAll2 = mustContain (passWord, uppercase);
            contAll3 = mustContain (passWord, nums);
            contAll4 = mustContain (passWord, specialChar);
        }
    }
    else if ((lower === true) && (upper === true) && (num === true) && (spec === false)) {
        passWord = contain3 (len, passWord, lowercase, uppercase, nums);
    }
    else if ((lower === true) && (upper === true) && (num === false) && (spec === true)) {
        passWord = contain3 (len, passWord, lowercase, uppercase, specialChar);
    }
    else if ((lower === true) && (upper === false) && (num === true) && (spec === true)) {
        passWord = contain3 (len, passWord, lowercase, nums, specialChar);
    }
    else if ((lower === false) && (upper === true) && (num === true) && (spec === true)) {
        passWord = contain3 (len, passWord, uppercase, nums, specialChar);
    }
    else if ((lower === true) && (upper === false) && (num === false) && (spec === false)) {
        passWord = passwordConcat (len, passWord, lowercase);
    }
    else if ((lower === false) && (upper === true) && (num === false) && (spec === false)) {
        passWord = passwordConcat (len, passWord, uppercase);
    }
    else if ((lower === false) && (upper === false) && (num === true) && (spec === false)) {
        passWord = passwordConcat (len, passWord, nums);
    }
    else if ((lower === false) && (upper === false) && (num === false) && (spec === true)) {
        passWord = passwordConcat (len, passWord, specialChar);
    }
    else if ((lower === true) && (upper === true) && (num === false) && (spec === false)) {
        passWord = contain2 (len, passWord, lowercase, uppercase);
    }
    else if ((lower === true) && (upper === false) && (num === true) && (spec === false)) {
        passWord = contain2 (len, passWord, lowercase, nums);
    }
    else if ((lower === true) && (upper === false) && (num === false) && (spec === true)) {
        passWord = contain2 (len, passWord, lowercase, specialChar);
    }
    else if ((lower === false) && (upper === true) && (num === true) && (spec === false)) {
        passWord = contain2 (len, passWord, uppercase, nums);
    }
    else if ((lower === false) && (upper === true) && (num === false) && (spec === true)) {
        passWord = contain2 (len, passWord, uppercase, specialChar);
    }
    else if ((lower === false) && (upper === false) && (num === true) && (spec === true)) {
        passWord = contain2 (len, passWord, nums, specialChar);
    }
    return passWord;
}

function contain2 (leng, pass, a, b) {
    let contAll1 = false;
    let contAll2 = false;
    while (contAll1 === false || contAll2 === false) {
        var passW = passwordConcat (leng, pass, a + b);
        console.log(passW);
        contAll1 = mustContain (passW, a);
        contAll2 = mustContain (passW, b);
    }
    return passW;
}

function contain3 (leng, pass, a, b, c) {
    let contAll1 = false;
    let contAll2 = false;
    let contAll3 = false;
    while (contAll1 === false || contAll2 === false || contAll3 === false) {
        var passW = passwordConcat (leng, pass, a + b + c);
        console.log(passW);
        contAll1 = mustContain (passW, a);
        contAll2 = mustContain (passW, b);
        contAll3 = mustContain (passW, c);
    }
    return passW;
}

function mustContain(pwd, str) {
    let doesCont = false;
    for (var j = 0; j < pwd.length; j++) {
        for (var k = 0; k < str.length; k++) {
            if (pwd.indexOf(str[k]) !== -1) {
                let doesCont = true;
            }
        }
    }
    return doesCont;
}

function passwordConcat (length, passwd, aStr) {
    for (var i = 0; i < length; i++) {
        passwd += randomIndex(aStr);
    }
    return passwd;
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


/*     // Pair char sets
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
    const lowupnumspec = lowercase + uppercase + nums + specialChar; */