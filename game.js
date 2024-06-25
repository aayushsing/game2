let round = 1;
let score = 0;
let currentQuestion;
let timer;
const totalTimePerQuestion = 30; // Total time per question in seconds
const totalRounds = 30; // Total number of questions
const askedQuestions = new Set(); // Set to track asked questions

const logicQuestions = [
    {
        question: "What is the next number in the sequence: 2, 4, 6, 8, ...?",
        options: ["9", "10", "11", "12"],
        correctIndex: 1 // Index of the correct answer in the options array
    },
    {
        question: "What is the capital of France?",
        options: ["London", "Rome", "Paris", "Berlin"],
        correctIndex: 2
    },
    {
        question: "What comes next: 1, 1, 2, 3, 5, ...?",
        options: ["6", "7", "8", "9"],
        correctIndex: 2 // Fibonacci sequence
    },
    {
        question: "What is the color of the sky?",
        options: ["Red", "Green", "Blue", "Yellow"],
        correctIndex: 2
    },
    {
        question: "What is 10 + 15?",
        options: ["20", "25", "30", "35"],
        correctIndex: 1
    },
    {
        question: "What is the opposite of 'cold'?",
        options: ["Warm", "Hot", "Freezing", "Cool"],
        correctIndex: 1
    },
    {
        question: "What is the sum of the angles in a triangle?",
        options: ["90", "120", "180", "360"],
        correctIndex: 2
    },
    {
        question: "What is 9 * 9?",
        options: ["72", "81", "90", "100"],
        correctIndex: 1
    },
    {
        question: "What is the square root of 64?",
        options: ["6", "7", "8", "9"],
        correctIndex: 2
    },
    {
        question: "What is 50 divided by 2?",
        options: ["20", "25", "30", "35"],
        correctIndex: 1
    },
    // Additional questions
    {
        question: "How many sides does a pentagon have?",
        options: ["4", "5", "6", "7"],
        correctIndex: 1
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctIndex: 1
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
        correctIndex: 2
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "O2", "NaCl"],
        correctIndex: 0
    },
    {
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        correctIndex: 2
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue whale", "Giraffe", "Lion"],
        correctIndex: 1
    },
    {
        question: "Which country is famous for its tulips?",
        options: ["Italy", "Turkey", "Netherlands", "Japan"],
        correctIndex: 2
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctIndex: 3
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Michelangelo"],
        correctIndex: 2
    },
    {
        question: "Who discovered penicillin?",
        options: ["Alexander Fleming", "Marie Curie", "Albert Einstein", "Isaac Newton"],
        correctIndex: 0
    },
    {
        question: "What is the largest desert in the world?",
        options: ["Sahara Desert", "Arabian Desert", "Gobi Desert", "Antarctic Desert"],
        correctIndex: 0
    },
    {
        question: "Which planet is known as the 'Morning Star' or 'Evening Star'?",
        options: ["Mercury", "Venus", "Mars", "Jupiter"],
        correctIndex: 1
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["J.K. Rowling", "Harper Lee", "Ernest Hemingway", "George Orwell"],
        correctIndex: 1
    },
    {
        question: "Which country is known as the 'Land of the Rising Sun'?",
        options: ["China", "Japan", "South Korea", "Vietnam"],
        correctIndex: 1
    },
    {
        question: "What is the smallest bone in the human body?",
        options: ["Stapes", "Femur", "Radius", "Tibia"],
        correctIndex: 0
    },
    {
        question: "Which animal is known as the 'Ship of the Desert'?",
        options: ["Camel", "Horse", "Elephant", "Giraffe"],
        correctIndex: 0
    },
    {
        question: "What is the currency of Japan?",
        options: ["Yuan", "Yen", "Won", "Dollar"],
        correctIndex: 1
    },
    {
        question: "Who was the first person to step on the moon?",
        options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Alan Shepard"],
        correctIndex: 0
    },
    {
        question: "Which scientist is known for the theory of relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
        correctIndex: 1
    },
    {
        question: "What is the national flower of India?",
        options: ["Rose", "Lotus", "Tulip", "Sunflower"],
        correctIndex: 1
    },
    // 10 additional GK questions
    {
        question: "Which ocean is the largest in the world?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctIndex: 3
    },
    {
        question: "Who painted the ceiling of the Sistine Chapel?",
        options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"],
        correctIndex: 1
    },
    {
        question: "In which city would you find the Eiffel Tower?",
        options: ["London", "Berlin", "Paris", "Rome"],
        correctIndex: 2
    },
    {
        question: "What is the capital city of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correctIndex: 2
    },
    {
        question: "Who wrote the famous novel 'Moby-Dick'?",
        options: ["Herman Melville", "Charles Dickens", "Mark Twain", "Leo Tolstoy"],
        correctIndex: 0
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Au", "Pb", "Cu"],
        correctIndex: 1
    },
    {
        question: "Which mountain is the tallest in the world?",
        options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
        correctIndex: 0
    },
    {
        question: "Who is known as the 'Father of Modern Physics'?",
        options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Niels Bohr"],
        correctIndex: 1
    },
    {
        question: "Which bird is often associated with delivering babies?",
        options: ["Stork", "Pigeon", "Swan", "Dove"],
        correctIndex: 0
    },
    {
        question: "What is the largest organ in the human body?",
        options: ["Liver", "Brain", "Heart", "Skin"],
        correctIndex: 0
    },
    // 10 more additional GK questions
    {
        question: "Who invented the telephone?",
        options: ["Thomas Edison", "Nikola Tesla", "Alexander Graham Bell", "Guglielmo Marconi"],
        correctIndex: 2
    },
    {
        question: "Which river is the longest in the world?",
        options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
        correctIndex: 1
    },
    {
        question: "How many bones are there in the human body?",
        options: ["204", "206", "208", "210"],
        correctIndex: 1
    }
];

