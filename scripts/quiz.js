"use strict";

import { presetDataSet } from "./dataset.js";

const IN_DEVELOPMENT = true;

let Url = "https://opentdb.com/api.php?amount=10";
async function getData() {
  let res = IN_DEVELOPMENT ? await presetDataSet() : await fetch(Url);
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
  let AnswerEl = document.createElement("input")
  AnswerEl.classList.add()
  AnswerEl.type="radio";
  AnswerEl.id="Answer1"
  let labelEl = document.createElement("label");
  labelEl.for="Answer1";
  labelEl.innerText = question.incorrect_answers[0];
  quizEl.append(AnswerEl,labelEl);
}
