let score = 0;
let timer = 1;
let hit = 60;

function makeBubble() {
  let bubble_addition = "";
  for (let i = 1; i <= 140; i++) {
    bubble_addition += `<div class="bubble">${Math.floor(
      Math.random() * 10
    )}</div>`;
  }

  document.getElementById("panel_bottom").innerHTML = bubble_addition;
  Math.floor(Math.random() * 10);
}

function runTimer() {
  interval_Id = setInterval(function () {
    if (timer > 0) {
      timer--;
      document.getElementById("timer_var").textContent = timer;
    } else {
      document.getElementById("hit_val").innerText = "--";
      document.getElementById("panel_bottom").innerHTML = `<h1 id="game_over" style = " position:absolute ; top:50% ; text-align: center;" >Game Over <br>Your Score is ${score}</h1>`;
      console.log()
      clearInterval(interval_Id);

      const btn = document.createElement("button");
      btn.innerText = "Submit ";
      btn.classList.add("my_submit_btn");
      document.querySelector("#panel_bottom").appendChild(btn);

      const submit = document.querySelector(".my_submit_btn");
      // submit.style = "background-color:red";
      submit.addEventListener("click", addPlayer);
    }
  }, 1000);
}

let player_array = [];

let curr_name = "";

function addPlayer() {
  player_array = getLeaderboardCookie().cookieArray;
  console.log("get cookie krne k baad player array : ", player_array);

  if (!player_array) {
    player_array = [];
  }

  console.log("ekdum bahar ", player_array);

  document.querySelector(".my_submit_btn").remove();

  curr_name = document.querySelector("#player_name").value.trim();

  timer = 60;
  document.querySelector("#timer_var").innerText = timer;

  console.log(curr_name);
  if (curr_name != "") {
    console.log("player array ki value push krne se pehle ", player_array);
    let player_array_object = {
      curr_name: curr_name,
      score: score,
    };
    console.log(player_array_object);
    player_array.push(player_array_object);
    console.log("push krne k baad ", player_array);
    
    updateLeaderBoard();
    setLeaderboardCookie();
    
  }
  score = 0;
  document.querySelector("#player_name").value = "";
  document.querySelector("#score_val").innerText = 0;
}

function updateLeaderBoard() {
  let leaderboardList = document.querySelector("#leaderboard");

  let child = leaderboardList.lastElementChild;

  while (child) {
    leaderboardList.removeChild(child);
    child = leaderboardList.lastElementChild;
  }

  player_array.sort((a, b) => b?.score - a?.score);
  player_array.forEach((player) => {
    let userDetail = document.createElement("div");
    let userName = document.createElement("div");
    let User_score = document.createElement("div");

    userDetail.classList.add("userDetail")

    userName.textContent = player.curr_name;
    User_score.textContent = player.score;

    console.log(userDetail.appendChild(userName));
    userDetail.appendChild(User_score);
    console.log(userName.value);
    leaderboardList.appendChild(userDetail);
  });
}

function get_new_hit() {
  hit = Math.floor(Math.random() * 10);
  document.getElementById("hit_val").innerText = hit;
}

function increaseScore() {
  score += 10;
  document.getElementById("score_val").innerText = score;
}

function setLeaderboardCookie() {
  const cookieArray = player_array  ;
  console.log(player_array);
  const leaderboardData = JSON.stringify({ cookieArray });
  document.cookie = `leaderboard=${encodeURIComponent(
    leaderboardData
  )}; path=/`;

}


function getLeaderboardCookie() {
  const cookieName = "leaderboard=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieData = decodedCookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith(cookieName));
  if (cookieData) {
    const leaderboardData = JSON.parse(cookieData.substring(cookieName.length));
    console.log(leaderboardData);
    return leaderboardData;
  }
  return null;
}

function play_game() {
  document
    .querySelector("#start_button")
    .addEventListener("click", function (e) {
      let name_val = document.querySelector("#player_name");

      if (name_val.value !== "") {

        get_new_hit();
        makeBubble();
        runTimer();

        document
          .querySelector("#panel_bottom")
          .addEventListener("click", function (e) {
            let clicked_number = Number(e.target.textContent);
            if (clicked_number == hit) {
              makeBubble();
              get_new_hit();
              increaseScore();
            }
          });
      } else {
        alert("Enter Player Name");
      }
    });
}

play_game();


function randomColor() {
  // Generate a random RGB color
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Increase the brightness of the color by 50%
  const lighterR = Math.floor((r + 255) / 2);
  const lighterG = Math.floor((g + 255) / 2);
  const lighterB = Math.floor((b + 255) / 2);

  // Convert the lighter RGB values to hexadecimal
  const lighterRHex = lighterR.toString(16).padStart(2, '0');
  const lighterGHex = lighterG.toString(16).padStart(2, '0');
  const lighterBHex = lighterB.toString(16).padStart(2, '0');

  // Combine the hexadecimal values into a color string
  const lighterColor = `#${lighterRHex}${lighterGHex}${lighterBHex}`;

  return lighterColor;
}