/* =========================
   LOGIN
========================= */

function login(event){
event.preventDefault();

const email =
document.getElementById("email").value.trim();

const password =
document.getElementById("password").value.trim();

if(!email || !password){
alert("Fill all fields");
return;
}

const users = JSON.parse(
localStorage.getItem("eduprepUsers")
) || [];

const user = users.find(
u =>
u.email === email &&
u.password === password
);

if(!user){
alert("Invalid credentials");
return;
}

localStorage.setItem(
"eduprepCurrentUser",
JSON.stringify(user)
);

window.location.href =
"home.html";
}

/* =========================
   SIGNUP
========================= */

function signup(event){
event.preventDefault();

const email =
document.getElementById("email").value.trim();

const password =
document.getElementById("password").value.trim();

if(!email || !password){
alert("Fill all fields");
return;
}

const users = JSON.parse(
localStorage.getItem("eduprepUsers")
) || [];

const exists = users.find(
u => u.email === email
);

if(exists){
alert("User already exists");
return;
}

users.push({
email,
password
});

localStorage.setItem(
"eduprepUsers",
JSON.stringify(users)
);

alert("Signup successful");
window.location.href =
"login.html";
}

/* =========================
   LOGOUT
========================= */

function logout(){

localStorage.removeItem(
"eduprepCurrentUser"
);

window.location.href =
"login.html";
}

/* =========================
   PAGE PROTECTION
========================= */

(function(){

const page =
window.location.pathname;

const user =
localStorage.getItem(
"eduprepCurrentUser"
);

const publicPages = [
"/",
"/login.html",
"/signup.html"
];

const isPublic =
publicPages.some(p =>
page.endsWith(p)
);

if(!user && !isPublic){
window.location.href =
"login.html";
}

})();

/* =========================
   SIDEBAR PREFILL KEY
========================= */

window.addEventListener(
"DOMContentLoaded",
function(){

const input =
document.getElementById(
"apiKeyInput"
);

if(input){

input.value =
localStorage.getItem(
"tutorApiKey"
) || "";

}

}
);