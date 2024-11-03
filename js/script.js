// Quiz variables
const questions = [
    // Placeholder questions for testing
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
    // Set difficulty and hints available based on selection
    difficulty = document.getElementById("difficultySelector").value;
    hintsAvailable = difficulty === "Easy" ? 2 : difficulty === "Medium" ? 1 : 0;

    // Randomly select 10 questions
    selectedQuestions = shuffleArray(questions).slice(0, 10);
    currentQuestionIndex = 0;
    score = 0;

    // Switch to quiz display
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("quizContainer").style.display = "block";
    displayQuestion();
}
