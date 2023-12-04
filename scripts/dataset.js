import { shuffleArray } from "./utils.js";

const questions = [
  {
    type: "multiple",
    difficulty: "medium",
    category: "Entertainment: Video Games",
    question: "Who was Tetris created by?",
    correct_answer: "Alexey Pajitnov",
    incorrect_answers: ["Toru Iwatani", "Allan Alcorn", "William Higinbotham"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Entertainment: Japanese Anime &amp; Manga",
    question:
      "The two main characters of &quot;No Game No Life&quot;, Sora and Shiro, together go by what name?",
    correct_answer: "Blank",
    incorrect_answers: ["Immanity", "Disboard", "Warbeasts"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Entertainment: Music",
    question:
      "In Kendrick Lamar&#039;s 2012 album, &quot;Good Kid, M.A.A.D City&quot;, the album&#039;s story takes place in which city?",
    correct_answer: "Compton",
    incorrect_answers: ["Detroit", "New York", "Baltimore"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "General Knowledge",
    question: "Nephelococcygia is the practice of doing what?",
    correct_answer: "Finding shapes in clouds",
    incorrect_answers: [
      "Sleeping with your eyes open",
      "Breaking glass with your voice",
      "Swimming in freezing water",
    ],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Geography",
    question:
      "The towns of Brugelette, Arlon and Ath are located in which country?",
    correct_answer: "Belgium",
    incorrect_answers: ["Andorra", "France", "Luxembourg"],
  },
  {
    type: "boolean",
    difficulty: "easy",
    category: "Politics",
    question: "The S in Harry S. Truman stands for &quot;Samuel&quot;.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science: Computers",
    question:
      "Nvidia&#039;s headquarters are based in which Silicon Valley city?",
    correct_answer: "Santa Clara",
    incorrect_answers: ["Palo Alto", "Cupertino", "Mountain View"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science &amp; Nature",
    question:
      "This element, when overcome with extreme heat and pressure, creates diamonds.",
    correct_answer: "Carbon",
    incorrect_answers: ["Nitrogen", "Oxygen", "Hydrogen"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Geography",
    question:
      "The prefix Sino- (As in Sino-American) is used to refer to what nationality?",
    correct_answer: "Chinese",
    incorrect_answers: ["Japanese", "Russian", "Indian"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Sports",
    question: "Which country is hosting the 2022 FIFA World Cup?",
    correct_answer: "Qatar",
    incorrect_answers: ["Uganda", "Vietnam", "Bolivia"],
  },
];

export async function presetDataSet() {
  return {
    json: async function () {
      return { results: shuffleArray(questions) };
    },
  };
}
