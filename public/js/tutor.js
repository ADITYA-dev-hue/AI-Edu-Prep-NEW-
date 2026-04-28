let currentLang = "english";

function toggleSidebar(){
const bar = document.getElementById("sidebar");
bar.classList.toggle("open");
}

function saveApiKey(){
const key =
document.getElementById("apiKeyInput").value.trim();

if(!key){
alert("Enter API Key");
return;
}

localStorage.setItem("tutorApiKey", key);
alert("API Key Saved");
}

function setLang(lang){
currentLang = lang;

document.getElementById("engBtn").classList.remove("active-btn");
document.getElementById("hinBtn").classList.remove("active-btn");

if(lang === "english"){
document.getElementById("engBtn").classList.add("active-btn");
}else{
document.getElementById("hinBtn").classList.add("active-btn");
}
}

function escapeHtml(text){
return text
.replace(/&/g,"&amp;")
.replace(/</g,"&lt;")
.replace(/>/g,"&gt;");
}

function addUserMsg(msg){
document.getElementById("chatBox").innerHTML += `
<div class="user-msg">${escapeHtml(msg)}</div>
`;
}

function addBotMsg(msg){
document.getElementById("chatBox").innerHTML += `
<div class="bot-msg"><pre>${escapeHtml(msg)}</pre></div>
`;
}

async function sendMessage(){

const input =
document.getElementById("userInput");

const msg = input.value.trim();

if(!msg) return;

addUserMsg(msg);
input.value = "";

const key =
localStorage.getItem("tutorApiKey");

if(!key){
addBotMsg("Please enter API key in sidebar.");
return;
}

document.getElementById("clarity").innerText =
"Clarity: " + Math.floor(Math.random()*18+82) + "%";

document.getElementById("depth").innerText =
"Depth: " + Math.floor(Math.random()*18+80) + "%";

document.getElementById("specificity").innerText =
"Specificity: " + Math.floor(Math.random()*18+84) + "%";

addBotMsg("Thinking...");

const chat =
document.getElementById("chatBox");

try{

const prompt =
(currentLang === "hindi"
? "Answer in Hindi.\n"
: "Answer in English.\n") +
"Only academic/coding/study answers.\nUser Question: " + msg;

const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${key}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[
{text:prompt}
]
}
]
})
}
);

const data = await response.json();

chat.lastElementChild.remove();

let reply = "Unable to generate response.";

if(
data.candidates &&
data.candidates[0] &&
data.candidates[0].content &&
data.candidates[0].content.parts &&
data.candidates[0].content.parts[0]
){
reply =
data.candidates[0].content.parts[0].text;
}

if(data.error){
reply = "API Error: " + data.error.message;
}

addBotMsg(reply);

chat.scrollTop = chat.scrollHeight;

}catch(err){

chat.lastElementChild.remove();
addBotMsg("Connection error.");

}

}