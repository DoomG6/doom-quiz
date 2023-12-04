"use strict";

import { presetDataSet } from "./dataset.js";
import { shuffleArray } from "./utils.js";

const IN_DEVELOPMENT = true;

let Url = "https://opentdb.com/api.php?amount=10";
async function getData() {
  let res = IN_DEVELOPMENT ? await presetDataSet() : await fetch(Url);
  let data = await res.json();
  return data.results;
}

let Questions = await getData();
console.log(Questions);
let currentQuestion = renderQuestion(Questions.shift());

let Score = 0;

function clickAnswerHandler(e) {
  let value = e.target.value;
  if (!value) return;
  console.log({ value });
  if (currentQuestion.correct_answer === value) {
    console.log(`You choose the right one: ${value}`);
     Score +=1;
  } else {
    console.log(`Sorry, that's wrong`);
  }
  document.querySelector("#quiz").innerHTML = "";
  if (Questions.length === 0) {
    let formName = document.querySelector("#form-name");
    formName.style.display = "block";
    console.log(Score);
  } else {
    currentQuestion = renderQuestion(Questions.shift());
  }
}

let formName = document.querySelector("#form-name");
formName.addEventListener("submit",function(e){
  e.preventDefault();
  let Name = document.querySelector("#Name");
  console.log(Name.value,Score)
  window.location.href="./index.html";
});









function renderQuestion(question) {
  let QuestionEl = document.createElement("div");
  QuestionEl.classList.add("Quizquestions");
  QuestionEl.innerText = question.question;
  let quizEl = document.querySelector("#quiz");
  quizEl.append(QuestionEl);

  let answers = [];
  answers.push(question.correct_answer);
  for (let i = 0; i < question.incorrect_answers.length; i++) {
    answers.push(question.incorrect_answers[i]);
  }
  answers = shuffleArray(answers);

  let fieldSetEl = document.createElement("fieldset");
  fieldSetEl.addEventListener("click", clickAnswerHandler);
  quizEl.append(fieldSetEl);

  for (let i = 0; i < answers.length; i++) {
    let answer = answers[i];
    let id = `answer_${i}`;

    let AnswerEl = document.createElement("input");
    AnswerEl.classList.add();
    AnswerEl.type = "radio";
    AnswerEl.id = id;
    AnswerEl.name = "quiz";
    AnswerEl.value = answer;

    let labelEl = document.createElement("label");
    labelEl.htmlFor = id;
    labelEl.innerText = answer;
    fieldSetEl.append(AnswerEl, labelEl);
  }

  return question;
}