// Function to start the game
function startGame() {
    // Initialize round, score, and display the first question
    round = 1;
    score = 0;
    askedQuestions.clear();

    // Display the initial score
    document.getElementById('score').textContent = `Score: ${score}/${totalRounds}`;

    generateQuestion();

    // Set a 15-minute countdown timer
    const timerDuration = 15 * 60 * 1000; // 15 minutes in milliseconds
    const endTime = new Date().getTime() + timerDuration;

    timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('timer').textContent = `${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

// Function to generate and display a question
function generateQuestion() {
    const isMathQuestion = Math.random() > 0.5;
    let questionIndex;

    if (isMathQuestion) {
        const number1 = Math.floor(Math.random() * (30 * round)) + 1;
        const number2 = Math.floor(Math.random() * (30 * round)) + 1;
        const operator = Math.random() > 0.4? '+' : '-';
        let correctAnswer;

        if (operator === '+') {
            correctAnswer = number1 + number2;
        } else {
            correctAnswer = number1 - number2;
        }

        currentQuestion = {
            question: `Round ${round}: What is ${number1} ${operator} ${number2}?`,
            options: shuffleArray([
                (number1 + number2).toString(),
                (number1 - number2).toString(),
                (number1 + number2 + 1).toString(),
                (number1 - number2 - 1).toString()
            ]),
            correctIndex: 0 // Index of the correct answer in the options array
        };
    } else {
        // Ensure no repeated logic questions
        do {
            questionIndex = Math.floor(Math.random() * logicQuestions.length);
        } while (askedQuestions.has(questionIndex));

        askedQuestions.add(questionIndex);
        currentQuestion = logicQuestions[questionIndex];
    }

    displayQuestion();
}

// Function to display the current question
function displayQuestion() {
    document.getElementById('question').textContent = currentQuestion.question;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = ''; // Clear previous options

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => {
            checkAnswer(index);
        });
        optionsContainer.appendChild(button);
    });
}

// Function to check the selected answer
function checkAnswer(index) {
    if (index === currentQuestion.correctIndex) {
        document.getElementById('feedback').textContent = "Correct!";
        score++;
    } else {
        document.getElementById('feedback').textContent = `Wrong. The correct answer was ${currentQuestion.options[currentQuestion.correctIndex]}.`;
    }

    if (round < totalRounds) {
        round++;
        generateQuestion();
    } else {
        endGame();
    }
}

// Function to end the game
function endGame() {
    clearInterval(timer); // Clear the timer interval

    const scorePercentage = (score / totalRounds) * 100;
    const resultMessage = scorePercentage >= 58 ? 'You pass!' : 'You fail.';

    document.getElementById('question').textContent = "Game Over!";
    document.getElementById('score').textContent = `Your total score is: ${score}/${totalRounds} (${scorePercentage.toFixed(2)}%) - ${resultMessage}`;
    document.getElementById('options').innerHTML = ''; // Clear options
    document.getElementById('feedback').textContent = 'Thank you for showing your interest';

    // Optionally, you can submit the score or perform other end-game actions here
}

// Function to shuffle array elements (for randomizing options)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    startGame();
});
