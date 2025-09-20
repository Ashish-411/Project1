//----------------------Single Page Application-------------------------
//----------------------Nav bar Functionality-----------------
const button = document.querySelector("nav");
document.addEventListener("DOMContentLoaded",()=>{
    button.addEventListener("click",(event)=>{
        if(event.target.tagName === 'BUTTON')
            {
                const buttonId = event.target.id;
                Switcher(buttonId);
            }
        });   
    });
    //----converts the button id into corresponding container class
    function classConverter(buttonId){
        const buttonClass = `${buttonId}-Watch`;
        return buttonClass;
    }
    //----------------------------------------------------------
    //------switches the active and hidden class of div
    function Switcher(buttonId){
        const Buttons = Array.from(button.children);
        Buttons.forEach((element) => {
            if(element.id === buttonId){
                buttonClass = classConverter(buttonId);
                Selected = document.querySelector(`.${buttonClass}`);
                Selected.classList.remove("hidden");
                Selected.classList.add("active");
            }
            else{
                buttonClass = classConverter(element.id);
                notSelected = document.querySelector(`.${buttonClass}`);
                notSelected.classList.remove("active");
                notSelected.classList.add("hidden");
            }
        });
    }
//-------------------------------------------------------------------------------
//-------------------Analog and Digital Clock------------------------------------
    const hour = document.querySelector(".hour");
    const minute = document.querySelector(".minute");
    const second = document.querySelector(".seconds");
    const digitalHour = document.querySelector(".digitalHour");
    const digitalMinute = document.querySelector(".digitalMinute");
    const digitalSecond = document.querySelector(".digitalSecond");
    setInterval(()=>{
        const currentTime = new Date();
        const currentHours = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();
        const currentSecond = currentTime.getSeconds();
        hrRotation = (360/12)*currentHours + (currentMinute/2);
        minRotation = 6*currentMinute;
        secRotation = 6*currentSecond;
        hour.style.transform = `rotate(${hrRotation}deg)`;
        minute.style.transform = `rotate(${minRotation}deg)`;
        second.style.transform = `rotate(${secRotation}deg)`;
        digitalHour.textContent = currentHours.toString().padStart(2,0);
        digitalMinute.textContent=currentMinute.toString().padStart(2,0);
        digitalSecond.textContent = currentSecond.toString().padStart(2,0);
    },1000);
//--------------------------------------------------------------------------------
//------------------------------------Timer Clock---------------------------------------
    const timer = document.querySelectorAll("input");
    const setButton = document.getElementById("setTimer");
    const timerAudio = new Audio("alarm-301729.mp3");
    
    setButton.addEventListener("click",()=>{
        setInterval(function(){clock()},1000);
    });
    function clock(){
        let min,sec;
        const startTime = new Date().getMilliseconds();
        let timerHour = timer[0];
        let timerMinute = timer[1];
        let timerSecond = timer[2];
        const endTimer = (timerHour.value*3600000) + (timerMinute.value*60000)+(timerSecond.value*1000);
        let timeDiff = (endTimer-startTime)/1000;
        if(timeDiff <= 0)
        {
            timerAudio.play();
            timerHour.value = 0;
            timerMinute.value= 0;
            timerSecond.value= 0;
        }
        else{
            console.log(timeDiff);
            timerHour.value = Math.floor(timeDiff/3600);
            timeDiff = timeDiff%3600;
            min = timeDiff/60;
            timerMinute.value=Math.floor(min);
            timeDiff = timeDiff%60;
            sec = timeDiff;
            timerSecond.value=Math.floor(sec);
        }
    }
//---------------------------------------------------------------------------------
//---------------------------------STOPWATCH----------------------------------------
    const display = document.querySelector(".stopDisplay");
    const start = document.getElementById("start");
    const Stop = document.getElementById("stop");
    const reset = document.getElementById("reset");
    let stopTimer = null;
    let startTime = 0;
    let elaspedTime = 0;
    let isRunning = false;
    start.onclick = function()
    {
        if(!isRunning)
        {
            startTime = Date.now() - elaspedTime;
            stopTimer = setInterval(updateTime,10);
            isRunning = true;
        } 
    }
Stop.onclick = function()
{
    if(isRunning)
    {
        clearInterval(stopTimer);
        elaspedTime = Date.now() - startTime;
        isRunning = false;
    }
}
reset.onclick = function()
{
    clearInterval(stopTimer);
    startTime = 0;
    elaspedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00:00";

}
function updateTime()
{
    const currentTime = Date.now();
    elaspedTime = currentTime - startTime;
    let hours = Math.floor(elaspedTime/(1000*60*60));
    let minutes = Math.floor(elaspedTime/(1000*60) % 60);
    let seconds = Math.floor(elaspedTime/(1000) % 60);
    let milliSeconds = Math.floor(elaspedTime % 100);
    hours = String(hours).padStart(2,"0");
    minutes = String(minutes).padStart(2,"0");
    seconds = String(seconds).padStart(2,"0");
    milliSeconds = String(milliSeconds).padStart(2,"0");
    display.textContent = `${hours}:${minutes}:${seconds}:${milliSeconds}`;
}
//----------------------------------------------------------------------------------
//----------------------------------------------ALARM-------------------------------
    const selectDate = document.getElementById("alarmDate");
    const selectButton = document.getElementById("dateButton");
    const alarmAudio = new Audio("alarm-301729.mp3");
    selectButton.onclick = ()=>{
        const alarmTime = new Date(selectDate.value);
        setInterval(()=>{
            const presentTime = new Date();
            const remainingTime = alarmTime - presentTime;
            if(remainingTime <= 0){
                alarmAudio.play();
            }
        },10);
    }
//----------------------------------------------------------------------------------