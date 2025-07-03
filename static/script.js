
// function helper ----------------------------------------
function updateDisplay(){
    timer_min.textContent = String(min_remain).padStart(2, "0");
    timer_sec.textContent = String(secs_remain).padStart(2, "0");
}


// functions handlers ------------------------------------
function toggleStart(){
    if (is_running === false){
        btn_control.innerText = "Pause";
        btn_reset.removeAttribute("disabled");
        span_msg.innerText = "Running Pomodoro."
        span_msg.style.cssText = "color: rgb(11, 102, 35)"
        is_running = true;
    } else {
        btn_control.innerText = "Start";
        span_msg.innerText = "Pomodoro Paused."
        span_msg.style.cssText = "color: rgb(208, 3, 3)"
        is_running = false;
    }
}


function reset(){
    btn_control.innerText = "Start";
    btn_reset.setAttribute("disabled", true);
    min_remain = 30;
    secs_remain = 0;
    is_running = false;
    break_time = true;
    updateDisplay();
    span_msg.innerText = "Waiting for Start."
    span_msg.style.cssText = "color: rgb(255, 195, 11)"
}


function clocksTick() {
    if (!is_running) return;

    if (min_remain === 0 && secs_remain === 0) {
        if (break_time === true){
            min_remain = 5;
            secs_remain = 0;
            is_running = true;
            span_msg.innerText = "Break Time! Good job! :)";
            span_msg.style.cssText = "color: rgb(255, 195, 11)"
            break_time = false;
            updateDisplay();
            return;
        }

        else{
            reset();
            return;
        }
    }

    if (secs_remain === 0) {
        min_remain--;
        secs_remain = 59;
    } else {
        secs_remain--;
    }

    updateDisplay();
}


// main code
// DOM elements ---------------------------------------------
const btn_control = document.getElementById("btn-control");
const btn_reset = document.getElementById("btn-reset");
const timer_min = document.getElementById("timer-minutes");
const timer_sec = document.getElementById("timer-seconds");
const span_msg = document.getElementById("status-msg");

// state -----------------------------------------------------
let is_running = false;
let break_time = true;
let min_remain = 30;
let secs_remain = 0;

// start code
btn_reset.setAttribute("disabled", true);
reset();
updateDisplay();

btn_control.addEventListener("click", toggleStart);
btn_reset.addEventListener("click", reset);


setInterval(clocksTick, 1000);
