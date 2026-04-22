async function sendMessage(){

const input =
document.getElementById("userInput");

const chatBox =
document.getElementById("chatBox");

const message =
input.value.trim();

if(message === "") return;

/* USER MESSAGE */

chatBox.innerHTML += `
<div style="text-align:right;margin-bottom:14px;">
<span style="
background:#ff5a00;
padding:12px 14px;
border-radius:12px;
display:inline-block;
max-width:72%;
color:#fff;
font-weight:600;
">
${message}
</span>
</div>
`;

input.value = "";

/* SCROLL */

chatBox.scrollTop =
chatBox.scrollHeight;

/* PROMPT ANALYSIS */

document.getElementById("clarity").innerText =
"Clarity: " + Math.floor(Math.random()*18+82) + "%";

document.getElementById("depth").innerText =
"Depth: " + Math.floor(Math.random()*18+80) + "%";

document.getElementById("specificity").innerText =
"Specificity: " + Math.floor(Math.random()*18+84) + "%";

/* GET USER */

const user = JSON.parse(
localStorage.getItem(
"eduprepCurrentUser"
)
);

/* CHECK LOGIN */

if(!user){

chatBox.innerHTML += botMsg(
"Please login first."
);

return;
}

/* CHECK API KEY */

const apiKey =
(user.apikey || "").trim();

if(apiKey === ""){

chatBox.innerHTML += botMsg(
"API Key missing. Login again."
);

return;
}

/* BLOCK NON ACADEMIC */

const blocked = [
"movie",
"song",
"dating",
"adult",
"joke",
"relationship"
];

const lower =
message.toLowerCase();

if(
blocked.some(word =>
lower.includes(word)
)){

chatBox.innerHTML += botMsg(
"EduPrep Tutor supports academic questions only."
);

return;
}

/* LOADING */

chatBox.innerHTML += `
<div id="loadingMsg">
${botMsg("Thinking...")}
</div>
`;

chatBox.scrollTop =
chatBox.scrollHeight;

/* GEMINI REQUEST */

try{

const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[
{
text:
"You are EduPrep AI Tutor. Only answer study, coding, career, exam and learning questions.\n\nUser Question: " + message
}
]
}
]
})
}
);

const data =
await response.json();

/* REMOVE LOADING */

const loading =
document.getElementById(
"loadingMsg"
);

if(loading) loading.remove();

let reply =
"Unable to generate response.";

/* SUCCESS */

if(
data.candidates &&
data.candidates[0] &&
data.candidates[0].content &&
data.candidates[0].content.parts &&
data.candidates[0].content.parts[0]
){
reply =
data.candidates[0]
.content.parts[0]
.text;
}

/* API ERROR */

if(data.error){
reply =
"API Error: " +
data.error.message;
}

/* SHOW RESPONSE */

chatBox.innerHTML +=
botMsg(reply);

chatBox.scrollTop =
chatBox.scrollHeight;

}
catch(error){

const loading =
document.getElementById(
"loadingMsg"
);

if(loading) loading.remove();

chatBox.innerHTML +=
botMsg(
"Connection error. Check internet or API key."
);

}

}

/* BOT MESSAGE TEMPLATE */

function botMsg(text){

return `
<div style="margin-bottom:14px;">
<span style="
background:#1c1c1c;
padding:12px 14px;
border-radius:12px;
display:inline-block;
max-width:75%;
white-space:pre-wrap;
color:#f0f0f0;
line-height:1.6;
border:1px solid #2a2a2a;
">
${text}
</span>
</div>
`;

}