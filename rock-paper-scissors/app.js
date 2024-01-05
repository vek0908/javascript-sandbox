// Cash

const userScore_p = document.getElementById("user-score");
const computerScore_p = document.getElementById("computer-score");
const userField_div = document.getElementById("user-field");
const result_div = document.getElementById("result");
const computerField_div = document.getElementById("computer-field");
const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissors_div = document.getElementById("scissors");
let userScore = 0;
let computerScore = 0;

// Functionality

function victory() {
  userScore++;
  userScore_p.innerHTML = userScore;
  result_div.classList.add("green-glow");
  setTimeout(function() { result_div.classList.remove("green-glow") }, 1500);
}

function draw() {
  result_div.classList.add("gray-glow");
  setTimeout(function() { result_div.classList.remove("gray-glow") }, 1500);
}

function defeat() {
  computerScore++;
  computerScore_p.innerHTML = computerScore;
  result_div.classList.add("red-glow");
  setTimeout(function() { result_div.classList.remove("red-glow") }, 1500);
}

function displayUserChoice(userChoice) {
  if (userChoice == "rock") {
    userField_div.classList.add("rock");
    setTimeout(function() { userField_div.classList.remove("rock") }, 1500);
  } else if (userChoice == "paper") {
    userField_div.classList.add("paper");
    setTimeout(function() { userField_div.classList.remove("paper") }, 1500);
  } else if (userChoice == "scissors") {
    userField_div.classList.add("scissors");
    setTimeout(function() { userField_div.classList.remove("scissors") }, 1500);
  } else {
    console.log("Make your choice!");
  }
}

function displayComputerChoice(computerChoice) {
  if (computerChoice == "rock") {
    computerField_div.classList.add("rock");
    setTimeout(function() { computerField_div.classList.remove("rock") }, 1500);
  } else if (computerChoice == "paper") {
    computerField_div.classList.add("paper");
    setTimeout(function() { computerField_div.classList.remove("paper") }, 1500);
  } else if (computerChoice == "scissors") {
    computerField_div.classList.add("scissors");
    setTimeout(function() { computerField_div.classList.remove("scissors") }, 1500);
  } else {
    console.log("Computer can't make it's choice for some reason!");
  }
}

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function game(userChoice) {
  const computerChoice = getComputerChoice();
  displayUserChoice(userChoice);
  displayComputerChoice(computerChoice);
  switch(userChoice + computerChoice) {
    case "rockscissors":
    case "paperrock":
    case "scissorspaper":
      victory();
      break;
    case "rockrock":
    case "paperpaper":
    case "scissorsscissors":
      draw();
      break;
    case "rockpaper":
    case "paperscissors":
    case "scissorsrock":
      defeat();
      break;
  }
}

// Input

function main() {
  rock_div.addEventListener("click", function() {
    game("rock");
  })

  paper_div.addEventListener("click", function() {
    game("paper");
  })

  scissors_div.addEventListener("click", function() {
    game("scissors");
  })
}

main();
