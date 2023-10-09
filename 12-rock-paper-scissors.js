const autoPlayBtn = document.querySelector('.autoplay-btn');
const rockMoveEl = document.querySelector('.rock-move-el');
const paperMoveEl = document.querySelector('.paper-move-el');
const scissorsMoveEl = document.querySelector('.scissors-move-el');
const resetBtnEl = document.querySelector('.reset-btn');
const popResetMessageEl = document.querySelector('.pop-reset-message');



let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};
/*
if(!score){
score ={
    wins: 0,
    losses: 0,
    ties: 0
}
}
*/
let isAutoPlaying = false;
let intervalId;

function autoPlay(){
    if(!isAutoPlaying){
        intervalId = setInterval(()=> {
             const computerMove = pickComputerMove();
             playerGame(computerMove);
         },1000);
         isAutoPlaying = true;
         autoPlayBtn.innerHTML = "Stop Play"
     }else{
         clearInterval(intervalId);
         isAutoPlaying = false;
         autoPlayBtn.innerHTML = "Auto Play"
     }
}

    autoPlayBtn.addEventListener('click', ()=>{
        autoPlay();
    })





rockMoveEl.addEventListener('click', ()=>{
    playerGame('rock');
});

paperMoveEl.addEventListener('click', ()=>{
    playerGame('paper');
});

scissorsMoveEl.addEventListener('click', ()=>{
    playerGame('scissors');
});


document.body.addEventListener('keydown', (event)=>{
    if(event.key === 'r'){
        playerGame('rock');
    } else if(event.key === 'p'){
        playerGame('paper');
    } else if(event.key === 's'){
        playerGame('scissors');
    } else if(event.key === 'a'){
        autoPlay();
    } else if(event.key === 'Backspace'){
        if(isAutoPlaying){
            clearInterval(intervalId);
            isAutoPlaying = false;
            autoPlayBtn.innerHTML = "Auto Play"
        }
        showResetConfirmation();
      
       
    }
});




resetBtnEl.addEventListener('click', ()=>{
    showResetConfirmation();
});

function showResetConfirmation(){
    popResetMessageEl.innerHTML = `
    Are you sure you want to reset the score? 
    <button class="js-yes-btn yes-el">
    Yes
    </button> 
    <button class="js-no-btn no-el">
    No
    </button>
    `;

    const confirmYesBtn = document.querySelector('.js-yes-btn');
   const confirmNoBtn = document.querySelector('.js-no-btn');

    confirmYesBtn.addEventListener('click', ()=>{
        resetScore();
        hideResetConfirmation();
    });
    
    confirmNoBtn.addEventListener('click', ()=>{
        hideResetConfirmation();
    });
};






function hideResetConfirmation(){
    popResetMessageEl.innerHTML = '';
};



function playerGame(playerMove){
const computerMove =  pickComputerMove();
let result = '';
if(playerMove === 'rock'){
if(computerMove === 'rock'){
    result = 'Tie'
} else if(computerMove === 'paper'){
    result = 'You Lose'
} else{
    result = 'You Win';
}

} else if(playerMove === 'paper'){
if(computerMove === 'rock'){
    result = 'You Win'
} else if(computerMove === 'paper'){
    result = 'Tie'
} else{
    result = 'You Lose';
}
} else if(playerMove === 'scissors'){
if(computerMove === 'rock'){ 
    result = 'You Lose'
} else if(computerMove === 'paper'){
    result = 'You Win'
} else{
    result = 'Tie';
}
}

if(result ==='You Win'){
    score.wins += 1;
}else if(result === 'You Lose'){
    score.losses += 1;
}else if(result === 'Tie'){
    score.ties += 1;
}

localStorage.setItem('score', JSON.stringify(score));

scoreEl();
 document.querySelector('.js-result').innerHTML = `${result}`;
 document.querySelector('.js-move').innerHTML = `
 You
<img src="${playerMove}-emoji.png" alt="rock" class="move-result">
<img src="${computerMove}-emoji.png" alt="paper" class="move-result">
Computer`;



}   


function scoreEl(){
document.querySelector(".js-score").innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove(){
randomNum = Math.random();
    let computerMove = '';
if(randomNum >= 0 && randomNum < 1/3){
    computerMove  = 'rock'
}else if(randomNum > 1/3 && randomNum < 2/3){
    computerMove  = 'paper'
} else if(randomNum > 2/3 && randomNum < 1){
    computerMove  = 'scissors'
}
 return computerMove;
 }


 function resetScore(){
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        scoreEl();
        document.querySelector('.js-result').innerHTML = '';
        document.querySelector('.js-move').innerHTML = '';
    
    };