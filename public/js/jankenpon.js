// Jankenpon
const statutJankenpon = document.querySelector(".statutJankenpon")
const buttonsJankenpon = document.getElementsByClassName('btnJankenpon')
const jankenponPlayer = document.getElementsByClassName('JankenponPlayer')
const jankenponIA = document.getElementsByClassName('JankenponIA')
const versus = document.getElementById('versus')
const nameJankenpon =  document.getElementsByClassName('nameJankenpon')

let random
let img
let gameOnJankenpon = false
let playerChoice = ""
let winJankenpon = ""
const drawJankenpon = () =>"Égalité"
const choiceJankenpon = () => "Veuillez choisir une action"

document.querySelectorAll('.btnJankenpon').forEach(clicButton=> clicButton.addEventListener("click", JankenponStart))
document.querySelector(".resetJankenpon").addEventListener("click", gameReset)

function JankenponStart(){
    while(playerChoice !== "pierre" || playerChoice !=="feuille" || playerChoice == "ciseaux"){
        playerChoice = this.value
        img
        if (playerChoice === "pierre") {
            img = 0
        }else if (playerChoice === "feuille") {
            img = 1
        } else {
            img = 2
        }

        if(playerChoice == "pierre" || playerChoice == "feuille" || playerChoice == "ciseaux"){
            gameOnJankenpon = true
            for (var i = 0; i < buttonsJankenpon.length; i++) {
                buttonsJankenpon[i].style.display = "none";
            }
            for (var i = 0; i < nameJankenpon.length; i++) {
                nameJankenpon[i].style.display = "block";
            }
            jankenponPlayer[img].style.display = "inline"
            versus.style.display = "inline"
            IA()
            JankenponWin(img,random)
            return playerChoice, gameOnJankenpon
        }
    }
}
function IA() {
    random =  Math.floor(Math.random() * Math.floor(3))
    jankenponIA[random].style.display = "inline"
    return random
}

function JankenponWin(player,ia) {
    if (player === ia ) {
        statutJankenpon.innerHTML = drawJankenpon()
    } else {
        if (player === 0) {
            switch(ia)
            {
                case 1 : {
                    statutJankenpon.innerHTML = "L'IA a gagné la partie"
                    break
                }
                case 2 : {
                    statutJankenpon.innerHTML = "Le joueur a gagné la partie"
                    break
                }
            }  
        } else if (player === 1) {
            switch(ia)
            {
                case 0 : {
                    statutJankenpon.innerHTML = "Le joueur a gagné la partie"
                    break
                }
                case 2 : {
                    statutJankenpon.innerHTML = "L'IA a gagné la partie"
                    break
                }
            }   
        } else {
            switch(ia)
            {
                case 0 : {
                    statutJankenpon.innerHTML = "L'IA a gagné la partie"
                    break
                }
                case 1 : {
                    statutJankenpon.innerHTML = "Le joueur a gagné la partie"
                }
            }  
        }
        return statutJankenpon
    }
}

function gameReset(){
    for (var i = 0; i < buttonsJankenpon.length; i++) {
        buttonsJankenpon[i].style.display = "inline";
    }
    for (var i = 0; i < nameJankenpon.length; i++) {
        nameJankenpon[i].style.display = "none";
    }
    jankenponPlayer[img].style.display = "none"
    versus.style.display = "none"
    jankenponIA[random].style.display = "none"
    img = ""
    gameOnJankenpon = false
    random = ""
    playerChoice = ""
    statutJankenpon.innerHTML = ""
}

function jankenponClosed(){
    if(gameOnJankenpon === true){
        for (var i = 0; i < buttonsJankenpon.length; i++) {
            buttonsJankenpon[i].style.display = "inline";
        }
        for (var i = 0; i < nameJankenpon.length; i++) {
            nameJankenpon[i].style.display = "none";
        }
        jankenponPlayer[img].style.display = "none"
        versus.style.display = "none"
        jankenponIA[random].style.display = "none"
        img = ""
        gameOnJankenpon = false
        random = ""
        playerChoice = ""
        statutJankenpon.innerHTML = ""
    }
    else{

    }
}