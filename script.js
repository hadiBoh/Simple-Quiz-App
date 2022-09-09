function data(){
    return [
        {
            id:1,
            Q:"what does html stands for ?",
            A1:"hyper text multi language",
            A2:"hyper text markup language",
            A3:"hyper text language",
            A4:"hyper text preprocesor",
            A:2
        },
        {
            id:2,
            Q:"which one is javascript ?",
            A1:"print 'hello world'",
            A2:"echo 'hello world'",
            A3:"console.log('hello world')",
            A4:"cout << 'hello world'",
            A:3
        },
        {
            id:3,
            Q:"which one is javascript library ?",
            A1:"React",
            A2:"bootstrap",
            A3:"PChart",
            A4:"TensorFlow",
            A:1
        },
        {
            id:4,
            Q:"which one can center exactly in the middle a element's child in css ?",
            A1:"display:flex; justify-content:center;",
            A2:"display:grid; place-content:center",
            A3:"display:block align-items:center",
            A4:"display:inline-block text-align:center",
            A:2
        },
        {
            id:5,
            Q:"what does css stand for ?",
            A1:"colorful style sheet",
            A2:"common style sheet",
            A3:"computer style sheet",
            A4:"cascading style sheet",
            A:4
        },
    ]

}

class Data{
    constructor(data){
        this.data = data()
    }

    getData(){
        return this.data
    }
}
/* option */
    /* change answer time */
const time = 15 /* seconds */

let QIndex  = 0
let timerId = null
let counter = time
let tempForProgres = 0
let currentQuestion =0
const constForProgres = 100/time
let correctAnswers = 0
let answerState = true

const allQuestions = new Data(data).getData(),//acces qustions  we need only reading data so i put that in global var
startBtn = document.querySelector(".start"),
content = document.querySelector(".content")


startBtn.addEventListener("click",()=>{
    startBtn.classList.remove("show")
    content.innerHTML =
    `<div class="rules-wrapper">
        <header class="rules-header"><h2>rules</h2></header>
        <div class="rules-body">
            <p>1. dont cheat</p>
            <p>2. dont try to cheate</p>
            <p>3. dont even think about cheating</p>
            <p>4. I said dont </p>
            <p>5. Ok do whatever you want</p>
        </div>
        <footer class="rules-footer">
            <button onclick="startGame()" class="firstNext">next</button>
        </footer>
    </div> `
})

function startGame(){
    handleTimer()
    content.innerHTML = `
    <div class="q-wrapper">
        <header class="q-rules-header">
            <h2>Quiz App</h2>
            <span class="time-board">
                <h4>time left</h4>
                <span id="counter">${counter}</span>
            </span>
        </header>
        <span class="bar">
            <span class="progres-bar"></span>
        </span>
        <div class="Q-body">
            <h2>${allQuestions[QIndex].id}. ${allQuestions[QIndex].Q}</h2>
            <button data-id = "1" Answer-id> ${allQuestions[QIndex].A1} </button>
            <button data-id = "2" Answer-id> ${allQuestions[QIndex].A2} </button>
            <button data-id = "3" Answer-id> ${allQuestions[QIndex].A3}  </button>
            <button data-id = "4" Answer-id> ${allQuestions[QIndex].A4} </button>
        </div>
        <footer class="quiz-rules-footer">
            <h4>${QIndex+1} of ${allQuestions.length} Questions</h4>
            <button onclick="next(${allQuestions[QIndex].id})" class="Next">next</button>
        </footer>            
    </div>`
    
    currentQuestion = QIndex
    QIndex++
}

function next(id){
    answerState = true
    if (counter !== 0) return 
    if(allQuestions[id]){ 
        counter = time
        startGame()
    }else{
        finish()
        return
    }
}

function finish(){
    content.innerHTML = `<div class="q-wrapper fin"><h2>Finished</h2> <h3>correct answers ${correctAnswers} out of ${allQuestions.length}</h3></div>`
    clearInterval(timerId)
}

function handleTimer(){
    clearInterval(timerId)
    timerId = null
    Timer()
}

function Timer(){
   timerId = setInterval(countAnswerTime,1000)
}

function countAnswerTime(){
    barMove()
    counter--
    document.querySelector("#counter").innerHTML = counter
    if(counter <= 0){
        clearInterval(timerId);
        tempForProgres = 0
        ifTimeIsUp()
        showAndHideNextBtn()
    }
}

function ifTimeIsUp(){
    const curId = allQuestions[QIndex-1].A
    const elements = Array.from(document.querySelectorAll("[Answer-id]"))
    const node = elements.filter(element=> element.getAttribute("data-id") === curId+"" )
    changeColor(...node)
}

function barMove(){
    const progresBar = document.querySelector(".progres-bar")
    tempForProgres = constForProgres + tempForProgres
    progresBar.style.width = tempForProgres+"%"
}


function checkTrue(answer){
    showAndHideNextBtn()
    if(answerState === false) return
    if (parseInt(answer.getAttribute("data-id")) === allQuestions[currentQuestion].A) {
        resetVars()
        changeColor(answer)
        correctAnswers++
    }else{
        resetVars()
        changeWrongColor(answer)
        ifTimeIsUp()
    }
    answerState = false
}

document.addEventListener("click" ,(e)=>answerClickHandle(e))

function answerClickHandle(e){
    if(counter === 0) return
    IsAnswer = e.target.closest("[Answer-id]")
    IsAnswer && checkTrue(e.target) 
}

function resetVars(){
    clearInterval(timerId)
    timerId = null
    tempForProgres = 0
    counter = 0
}

function changeColor(answer){
    answer.style.background = "rgb(163, 249, 145)"
}

function changeWrongColor(answer){
    answer.style.background = "rgb(241, 151, 135)"
}

function showAndHideNextBtn(){
    document.querySelector(".Next").style.opacity = "1"
    document.querySelector(".Next").style.pointerEvents = "auto"
}
