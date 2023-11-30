"use strict";

let Url = "https://opentdb.com/api.php?amount=10";
async function getData() {
  let res = await fetch(Url);
  let data = await res.json();
  return data.results;
}

let Questions = await getData();
console.log(Questions);
renderQuestion(Questions[0]);

function renderQuestion(question) {
  let QuestionEl = document.createElement("div");
  QuestionEl.classList.add("Quizquestions");
  QuestionEl.innerText = question.question;
  let quizEl = document.querySelector("#quiz");
  quizEl.append(QuestionEl);
}
