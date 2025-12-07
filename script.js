// DOM ELEMENTS
const startScreen = document.getElementById("start-screen")
const quizScreen = document.getElementById("Quiz-Screen")
const resultScreen = document.getElementById("result-screen")
const startBtn = document.getElementById("start-btn")
const restartBtn = document.getElementById("restart-btn")
const questionString = document.getElementById("Question-Text")
const answerContainer = document.getElementById("answers-container")
const currentQuestion  = document.getElementById("current-question-num")
const totalQuestion = document.getElementById("total-questions")
const pokePoints = document.getElementById("Poke-points")
const finalpokePoints = document.getElementById("final-Poke-points")
const MaxpokePoints = document.getElementById("max-Poke-points")
const resultMsg  = document.getElementById("result-message")
const EXPbar = document.getElementById("progress")

// quiz questions:
const quizQuestions = [
    {
        question:"What is the PokeDex no. of Pikachu?",
        ans: [
            {text:"15",correct:false },
            {text:"25",correct:true },
            {text:"30",correct:false },
            {text:"34",correct:false }
        ]
    },
    {
        question:"Who Was the FIRST Pokémon to be DESIGNED?",
        ans:[
            {text:"Bulbasaur",correct:false},
            {text:"Rhydon",correct:true},
            {text:"Mew",correct:false},
            {text:"Pikachu",correct:false}
        ]
    },
    
        {
        question:"What is the name of the only non-Legendary, non-Mythical Pokémon that has a base Friendship (or Affection) value of 0 when caught?",
        ans:[
            {text:"Deino", correct:false},
            {text:"Sneasel", correct:false},
            {text:"Buneary", correct:true},
            {text:"Zoroark", correct:false}
        ]
    },
    {
        question:"In Pokémon Diamond and Pearl, which of the following moves was **NOT** categorized as a Physical move after the Physical/Special split?",
        ans:[
            {text:"Aqua Tail", correct:false},
            {text:"Shadow Claw", correct:false},
            {text:"Signal Beam", correct:true},
            {text:"Poison Jab", correct:false}
        ]
    },
    {
        question:"Which Generation III game introduced the only instance where the ability 'Hyper Cutter' had an out-of-battle effect, allowing the player to clear a larger patch of grass?",
        ans:[
            {text:"Pokémon Ruby", correct:false},
            {text:"Pokémon Sapphire", correct:false},
            {text:"Pokémon Emerald", correct:true},
            {text:"Pokémon FireRed", correct:false}
        ]
    },
    {
        question:"What is the only Pokémon that can evolve by losing a typing upon evolution?",
        ans:[
            {text:"Shedinja", "correct":true},
            {text:"Scizor", "correct":false},
            {text:"Poliwag", "correct":false},
            {text:"Eevee (to Flareon)", "correct":false}
        ]
    },
    {
        question:"In the original Pokémon Red and Blue (Gen I), which move was programmed to be Kadabra's signature move but could only be used via Metronome due to a game bug?",
        "ans":[
            {text:"Psywave", correct:false},
            {text:"Disable", correct:false},
            {text:"Reflect", correct:false},
            {text:"Kinesis", correct:true}
        ]
    },
    {
        question:"Which of the following Pokémon's Pokédex entries incorrectly describes it as evolving from a non-existent Pokémon named 'Maniac' in the original Pokémon Red/Blue games?",
        ans:[
            {text:"Jynx", correct:false},
            {text:"Kangaskhan", correct:true},
            {text:"Clefairy", correct:false},
            {text:"Slowbro", correct:false}
        ]
    },
    {
        question:"In Pokémon Gold, Silver, and Crystal, what item would a traded Tentacruel from a Generation I game sometimes be holding, which was otherwise unobtainable until Generation IV?",
        ans:[
            {text:"Dragon Scale", correct:false},
            {text:"Silver Leaf", correct:true},
            {text:"Up-Grade", correct:false},
            {text:"Lucky Egg", correct:false}
        ]
    },
    {
        question:"Which Generation II Pokémon holds the distinction of having the latest level-up evolution for its base stage (Level 18), but the earliest level-up evolution for its middle stage (Level 30) among all starter lines?",
        ans:[
            {text:"Chikorita line", correct:false},
            {text:"Cyndaquil line", correct:false},
            {text:"Totodile line", correct:true},
            {text:"Mudkip line", correct:false}
        ]
    }
    
]

let currentQuestionIndex = 0
let PokePointScore = 0
let answerDisabled  = false

totalQuestion.textContent = quizQuestions.length
MaxpokePoints.textContent = quizQuestions.length

// start quiz
startBtn.addEventListener("click", startQuiz)

function startQuiz(){
    startScreen.classList.remove("active-screen")
    quizScreen.classList.add("active-screen")
    currentQuestionIndex = 0
    PokePointScore = 0
    pokePoints.textContent = 0
    showQuestion()
}

// restart
restartBtn.addEventListener("click", restartQuiz)

function restartQuiz(){
    resultScreen.classList.remove("active-screen")
    startQuiz()
}

// show question
function showQuestion(){
    answerDisabled = false
    const currentQuestionObj = quizQuestions[currentQuestionIndex]

    currentQuestion.textContent = currentQuestionIndex + 1

    const Progressper = (currentQuestionIndex / quizQuestions.length) * 100
    EXPbar.style.width = Progressper + "%"

    questionString.textContent = currentQuestionObj.question

    answerContainer.innerHTML = ""

    currentQuestionObj.ans.forEach(ans =>{
        const button = document.createElement("button")   
        button.textContent = ans.text
        button.classList.add("answer-btn")
        button.dataset.correct = ans.correct
        button.addEventListener("click", selectAns)
        answerContainer.appendChild(button)
    })
}

function selectAns(event){
    if (answerDisabled) return
    answerDisabled = true

    const selBtn  = event.target
    const isCorrect = selBtn.dataset.correct === 'true'

    Array.from(answerContainer.children).forEach(button =>{
        if (button.dataset.correct === 'true'){
            button.classList.add("Correct")
        } else{
            button.classList.add("Incorrect")
        }
    })

    if (isCorrect){
        PokePointScore++
        pokePoints.textContent = PokePointScore
    }

    setTimeout(()=>{
        currentQuestionIndex++
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion()
        }
        else{
            showResults()
        } 
    },1000)
}

function showResults(){
    quizScreen.classList.remove("active-screen")
    resultScreen.classList.add("active-screen")

    finalpokePoints.textContent = PokePointScore

    const Percentage = (PokePointScore / quizQuestions.length) * 100

    if (Percentage === 100){
        resultMsg.textContent = "Perfect! You're an ABSOLUTE POKÉMON MASTER!!"
    }
    else if (Percentage >= 80){
        resultMsg.textContent = "SOLID! You're a LEGENDARY TRAINER."
    }
    else if (Percentage >= 60){
        resultMsg.textContent = "GOOD effort. More training needed."
    }
    else if (Percentage >= 40){
        resultMsg.textContent = "Not bad... but Bulbapedia is calling you."
    }
    else {
        resultMsg.textContent = "Magikarp-tier performance. No comment."
    }
}
