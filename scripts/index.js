"use strict";

function renderRank() {
  let players = JSON.parse(localStorage.getItem("nameData")) || [];
  if (players.length === 0) {
    let placeholder = document.createElement("div");
    placeholder.innerText = "No data here";
    rank.append(placeholder);
  } else {
    let topTen = players.sort((a, z) => z.score - a.score).slice(0, 10);

    let rank = document.querySelector("#rank");

    for (let player of topTen) {
      let bar = document.createElement("div");
      bar.setAttribute("owner", player.name);
      bar.classList.add("rank__bar");
      console.log(player.score / 10);
      bar.style.height = `${(player.score / 10) * 100}%`;
      rank.append(bar);
    }
  }
}

renderRank();
