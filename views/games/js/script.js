//Variables
const rock_player1 = document.getElementById('rock-player1');
const paper_player1 = document.getElementById('paper-player1');
const scissors_player1 = document.getElementById('scissors-player1');
const rock_player2 = document.getElementById('rock-player2');
const paper_player2 = document.getElementById('paper-player2');
const scissors_player2 = document.getElementById('scissors-player2');
const result = document.getElementById('result');
const reset = document.getElementById("reset");


class Player {
    constructor(id, name, type) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.score = 0;
        this.choice = null;
    }
}

class computerPlayer extends Player {
    randomPick(x) {
      this.choice = 1 +  Math.floor(Math.random() * x);

      switch(this.choice){
        case 1:
          rock_player2.classList.add("active_choice");
          break;
        case 2:
          paper_player2.classList.add("active_choice");
          break;
        case 3:
          scissors_player2.classList.add("active_choice");
          break;
        default:
          break;
      }
  }
}

const choices = [
    {id: 0, name: null},
    {id: 1, name: 'Batu'},
    {id: 2, name: 'Kertas'},
    {id: 3, name: 'Gunting'}
]

function showResult(x){
  switch(x){
    case 0:
        // Update screen for DRAW
        console.log("It's a Draw");
        result.innerHTML = "DRAW";
        result.style.backgroundColor = "grey";
      break;
    case 1:
        // Update screen for Player 1 wins
        console.log("Player 1 Wins");
        result.innerHTML = "Player 1 wins";
        result.style.backgroundColor = "yellow";
    break;
    case 2:
        // Update screen for Player 2 wins
        console.log("Player 2 Wins");
        result.innerHTML = "COM wins";
        result.style.backgroundColor = "lime";
      break;
    default:
      break;
  }
  result.classList.add("versus-result");

}

function match(p1, p2){

    console.log("Player 1: ", choices[p1.choice].name, " vs ","Player 2: ", choices[p2.choice].name);

    if (p1.choice==p2.choice) { // DRAW
        showResult(0);
    }  else {
        switch (p1.choice){
            case 1:
                if (p2.choice==2){
                    p2.score++;
                    showResult(2);
                } else {
                    p1.score++;
                    showResult(1);
                }
                break;
            case 2:
                if (p2.choice==1){
                    p1.score++;
                    showResult(1);
                } else {
                    p2.score++;
                    showResult(2);
                }
                break;
            case 3:
                if (p2.choice==1){
                    p1.score++;
                    showResult(2);
                } else {
                    p2.score++;
                    showResult(1);
                }
                break;
            default:
                break;
        }
    }

}

function disableButtons(flag){
      rock_player1.disabled = flag;
      paper_player1.disabled = flag;
      scissors_player1.disabled = flag;
}


function startGame(){


    let player1 = new Player(1, "Human Player", 'human');
    let player2 = new computerPlayer(2, "Computer Player", 'computer');

    rock_player1.onclick = function() {
      disableButtons(true);
      player1.choice = 1;
      rock_player1.classList.add("active_choice");
      player2.randomPick(3);
      match(player1,player2);
    }

    paper_player1.onclick = function() {
        disableButtons(true);
        player1.choice = 2;
        paper_player1.classList.add("active_choice");
        player2.randomPick(3);
        match(player1,player2);
    }
    
    scissors_player1.onclick = function() {
        disableButtons(true);
        player1.choice = 3;
        scissors_player1.classList.add("active_choice");
        player2.randomPick(3);
        match(player1,player2);
    }

    // What do we do when reset button is clicked?
    function resetGame() {
      rock_player1.classList.remove("active_choice");
      paper_player1.classList.remove("active_choice");
      scissors_player1.classList.remove("active_choice");
      rock_player2.classList.remove("active_choice");
      paper_player2.classList.remove("active_choice");
      scissors_player2.classList.remove("active_choice");
      disableButtons(false);
      player1.choice = null;
      player2.choice = null;
      result.classList.remove("versus-result");
      result.innerHTML = "VS";
      result.style.backgroundColor = "transparent";
    }
    
    reset.onclick = resetGame;
}


startGame()