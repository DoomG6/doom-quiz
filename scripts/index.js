function renderRank() {
  let players = JSON.parse(localStorage.getItem("nameData")) || [];
  let scoreGreaterThan3 = players.filter(function (player) {
    return player.score >= 3;
  });
  let topTen = scoreGreaterThan3.sort((a, z) => z.score - a.score).slice(0, 10);

  let rank = document.querySelector("#rank");

  for (let player of topTen) {
    let bar = document.createElement("div");
    bar.setAttribute("owner", player.name);
    bar.classList.add("rank__bar");
    console.log(player.score / 10);
    bar.style.height = `${(player.score / 10) * 100}%`;
    rank.append(bar);
  }

  if (topTen.length === 0) {
    let placeholder = document.createElement("div");
    placeholder.innerText = "No data here";
    rank.append(placeholder);
  } else {
  }
}

renderRank();

let welcomeBtnEl = document.querySelector("#welcome-button");
welcomeBtnEl.addEventListener("click", function () {
  welcomeBtnEl.classList.add("animate__flash");
  console.log(welcomeBtnEl.classList);
  let audio = new Audio("./dramatic-sound.mp3");

  audio.addEventListener("ended", function () {
    let quizUrl = "./quiz.html";
    location.href = quizUrl;
  });

  audio.play();
});
