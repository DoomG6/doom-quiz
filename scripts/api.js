import { presetDataSet } from "./dataset.js";
const IN_DEVELOPMENT = true;

export async function getQuestions() {
  let url = "https://opentdb.com/api.php?amount=10";
  let response = IN_DEVELOPMENT ? await presetDataSet() : await fetch(url);
  let data = await response.json();
  return data.results || [];
}
