"use strict";
import { getQuiz } from "./api.js";
import { shuffleArray } from "./utils.js";

const NEXT_QUESTION_SHIFT_DELAY = 300;

let score = 0;
let quizzes = [];
let players = [];
let scoreFormEl;
let currentQuiz;

await main();

async function main() {
  quizzes = await getQuiz();
  players = JSON.parse(localStorage.getItem("nameData")) || [];
  scoreFormEl = document.querySelector("#form-name");
  shiftQuiz();
}

function shiftQuiz() {
  currentQuiz = quizzes.shift();
  renderQuiz(currentQuiz);
}

function renderQuiz(quiz) {
  let quizEl = document.querySelector("#quiz");

  renderQuestion(quizEl, quiz);

  let fieldSetEl = document.createElement("fieldset");
  fieldSetEl.addEventListener("click", clickAnswerHandler);
  quizEl.append(fieldSetEl);

  let answers = assembleAnswers(quiz);

  for (let i = 0; i < answers.length; i++) {
    let answer = answers[i];
    let id = `answer_${i}`;
    renderAnswer(fieldSetEl, answer, id);
  }
}

function renderQuestion(quizEl, quiz) {
  let questionEl = document.createElement("div");
  questionEl.classList.add("Quizquestions");
  questionEl.innerText = quiz.question;
  quizEl.append(questionEl);
}

function clickAnswerHandler(e) {
  let value = e.target.value;
  if (!value) return;

  if (currentQuiz.correct_answer === value) {
    score += 1;
  } else {
    // TODO: do the wrong answer style attach here
    console.log(`Sorry, that's wrong`);
  }

  setTimeout(renderNextQuiz, NEXT_QUESTION_SHIFT_DELAY);
}

function renderNextQuiz() {
  document.querySelector("#quiz").innerHTML = "";

  if (quizzes.length === 0) {
    scoreFormEl.style.display = "block";
    let playerScore = document.querySelector("#score__yours");
    playerScore.innerText = score;
  } else {
    shiftQuiz();
  }
}

function assembleAnswers(quiz) {
  let answers = [];
  answers.push(quiz.correct_answer);

  for (let i = 0; i < quiz.incorrect_answers.length; i++) {
    answers.push(quiz.incorrect_answers[i]);
  }

  answers = shuffleArray(answers);

  return answers;
}

function renderAnswer(fieldSetEl, answer, id) {
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

scoreFormEl.addEventListener("submit", scoreFormSubmitHandler);

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
