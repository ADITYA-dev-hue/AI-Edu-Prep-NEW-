/* =========================
   ANALYTICS ENGINE
========================= */

window.addEventListener(
"DOMContentLoaded",
function(){

loadAnalytics();

});

/* =========================
   MAIN LOAD
========================= */

function loadAnalytics(){

const stats =
getStats();

setValue("minutes", stats.minutes);
setValue("accuracy", stats.accuracy + "%");
setValue("score", stats.score);
setValue("topics", stats.topics);

animateNumber("minutes", stats.minutes);
animatePercent("accuracy", stats.accuracy);
animateNumber("score", stats.score);
animateNumber("topics", stats.topics);

}

/* =========================
   GET DATA
========================= */

function getStats(){

const history = JSON.parse(
localStorage.getItem("eduprepChatHistory")
) || [];

const solvedTopics = JSON.parse(
localStorage.getItem("eduprepTopicsDone")
) || [];

const totalMsgs = history.length;

/* estimated minutes */
const minutes =
Math.max(
124,
totalMsgs * 6
);

/* prompt score */
const score =
Math.min(
98,
80 + Math.floor(totalMsgs / 2)
);

/* accuracy */
const accuracy =
Math.min(
97,
85 + Math.floor(totalMsgs / 3)
);

/* topics */
const topics =
Math.max(
17,
solvedTopics.length
);

return {
minutes,
score,
accuracy,
topics
};

}

/* =========================
   HELPERS
========================= */

function setValue(id,val){

const el =
document.getElementById(id);

if(el) el.innerText = val;

}

function animateNumber(id,target){

const el =
document.getElementById(id);

if(!el) return;

let count = 0;

const speed =
Math.max(10, target / 35);

const timer =
setInterval(() => {

count += Math.ceil(speed);

if(count >= target){
count = target;
clearInterval(timer);
}

el.innerText = count;

},25);

}

function animatePercent(id,target){

const el =
document.getElementById(id);

if(!el) return;

let count = 0;

const timer =
setInterval(() => {

count += 2;

if(count >= target){
count = target;
clearInterval(timer);
}

el.innerText = count + "%";

},25);

}