// Quiz variables
const questions = [
    // Sample placeholder questions
    { 
        image: 'assets/images/city-of-god.webp', 
        options: ["City of God", "The Motorcycle Diaries", "City of Men", "City of Angels"], 
        correctAnswer: 0, 
        hints: ["This film is set in the favelas of Rio de Janeiro.", "It follows the lives of several characters growing up in a violent neighborhood."] 
    },
    { 
        image: 'assets/images/1917.webp', 
        options: ["Dunkirk", "1917", "War Horse", "Hacksaw Ridge"], 
        correctAnswer: 1, 
        hints: ["This film is shot to appear as one continuous take.", "It follows two British soldiers during World War I on a dangerous mission."] 
    },
    // add 27 more questions
];
let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let difficulty = "";
let hintsAvailable = 0;

// Initial setup on page load
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("startQuizButton").addEventListener("click", startQuiz);
});

function startQuiz() {
    // Get difficulty from selector and set hints available
    difficulty = document.getElementById("difficultySelector").value;
    hintsAvailable = difficulty === "Easy" ? 2 : difficulty === "Medium" ? 1 : 0;

    // Randomly select 10 questions
    selectedQuestions = shuffleArray(questions).slice(0, 10);
    currentQuestionIndex = 0;
    score = 0;
    
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("quizContainer").style.display = "block";
    displayQuestion();
}

function displayQuestion() {
    const questionData = selectedQuestions[currentQuestionIndex];
    document.getElementById("questionImage").src = questionData.image;
    const options = document.querySelectorAll(".answer-option");

    options.forEach((option, index) => {
        option.textContent = questionData.options[index];
        option.classList.remove("correct", "incorrect");
        option.onclick = () => checkAnswer(index);
    });
    
    displayHints();
}

function displayHints() {
    const hintButtons = document.querySelectorAll(".hint-button");
    const hintBox = document.getElementById("hintBox");
    hintBox.style.display = "none";
    hintButtons.forEach((button, index) => {
        button.style.display = index < hintsAvailable ? "inline-block" : "none";
        button.onclick = () => showHint(index);
    });
}

function showHint(index) {
    const hintBox = document.getElementById("hintBox");
    hintBox.textContent = selectedQuestions[currentQuestionIndex].hints[index];
    hintBox.style.display = "block";
}

function checkAnswer(selectedIndex) {
    const questionData = selectedQuestions[currentQuestionIndex];
    const options = document.querySelectorAll(".answer-option");

    if (selectedIndex === questionData.correctAnswer) {
        options[selectedIndex].classList.add("correct");
        score += difficulty === "Easy" ? 1 : difficulty === "Medium" ? 2 : 3;
        playSound("correct");
    } else {
        options[selectedIndex].classList.add("incorrect");
        playSound("incorrect");
    }

    setTimeout(() => {
        currentQuestionIndex++;
        currentQuestionIndex < selectedQuestions.length ? displayQuestion() : endQuiz();
    }, 1000);
}

function endQuiz() {
    document.getElementById("quizContainer").style.display = "none";
    document.getElementById("scoreDisplay").textContent = `Your score: ${score}`;
    document.getElementById("endScreen").style.display = "block";
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function playSound(type) {
    console.log(type === "correct" ? "Playing correct sound" : "Playing incorrect sound");
}

function restartQuiz() {
    document.getElementById("endScreen").style.display = "none";
    document.getElementById("startScreen").style.display = "block";
}

