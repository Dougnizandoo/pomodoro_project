
// function helper ----------------------------------------
function updateTimer(){
    timer_min.textContent = String(min_remain).padStart(2, "0");
    timer_sec.textContent = String(secs_remain).padStart(2, "0");
}

function updateMessageNColor(color=0){
    switch (color) {
        case 1:
            span_msg.textContent = "Running Pomodoro."
            span_msg.style.color = "rgb(11, 102, 35)";
            main_body.style.background = "rgba(11, 102, 35, 0.4)";
            break;
    
        case 2:
            span_msg.textContent = "Pomodoro Paused."
            span_msg.style.color = "rgb(208, 3, 3)"
            main_body.style.background = "rgba(208, 3, 3, 0.4)";
            break;
        
        case 3:
            span_msg.textContent = "Break Time! Good job! :)";
            span_msg.style.color = "rgb(255, 195, 11)"
            main_body.style.background = "rgba(255, 195, 11, 0.4)";
            break;

        default:
            span_msg.textContent = "Waiting for Start."
            span_msg.style.color = "rgb(255, 195, 11)"
            main_body.style.background = "rgba(238, 238, 238, 0.4)";
            break;
    }
}


// functions handlers ------------------------------------
function toggleStart(){
    if (is_running === false){
        btn_control.textContent = "Pause";
        btn_reset.removeAttribute("disabled");
        if (break_time !== true){
            updateMessageNColor(1);
        } else{
            updateMessageNColor(3);
        }
        is_running = true;
    } else {
        btn_control.textContent = "Start";
        updateMessageNColor(2);
        is_running = false;
    }
}


function reset(){
    btn_control.textContent = "Start";
    btn_reset.setAttribute("disabled", true);
    min_remain = 30;
    secs_remain = 0;
    is_running = false;
    break_time = false;
    updateTimer();
    updateMessageNColor(0);
}


function clocksTick() {
    if (!is_running) return;

    if (min_remain === 0 && secs_remain === 0) {
        break_time = !break_time;
        if (break_time === true){
            min_remain = 5;
            secs_remain = 0;
            is_running = true;
            updateTimer();
            updateMessageNColor(3);
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

    updateTimer();
}


// main code
// DOM elements ---------------------------------------------
const btn_control = document.getElementById("btn-control");
const btn_reset = document.getElementById("btn-reset");
const timer_min = document.getElementById("timer-minutes");
const timer_sec = document.getElementById("timer-seconds");
const span_msg = document.getElementById("status-msg");
const main_body = document.getElementById("main-body");

// state -----------------------------------------------------
let is_running = false;
let break_time = false;
let min_remain = 30;
let secs_remain = 0;

// start code
btn_reset.setAttribute("disabled", true);
reset();
updateTimer();

btn_control.addEventListener("click", toggleStart);
btn_reset.addEventListener("click", reset);


setInterval(clocksTick, 1000);
