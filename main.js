const questions = [
    {
        question: "Ankara is the capital of which country?",
        answers: [
            {text: "Turkey", correct: true},
            {text: "Uruguay", correct: false},
            {text: "Uganda", correct: false},
            {text: "Vanuatu", correct: false}
        ]
    },
    {
        question: "What is the capital of Finland?",
        answers: [
            {text: "Conakry", correct: false},
            {text: "Prague", correct: false},
            {text: "Helsinki", correct: true},
            {text: "None of the above", correct: false}
        ]
    },
    {
        question: "What is the capital of china?",
        answers: [
            {text: "Santiago", correct: false},
            {text: "None", correct: false},
            {text: "Havana", correct: false},
            {text: "Beijing", correct: true}
        ]
    },
    {
        question: "What is the capital of Egypt?",
        answers: [
            {text: "San Jose", correct: false},
            {text: "Cairo", correct: true},
            {text: "Moroni", correct: false},
            {text: "Tokyo", correct: false}
        ]
    },
    {
        question: "What is the capital of Nigeria?",
        answers: [
            {text: "Monaco", correct: false},
            {text: "Podgorica", correct: false},
            {text: "Abuja", correct: true},
            {text: "None of the above", correct: false}
        ]
    },
    {
        question: "What is the capital of Greece?",
        answers: [
            {text: "Athens", correct: true},
            {text: "Roseau", correct: false},
            {text: "Malabo", correct: false},
            {text: "None of the above", correct: false}
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
      answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");

    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();