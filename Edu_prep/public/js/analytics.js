fetch("/api/analytics")
.then(res => res.json())
.then(data => {

document.getElementById("minutes").innerText =
data.studyMinutes;

document.getElementById("score").innerText =
data.promptScore;

document.getElementById("accuracy").innerText =
data.accuracy + "%";

document.getElementById("topics").innerText =
data.topicsCompleted;

});