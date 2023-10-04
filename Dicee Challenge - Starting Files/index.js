function getRandomNumber(){
    return Math.floor(Math.random()*(7-1)+1);
}
function rollDice(imageClassName){
    var diceScore = getRandomNumber();
    document.querySelector(imageClassName).setAttribute("src", "./images/dice"+diceScore+".png");
    return diceScore;
}
function displayWinner(player1, player2){

    if(player1>player2){
        document.querySelector("h1").textContent = "Player 1 Wins!";
    }
    else if (player1<player2){
        document.querySelector("h1").textContent = "Player 2 Wins!";
    }
    else{
        document.querySelector("h1").textContent = "Draw"
    }
}

displayWinner(rollDice(".img1"),rollDice(".img2"));

