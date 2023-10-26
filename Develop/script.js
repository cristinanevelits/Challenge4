// Quiz questions and answers
const questions = [
    {
        question: "What is JavaScript?",
        choices: ["A programming language", "A type of coffee", "A planet"],
        correct: 0,
    },
    {
        question: "What is the purpose of the 'addEventListener' method in JavaScript?",
        choices: ["To display an alert message", "To add event handlers to HTML elements", "To create variables"],
        correct: 1,
    },
    {
        question: "What does 'DOM' stand for?",
        choices: ["Document Object Model", "Digital Order Management", "Dynamic Object Modeling"],
        correct: 0,
    },
    {
        question: "What is an array in JavaScript?",
        choices: ["A data structure", "A type of coffee", "A planet"],
        correct: 0, 
    },
    {
        question: "Which of the following is not a JavaScript data type?",
        choices: ["Number", "Boolean", "Float"],
        correct: 2,
    },
    {
        question: "What is a 'for' loop used for in JavaScript?",
        choices: ["Iteration", "Making coffee", "Creating planets"],
        correct: 0,
    },
    {
        question: "What is the purpose of 'localStorage' in JavaScript?",
        choices: ["Storing data locally in the browser", "Making phone calls", "Drawing pictures"],
        correct: 0,
    },
    {
        question: "What is a 'callback function' in JavaScript?",
        choices: ["A function passed as an argument to another function", "A function for making sandwiches", "A function for taking photos"],
        correct: 0,
    },
    {
        question: "What is the result of '5' + 3 in JavaScript?",
        choices: ["53", "8", "35"],
        correct: 0,
    },
    {
        question: "What is the 'this' keyword in JavaScript?",
        choices: ["A reference to the current object", "A keyboard shortcut", "A song title"],
        correct: 0,
    },
    // Add more questions here
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 60; // Set the initial time limit in seconds

// DOM elements
const startButton = document.getElementById("start");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const timerElement = document.getElementById("timer");
const gameOverElement = document.getElementById("game-over");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit");
const feedbackElement = document.getElementById("feedback");

// Hide the question and choices initially
questionElement.style.display = "none";
choicesElement.style.display = "none";

// Event listeners
startButton.addEventListener("click", startQuiz);
choicesElement.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        checkAnswer(event.target.textContent);
    }
});
submitButton.addEventListener("click", saveHighScore);

function startQuiz() {
    // Hide the Start button
    startButton.style.display = "none";

    // Show the question and choices
    questionElement.style.display = "block";
    choicesElement.style.display = "block";

    timer = setInterval(updateTimer, 1000);
    nextQuestion();
}

function nextQuestion() {
    if (currentQuestion < questions.length) {
        questionElement.textContent = questions[currentQuestion].question;
        choicesElement.innerHTML = "";

        questions[currentQuestion].choices.forEach((choice, index) => {
            const choiceButton = document.createElement("button");
            choiceButton.textContent = choice;
            choicesElement.appendChild(choiceButton);
        });
    } 
    else {
        endGame();
    }
}

function checkAnswer(selectedChoice) {
    const correctIndex = questions[currentQuestion].correct;
    if (selectedChoice === questions[currentQuestion].choices[correctIndex]) {
        score += 10; // Increase the score for a correct answer
    }
    else {
    // Subtract 10 seconds for a wrong answer
    timeLeft -= 10;
    }
    
    currentQuestion++;
    nextQuestion();
}

function updateTimer() {
    timerElement.textContent = `Time: ${timeLeft}`;
    if (timeLeft < 1) {
        clearInterval(timer);
        endGame();
    }
    timeLeft--;
}

function endGame() {
    clearInterval(timer);
    questionElement.style.display = "none";
    choicesElement.style.display = "none";
    gameOverElement.style.display = "block";
    
    // Hide the timer element
    timerElement.style.display = "none";

    // Display the final score at the top
    const finalScoreElement = document.getElementById("final-score");
    finalScoreElement.style.display = "block";
    finalScoreElement.textContent = `Your Final Score: ${score}`;
}

function saveHighScore() {
    const initials = initialsInput.value;
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push({ initials, score });

    // Store the updated scores in local storage
    localStorage.setItem('highScores', JSON.stringify(highScores));

    // Display the top scores in an alert
    const topScoresAlert = highScores
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map((scoreObj, index) => `${index + 1}. ${scoreObj.initials} - ${scoreObj.score}`)
        .join('\n');

    alert("Top Scores:\n" + topScoresAlert);
}


    