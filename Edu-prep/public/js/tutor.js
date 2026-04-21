async function sendMessage(){

const input = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

const message = input.value.trim();

if(message === "") return;

chatBox.innerHTML += `
<div style="text-align:right;margin-bottom:10px;">
<span style="background:#ff5a00;padding:10px;border-radius:8px;">
${message}
</span>
</div>
`;

input.value = "";

const res = await fetch("/api/tutor",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({message})
});

const data = await res.json();

chatBox.innerHTML += `
<div style="margin-bottom:10px;">
<span style="background:#222;padding:10px;border-radius:8px;display:inline-block;">
${data.reply}
</span>
</div>
`;

chatBox.scrollTop = chatBox.scrollHeight;

}