console.log("Study Path Loaded");

const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {

btn.addEventListener("click", () => {

btn.innerText = "In Progress";
btn.style.background = "#00aa55";

});

});