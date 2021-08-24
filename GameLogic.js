const bushes = document.querySelectorAll('.bush');
const scoreBoard = document.querySelector('.score');
const dinos = document.querySelectorAll('.dino');
let bushes_length = bushes.length;
let lastBush;
let timeUp;
let score = 0;
var timeLeft;
var audioURL = new Audio("ouch.mp3");
var min_time;
var max_time;

function playAudio() {
    audioURL.currentTime = 0;
    audioURL.play();
    audioURL.volume = 0.3;
  }

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomBush(bushes){
    const index = Math.floor(Math.random() * bushes_length);
    const bush = bushes[index];
    if(bush === lastBush){
        return randomBush(bushes);
    }
    lastBush = bush;
    return bush;
}

function peep() {
    const time = randomTime(min_time, max_time);
    const bush = randomBush(bushes);
    bush.classList.add('up');
    setTimeout(() => {
        bush.classList.remove('up');
        if(!timeUp) peep();
        if(!timeUp) {
            document.getElementById("btnStart").style.visibility = "hidden";
        } else {
            document.getElementById("btnStart").style.visibility = "visible";
        }
    }, time);  
}
function pro() {
    min_time = 400;
    max_time = 800;
    document.getElementById("pro").style.fontFamily = "JFRockSol";
    document.getElementById("noob").style.fontFamily = "JFRockOutCrop";
}
 
function noob() {
    min_time = 600;
    max_time = 1000;
    document.getElementById("noob").style.fontFamily = "JFRockSol";
    document.getElementById("pro").style.fontFamily = "JFRockOutCrop";
}
function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000);
}

function bang(e) {
    if(!e.isTrusted) return;
    playAudio();
    score++;
    this.parentNode.classList.remove('up'); 
    scoreBoard.textContent = score;
}

dinos.forEach(dino => dino.addEventListener('click', bang));

