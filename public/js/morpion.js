// Morpion
const statut = document.querySelector(".statut")
let gameOn = false
var playerOn = ""


const winRules = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

let gameState = ["","","","","","","","",""]

const win = () => `Le joueur ${playerOn} a gagné`
const draw = () =>"Égalité"
const playerTurn = () => `C'est au tour du joueur ${playerOn}`

document.querySelector('#titleMorpion').addEventListener("click", gameStart)
document.querySelectorAll(".case").forEach(cell=> cell.addEventListener("click", gestionCase))
document.querySelector(".resetGame").addEventListener("click", gameReset)


function gameStart(){
    while(playerOn !== "X" || playerOn !=="O"){
        playerOn = prompt('Vous voulez les "X" ou les "O" ? Entrez le caractère correspondant en majuscule.')
        if(playerOn == "X" || playerOn == "O"){
            statut.innerHTML = playerTurn()
            gameOn = true
            return playerOn, gameOn
        }
    }
}

function gestionCase(){
    // We get index of the clicked case
    const indexCase = parseInt(this.dataset.index)

    // If the gris is full or the game off
    if(gameState[indexCase] !== "" || !gameOn){
        return
    } else { //else we can play and mark the playercase
        gameState[indexCase] = playerOn
        this.innerHTML = playerOn
        checkWin() // we call the checkWin function to check if we have a winner or not
    }
}

function checkWin(){
    let winTurn = false
    for(let winRule of winRules){
        let val1 = gameState[winRule[0]]
        let val2 = gameState[winRule[1]]
        let val3 = gameState[winRule[2]]
        if(val1 === "" || val2 === "" || val3 === ""){ //If we don't have a win rule we continue the game
            continue
        }
        if(val1 === val2 && val2 === val3){ // if we have a win rule we stop the game and return true
            winTurn = true
            break
        }
    }
    if (winTurn){
        statut.innerHTML = win()
        gameOn = false
        console.log(statut)
        return
    }
    if(!gameState.includes("")){
        statut.innerHTML = draw()
        gameOn = false
        return
    }
    playerOn = playerOn === "X" ? "O" : "X"
    statut.innerHTML = playerTurn()
}
function gameReset(){
    statut.innerHTML = ""
    gameState = ["","","","","","","","",""]
    document.querySelectorAll(".case").forEach(cell=> cell.innerHTML = "")
    gameStart()
}
function gameClosed(){
    statut.innerHTML = ""
    gameState = ["","","","","","","","",""]
    document.querySelectorAll(".case").forEach(cell=> cell.innerHTML = "")
    playerOn = ""
    gameOn = false
}
