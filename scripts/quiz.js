"use strict";

let Url = "https://opentdb.com/api.php?amount=10";
async function getData() {
  let res = await fetch(Url);
  let data = await res.json();
  return data.results;
}

let Questions = await getData();
console.log(Questions);
