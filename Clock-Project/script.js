// for digital clock
function changeTime(){
    const time = new Date;
    document.querySelector('.clock-hour').textContent = time.getHours();
    document.querySelector('.clock-minute').textContent = time.getMinutes();
    document.querySelector('.clock-second').textContent = time.getSeconds();

}
setInterval(changeTime, 1000);

// for stopwatch
const startStopwatch = document.querySelector('.start-stopwatch');
const stopStopwatch = document.querySelector('.stop-stopwatch');
const resetStopwatch = document.querySelector('.reset-stopwatch');
const hour = document.querySelector('.hour');
const minute = document.querySelector('.minute');
const second = document.querySelector('.second');
const milisecond = document.querySelector('.milisecond');
let stopwatch;
let mili = 0;
let h=0,m=0,s=0;

function change(){
    const time = new Date().getTime();

     mili += 10;
    if(mili === 1000){
        mili = 0;
        s++;
    }
    if(s === 60){
        s = 0;
        m++;
    }
    if(m === 60){
        m = 0;
        h++;
    }
    milisecond.textContent = mili;
    second.textContent = s;
    minute.textContent = m;
    hour.textContent = h;
}

startStopwatch.addEventListener('click' , () => {
    startStopwatch.className = 'start-stopwatch hide';
    stopStopwatch.className = 'stop-stopwatch';
    resetStopwatch.className = 'reset-stopwatch hide';
    stopwatch = setInterval(change,10);
});

stopStopwatch.addEventListener('click',() => {
    startStopwatch.className = 'start-stopwatch';
    resetStopwatch.className = 'reset-stopwatch';
    startStopwatch.innerText = 'Resume';
    stopStopwatch.className = 'stop-stopwatch hide';
    clearTimeout(stopwatch);
});

resetStopwatch.addEventListener('click', () => {
    resetStopwatch.className = 'reset-stopwatch hide';
    startStopwatch.innerText = 'Start';
    mili = 0, s = 0, m = 0, h = 0;
    milisecond.textContent = mili;
    second.textContent = s;
    minute.textContent = m;
    hour.textContent = h;
});

// for timer
const startTimer = document.querySelector('.start-timer');
const pauseTimer = document.querySelector('.pause-timer');
const deleteTimer = document.querySelector('.delete-timer');
const hourTimer = document.querySelector('.timer-hour');
const minuteTimer = document.querySelector('.timer-minute');
const secondTimer = document.querySelector('.timer-second');
let timer;
let hr=0,min=0,sec=0;

function reduceTimer(){
    if(hr===0 && min===0 && sec===0){
        alert('Timer Stopped');
        pauseTimer.click();
        deleteTimer.click();
        return;
    }
    else if(sec === 0){
        min -= 1;
        sec = 60;
    }

    if(min <= 0 && hr !== 0){
        hr -= 1;
        min = 59;
   }
   sec -= 1;
   hourTimer.value = hr;
   minuteTimer.value = min;
   secondTimer.value = sec;
}

startTimer.addEventListener('click', () => {     
    if(hourTimer.value || minuteTimer.value || secondTimer.value){
        hr = Number(hourTimer.value);
        min = Number(minuteTimer.value);
        sec = Number(secondTimer.value);
        hourTimer.disabled = true;
        minuteTimer.disabled = true;
        secondTimer.disabled = true;
        pauseTimer.className = 'pause-timer';
        deleteTimer.className = 'delete-timer';
        startTimer.className = 'start-timer hide';
        timer = setInterval(reduceTimer , 1000);
    }
});   

pauseTimer.addEventListener('click', () => {
    startTimer.className = 'start-timer';
    startTimer.innerText = 'Resume';
    pauseTimer.className = 'pause-timer hide';
    clearInterval(timer);
});

deleteTimer.addEventListener('click', () => {
    startTimer.innerText = 'Start';
    deleteTimer.className = 'delete-timer hide';
    pauseTimer.className = 'pause-timer hide';
    startTimer.className = 'start-timer';
    hourTimer.disabled = false;
    minuteTimer.disabled = false;
    secondTimer.disabled = false;
    hourTimer.value = ' ';
    minuteTimer.value = ' ';
    secondTimer.value = ' ';
});