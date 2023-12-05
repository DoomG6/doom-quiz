"use strict";
import { getQuestions } from "./api.js";
import { shuffleArray } from "./utils.js";

const NEXT_QUESTION_SHIFT_DELAY = 300;

let score = 0;
let questions = [];
let players = [];
let scoreForm;
let currentQuestion;

await main();

async function main() {
  questions = await getQuestions();
  players = JSON.parse(localStorage.getItem("nameData")) || [];
  scoreForm = document.querySelector("#form-name");
  shiftQuestion();
}

function shiftQuestion() {
  currentQuestion = questions.shift();
  renderQuestion(currentQuestion);
}

function renderNextQuestion() {
  document.querySelector("#quiz").innerHTML = "";

  if (questions.length === 0) {
    scoreForm.style.display = "block";
    let playerScore = document.querySelector("#score__yours");
    playerScore.innerText = score;
  } else {
    shiftQuestion();
  }
}

function clickAnswerHandler(e) {
  let value = e.target.value;
  if (!value) return;

  if (currentQuestion.correct_answer === value) {
    score += 1;
  } else {
    // TODO: do the wrong answer style attach here
    console.log(`Sorry, that's wrong`);
  }

  setTimeout(renderNextQuestion, NEXT_QUESTION_SHIFT_DELAY);
}

function scoreFormSubmitHandler(e) {
  e.preventDefault();

  let name = document.querySelector("#Name");
  players.push({
    name: name.value,
    score: score,
  });
  localStorage.setItem("nameData", JSON.stringify(players));
  window.location.href = "./index.html";
}

scoreForm.addEventListener("submit", scoreFormSubmitHandler);

function renderQuestion(question) {
  let questionEl = document.createElement("div");
  questionEl.classList.add("Quizquestions");
  questionEl.innerText = question.question;
  let quizEl = document.querySelector("#quiz");
  quizEl.append(questionEl);

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

    let answerEl = document.createElement("input");
    answerEl.classList.add();
    answerEl.type = "radio";
    answerEl.id = id;
    answerEl.name = "quiz";
    answerEl.value = answer;

    let labelEl = document.createElement("label");
    labelEl.htmlFor = id;
    labelEl.innerText = answer;
    fieldSetEl.append(answerEl, labelEl);
  }
}
