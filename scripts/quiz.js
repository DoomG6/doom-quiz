"use strict";

import { presetDataSet } from "./dataset.js";
import { shuffleArray } from "./utils.js";

const IN_DEVELOPMENT = true;

async function getQuestions() {
  let url = "https://opentdb.com/api.php?amount=10";
  let response = IN_DEVELOPMENT ? await presetDataSet() : await fetch(url);
  let data = await response.json();
  return data.results || [];
}

let questions = await getQuestions();
let currentQuestion = renderQuestion(questions.shift());

let score = 0;

function clickAnswerHandler(e) {
  let value = e.target.value;
  if (!value) return;
  if (currentQuestion.correct_answer === value) {
    score += 1;
  } else {
    // TODO: do the wrong answer style attach here
    console.log(`Sorry, that's wrong`);
  }
  document.querySelector("#quiz").innerHTML = "";
  if (questions.length === 0) {
    let formName = document.querySelector("#form-name");
    formName.style.display = "block";
    let yourScore = document.querySelector("#score__yours");
    yourScore.innerText = score;
  } else {
    currentQuestion = renderQuestion(questions.shift());
  }
}

let players = JSON.parse(localStorage.getItem("nameData")) || [];

let formName = document.querySelector("#form-name");
formName.addEventListener("submit", function (e) {
  e.preventDefault();
  let Name = document.querySelector("#Name");
  players.push({
    name: Name.value,
    score: score,
  });
  localStorage.setItem("nameData", JSON.stringify(players));
  window.location.href = "./index.html";
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
