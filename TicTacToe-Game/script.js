const game = document.querySelector('.game');
const divContainer = document.querySelector('.container');
let turnO = true;
const winningPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

// reset game function
function gameReset(){
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.textContent = '';
        box.disabled = false;
    });
    const winner = document.querySelector('h2');
    if(winner){
        document.body.querySelector('main').removeChild(winner);
    }
    turnO = true;
}

// check winner
function checkWinner(e){
    const boxes = document.querySelectorAll('.box');
    // const bValues = boxes.map((box) => box.innerText);
    winningPattern.forEach((pattern) => {
        const val1 = boxes[pattern[0]].textContent;
        const val2 = boxes[pattern[1]].textContent;
        const val3 = boxes[pattern[2]].textContent;
        if(val1 !== '' && val2 !== '' && val3 !== ''){
            if (val1 === val2 && val1 === val3){
                const winner = document.createElement('h2');
                winner.textContent = `Congratulations ${e.target.innerText} is Winner`;
                document.querySelector('h1').insertAdjacentElement('afterend', winner);
                boxes.forEach((box) => box.disabled = true);
            }
        }
    });

}

// game buttons
for(let i=0;i<9;i++){
    const box = document.createElement('button');
    box.className = 'box';
    box.textContent = '';
    game.appendChild(box);
}

// reset Game Button
const resetButton = document.createElement('button');
resetButton.id = 'reset-btn';
resetButton.textContent = 'Reset Game';
document.body.querySelector('main').appendChild(resetButton);


// events
resetButton.addEventListener('click', gameReset);

const boxes = document.querySelectorAll('.box');
boxes.forEach((box) => {
    box.addEventListener('click', (e) => {
        if(turnO){
            box.innerText = 'O';
            turnO = false;
            box.style.color = 'blue';
        }
        else{
            box.innerText = 'X';
            turnO = true;
            box.style.color = 'red';
        }
        box.disabled = true;
        checkWinner(e);
    });
});