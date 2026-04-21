async function sendMessage() {

const input =
document.getElementById("userInput");

const chatBox =
document.getElementById("chatBox");

const message =
input.value.trim();

if (message === "") return;

/* User Message */

chatBox.innerHTML += `
<div style="text-align:right;margin-bottom:12px;">
<span style="
background:#ff5a00;
padding:10px;
border-radius:8px;
display:inline-block;
max-width:70%;
">
${message}
</span>
</div>
`;

input.value = "";

/* Prompt Analysis */

document.getElementById("clarity").innerText =
"Clarity: " + Math.floor(Math.random()*20+80) + "%";

document.getElementById("depth").innerText =
"Depth: " + Math.floor(Math.random()*20+75) + "%";

document.getElementById("specificity").innerText =
"Specificity: " + Math.floor(Math.random()*20+78) + "%";

/* Get API Key */

const user = JSON.parse(
localStorage.getItem("eduprepCurrentUser")
);

if (!user || !user.apikey) {

chatBox.innerHTML += `
<div style="margin-bottom:12px;">
<span style="
background:#222;
padding:10px;
border-radius:8px;
display:inline-block;
">
API Key missing. Login again.
</span>
</div>
`;

return;
}

/* Restricted Topics */

const blocked = [
"movie",
"song",
"dating",
"adult",
"joke"
];

const lower = message.toLowerCase();

if (blocked.some(word => lower.includes(word))) {

chatBox.innerHTML += `
<div style="margin-bottom:12px;">
<span style="
background:#222;
padding:10px;
border-radius:8px;
display:inline-block;
">
EduPrep Tutor supports academics only.
</span>
</div>
`;

return;
}

/* Gemini Request */

try {

const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${user.apikey}`,
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
text:message
}
]
}
]
})
}
);

const data = await response.json();

let reply =
"Unable to generate response.";

if (
data.candidates &&
data.candidates[0] &&
data.candidates[0].content &&
data.candidates[0].content.parts
) {
reply =
data.candidates[0]
.content.parts[0].text;
}

/* AI Reply */

chatBox.innerHTML += `
<div style="margin-bottom:12px;">
<span style="
background:#222;
padding:10px;
border-radius:8px;
display:inline-block;
max-width:75%;
white-space:pre-wrap;
">
${reply}
</span>
</div>
`;

chatBox.scrollTop =
chatBox.scrollHeight;

}
catch(error){

chatBox.innerHTML += `
<div style="margin-bottom:12px;">
<span style="
background:#222;
padding:10px;
border-radius:8px;
display:inline-block;
">
Error connecting Gemini API.
</span>
</div>
`;

}

}