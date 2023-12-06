import { getQuiz } from "./api.js";
import { shuffleArray } from "./utils.js";

const NEXT_QUESTION_SHIFT_DELAY = 300;

let ANSWER_LABEL = "answer__label";
let ANSWER_LABEL_RIGHT = "answer__label_right";
let ANSWER_LABEL_WRONG = "answer__label_wrong";
let score = 0;
let quizzes = [];
let players = [];
let scoreFormEl;
let quizEl;
let currentQuiz;

await main();

async function main() {
  quizzes = await getQuiz();
  players = JSON.parse(localStorage.getItem("nameData")) || [];
  scoreFormEl = document.querySelector("#form-name");
  quizEl = document.querySelector("#quiz");
  shiftQuiz();
}

function shiftQuiz() {
  let questionNumber = 10 - quizzes.length;
  currentQuiz = quizzes.shift();
  renderQuiz(currentQuiz, questionNumber);
}

function renderQuiz(quiz, questionNumber) {
  renderQuestion(quizEl, quiz, questionNumber);

  let fieldSetEl = document.createElement("fieldset");
  fieldSetEl.classList.add("answers");
  fieldSetEl.addEventListener("click", clickAnswerHandler);
  quizEl.append(fieldSetEl);

  let answers = assembleAnswers(quiz);

  for (let i = 0; i < answers.length; i++) {
    let answer = answers[i];
    let id = `answer_${i}`;
    renderAnswer(fieldSetEl, answer, id);
  }
}

function renderQuestion(quizEl, quiz, questionNumber) {
  let questionEl = document.createElement("div");
  questionEl.classList.add("Quizquestions");
  questionEl.innerText = `Question ${questionNumber + 1}: ${quiz.question}`;
  quizEl.append(questionEl);
}

function clickAnswerHandler(e) {
  let value = e.target.value;
  if (!value) return;

  let answers = document.querySelectorAll(`.${ANSWER_LABEL}`);
  for (let answer of answers) {
    answer.classList.remove(ANSWER_LABEL_RIGHT, ANSWER_LABEL_WRONG);
  }

  let labelEl = document.querySelector(`label[for=${e.target.id}]`);
  if (currentQuiz.correct_answer === value) {
    score += 1;
    labelEl.classList.add(ANSWER_LABEL_RIGHT);
  } else {
    labelEl.classList.add(ANSWER_LABEL_WRONG);
  }

  setTimeout(renderNextQuiz, NEXT_QUESTION_SHIFT_DELAY);
}

function renderNextQuiz() {
  quizEl.innerHTML = "";

  if (quizzes.length === 0) {
    scoreFormEl.style.display = "flex";
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
  labelEl.classList.add(ANSWER_LABEL);
  labelEl.htmlFor = id;
  labelEl.innerText = answer;

  fieldSetEl.append(answerEl, labelEl);
}

scoreFormEl.addEventListener("submit", scoreFormSubmitHandler);

function scoreFormSubmitHandler(e) {
  e.preventDefault();

  let name = document.querySelector("#Name");
  players.push({
    name: name.value || "Anonymous",
    score: score,
  });
  localStorage.setItem("nameData", JSON.stringify(players));

  window.location.href = "./index.html";
}
