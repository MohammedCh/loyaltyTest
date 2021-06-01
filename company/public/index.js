const signUpBtn = document.querySelector("#signUpBtn");
const signInBtn = document.querySelector("#signInBtn");
const backBtn = document.querySelector("#backBtn");
const signBtnGrp = document.querySelector("#signBtnGrp");
const backBtnGrp = document.querySelector("#backBtnGrp");
const emailField = document.querySelector("#emailField");
const signInPage = document.querySelector("#signInPage");
const confirmTrans = document.querySelector("#confirmTrans")

signUpBtn.addEventListener("click", signUp);
signInBtn.addEventListener("click", logging);
backBtn.addEventListener("click", logging);
emailField.addEventListener("keyup", emailChecker);
confirmTrans.addEventListener("click", transaction);

function logging() {
    if (signBtnGrp.hidden === false) {
        console.log("hi");
        signBtnGrp.hidden = true;
        backBtnGrp.hidden = false;
    }
    else {
        console.log("hi2");
        signBtnGrp.hidden = false;
        backBtnGrp.hidden = true;
    }
}


function signUp() {
    console.log("signed up!")
}

function transaction() {
    console.log("logged!")
}

// Email id must contain the @ and . character
// There must be at least one character before and after the @.
// There must be at least two characters after . (dot).
function emailChecker() {
    let x = emailField.value;
    let atposition = x.indexOf("@");
    let dotposition = x.lastIndexOf(".");
    if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= x.length) {
    }
    else {
        console.log("gucci");
        signUpBtn.removeAttribute("disabled");
        signInBtn.removeAttribute("disabled");
    }
}
