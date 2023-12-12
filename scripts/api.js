import { presetDataSet } from "./dataset.js";

const IN_DEVELOPMENT = true;

export async function getQuiz() {
  let url =
    "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple";
  let response = await fetch(url);
  let data = await response.json();
  const result = decode(data.results || await presetDataSet());
  return result;
}

function decode(dataset) {
  let result = dataset.map(function (data) {
    data.question = decodeHtmlEntities(data.question);
    data.correct_answer = decodeHtmlEntities(data.correct_answer);
    let incorrectAnswers = data.incorrect_answers.map(function (answer) {
      return decodeHtmlEntities(answer);
    });
    data.incorrect_answers = incorrectAnswers;
    return data;
  });
  return result;
}

function decodeHtmlEntities(html) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(html, "text/html");
  return doc.documentElement.textContent;
}
