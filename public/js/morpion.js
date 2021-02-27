// Morpion
const statut = document.querySelector("h2")
let gameOn = true
let playerOn = "X"
const winRule = [
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

const win = () => "Le joueur ${playerOn} a gagné"
const draw = () =>"Egalité"
const playerTurn = () => "C'est au tour du joueur ${playerOn}"

statut.innerHTML = playerTurn()
document.querySelectorAll(".case").foreach(cell=> cell.addEventListener("click", gestionCase))
document.querySelectorAll(".gameReset").foreach(cell=> cell.addEventListener("click", gameReset))


