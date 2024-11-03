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
    { 
        image: 'assets/images/apocalypse-now.webp', 
        options: ["Full Metal Jacket", "Platoon", "Apocalypse Now", "The Deer Hunter"], 
        correctAnswer: 2, 
        hints: ["This movie is set during the Vietnam War and follows a mission to locate a rogue colonel.", "Directed by Francis Ford Coppola, it features a famous line about 'the smell of napalm in the morning.'"] 
    },
    { 
        image: 'assets/images/cool-hand-luke.webp', 
        options: ["The Shawshank Redemption", "One Flew Over the Cuckoo's Nest", "In the Heat of the Night", "Cool Hand Luke"], 
        correctAnswer: 3, 
        hints: ["This film follows a rebellious prisoner known for his defiance and ability to endure hardship in a Southern prison.", "Paul Newman stars as the title character, who famously takes on a hard-boiled egg-eating challenge."] 
    },
    { 
        image: 'assets/images/dawn-of-the-dead.webp', 
        options: ["Dawn of the Dead", "The Exorcist", "The Texas Chain Saw Massacre", "Night of the Living Dead"], 
        correctAnswer: 0, 
        hints: ["This horror classic features a group of people trapped in a shopping mall during a zombie apocalypse.", "Directed by George A. Romero, it’s a famous sequel that critiques consumerism through its undead themes."] 
    },
    { 
        image: 'assets/images/die-hard.webp', 
        options: ["Lethal Weapon", "Die Hard", "Speed", "The Terminator"], 
        correctAnswer: 1, 
        hints: ["This action movie takes place in a high-rise building during a Christmas party.", "The film has a memorable villain played by Alan Rickman."] 
    },
    { 
        image: 'assets/images/drag-me-to-hell.webp', 
        options: ["Sinister", "Insidious", "Drag Me To Hell", "The Conjuring"], 
        correctAnswer: 2, 
        hints: ["Directed by Sam Raimi, the film combines horror with dark humor, much like his previous works.", "This horror film involves a cursed button that dooms the main character."] 
    },
    { 
        image: 'assets/images/fight-club.webp', 
        options: ["American Psycho", "Se7en", "The Machinist", "Fight Club"], 
        correctAnswer: 3, 
        hints: ["The film’s famous line is 'The first rule is: you do not talk about it.'", "The main character forms a secret group with an unconventional way to vent frustrations."] 
    },
    { 
        image: 'assets/images/full-metal-jacket.webp', 
        options: ["Full Metal Jacket", "Saving Private Ryan", "Blackhawk Down", "Platoon"], 
        correctAnswer: 0, 
        hints: ["Directed by a filmmaker known for The Shining and A Clockwork Orange.", "The film is divided into two distinct parts: basic training and the Vietnam War."] 
    },
    { 
        image: 'assets/images/goodwill-will-hunting.webp', 
        options: ["A Beautiful Mind", "Good Will Hunting", "Dead Poets Society", "The Pursuit of Happyness"], 
        correctAnswer: 1, 
        hints: ["This film features a character who is a janitor at MIT.", "The main character has a gift for mathematics but struggles with personal issues."] 
    },
    { 
        image: 'assets/images/goodfellas.webp', 
        options: ["The Godfather", "Casino", "Goodfellas", "Scarface"], 
        correctAnswer: 2, 
        hints: ["This film is based on the true story of mobster Henry Hill.", "It features a famous line about how 'as far back as I can remember, I always wanted to be a gangster.'"] 
    },
    { 
        image: 'assets/images/life-of-brian.webp', 
        options: ["Monty Python and the Holy Grail", "The Meaning of Life", "A Fish Called Wanda", "Life of Brian"], 
        correctAnswer: 3, 
        hints: ["It features a famous scene with the People's Front of Judea.", "This film is a satirical take on the life of a man born on the same day and in the house next door to Jesus."] 
    },
    { 
        image: 'assets/images/logan.webp', 
        options: ["Logan", "The Wolverine", "X-Men: Days of Future Past", "Deadpool"], 
        correctAnswer: 0, 
        hints: ["This film is set in a dystopian future where mutants are nearly extinct.", "It features an older version of Wolverine who is caring for an ailing Professor X."] 
    },
    { 
        image: 'assets/images/once-upon-a-time-in-the-west.webp', 
        options: ["The Good, the Bad and the Ugly", "Once Upon a Time in the West", "A Fistful of Dollars", "For a Few Dollars More"], 
        correctAnswer: 1, 
        hints: ["This film is known for its iconic score composed by Ennio Morricone.", "It tells the story of a mysterious woman and a revenge-seeking gunman in the Old West."] 
    },
    { 
        image: 'assets/images/one-flew-over-the-cuckoos-nest.webp', 
        options: ["A Clockwork Orange", "The Shawshank Redemption", "One Flew Over the Cuckoo's Nest", "Rain Man"], 
        correctAnswer: 2, 
        hints: ["The film is set in a mental institution", "The main character struggles against the oppressive authority of Nurse Ratched."] 
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

