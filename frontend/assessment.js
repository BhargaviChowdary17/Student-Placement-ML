const API_URL = "https://student-placement-ml-api.onrender.com";

let studentProfile = null;

try {
    studentProfile = JSON.parse(sessionStorage.getItem("studentProfile") || "null");
} catch (error) {
    console.error("Could not read student profile:", error);
}

const startSection = document.getElementById("startSection");
const assessmentSection = document.getElementById("assessmentSection");
const codingSection = document.getElementById("codingSection");
const resultSection = document.getElementById("resultSection");

const startButton = document.getElementById("startButton");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const submitButton = document.getElementById("submitButton");

const questionContainer = document.getElementById("questionContainer");
const questionNumber = document.getElementById("questionNumber");
const levelInfo = document.getElementById("levelInfo");
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");

const runButton1 = document.getElementById("runButton1");
const runButton2 = document.getElementById("runButton2");

const resetButton1 = document.getElementById("resetButton1");
const resetButton2 = document.getElementById("resetButton2");

const submitCodeButton1 = document.getElementById("submitCodeButton1");
const submitCodeButton2 = document.getElementById("submitCodeButton2");

const submitCodingButton = document.getElementById("submitCodingButton");

const codeEditor1 = document.getElementById("codeEditor1");
const codeEditor2 = document.getElementById("codeEditor2");

const customInput1 = document.getElementById("customInput1");
const customInput2 = document.getElementById("customInput2");

const resultBox1 = document.getElementById("resultBox1");
const resultBox2 = document.getElementById("resultBox2");

const testResultBox1 = document.getElementById("testResultBox1");
const testResultBox2 = document.getElementById("testResultBox2");

const language1 = document.getElementById("language1");
const language2 = document.getElementById("language2");

const scoreText = document.getElementById("scoreText");
const percentageText = document.getElementById("percentageText");
const correctText = document.getElementById("correctText");
const incorrectText = document.getElementById("incorrectText");
const performanceText = document.getElementById("performanceText");

const skillProfileContainer =
    document.getElementById("skillProfileContainer");

const reviewContainer =
    document.getElementById("reviewContainer");

const retakeButton =
    document.getElementById("retakeButton");


const questionBank = [
    {
        id: 1,
        level: "Basic",
        skill: "Aptitude",
        question: "What is 20% of 150?",
        options: ["20", "25", "30", "35"],
        answer: 2,
        explanation: "20% of 150 is 30."
    },
    {
        id: 2,
        level: "Basic",
        skill: "Python",
        question: "Which keyword is used to define a function in Python?",
        options: ["function", "define", "def", "fun"],
        answer: 2,
        explanation: "Python uses the def keyword."
    },
    {
        id: 3,
        level: "Basic",
        skill: "DSA",
        question: "Which data structure follows FIFO?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        answer: 1,
        explanation: "Queue follows First In First Out."
    },
    {
        id: 4,
        level: "Basic",
        skill: "Problem Solving",
        question: "What is the next number: 2, 4, 6, 8, ?",
        options: ["9", "10", "11", "12"],
        answer: 1,
        explanation: "The numbers increase by 2."
    },
    {
        id: 5,
        level: "Basic",
        skill: "Aptitude",
        question: "If 5 + 5 = 10, what is 10 + 10?",
        options: ["15", "18", "20", "25"],
        answer: 2,
        explanation: "10 + 10 equals 20."
    },

    {
        id: 6,
        level: "Intermediate",
        skill: "Python",
        question: "What is the output of len([10, 20, 30])?",
        options: ["2", "3", "4", "30"],
        answer: 1,
        explanation: "The list contains three elements."
    },
    {
        id: 7,
        level: "Intermediate",
        skill: "DSA",
        question: "What is the average time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(nÂ²)", "O(1)"],
        answer: 1,
        explanation: "Binary search runs in O(log n) time."
    },
    {
        id: 8,
        level: "Intermediate",
        skill: "Aptitude",
        question: "A train travels 60 km in 2 hours. What is its speed?",
        options: ["20 km/h", "30 km/h", "40 km/h", "50 km/h"],
        answer: 1,
        explanation: "Speed = Distance / Time = 60 / 2 = 30 km/h."
    },
    {
        id: 9,
        level: "Intermediate",
        skill: "Problem Solving",
        question: "Which approach divides a problem into smaller subproblems?",
        options: [
            "Divide and Conquer",
            "Linear Search",
            "Brute Force only",
            "Compilation"
        ],
        answer: 0,
        explanation: "Divide and Conquer breaks problems into smaller subproblems."
    },
    {
        id: 10,
        level: "Intermediate",
        skill: "Python",
        question: "Which collection stores key-value pairs in Python?",
        options: ["List", "Tuple", "Dictionary", "Set"],
        answer: 2,
        explanation: "Python dictionaries store key-value pairs."
    },

    {
        id: 11,
        level: "Advanced",
        skill: "DSA",
        question: "What is the worst-case complexity of quicksort?",
        options: ["O(log n)", "O(n)", "O(n log n)", "O(nÂ²)"],
        answer: 3,
        explanation: "Worst-case quicksort complexity is O(nÂ²)."
    },
    {
        id: 12,
        level: "Advanced",
        skill: "Python",
        question: "Which Python structure is mutable?",
        options: ["Tuple", "String", "List", "Integer"],
        answer: 2,
        explanation: "Lists are mutable in Python."
    },
    {
        id: 13,
        level: "Advanced",
        skill: "Problem Solving",
        question: "Which technique stores results of overlapping subproblems?",
        options: [
            "Dynamic Programming",
            "Binary Search",
            "Sorting",
            "Hashing only"
        ],
        answer: 0,
        explanation: "Dynamic Programming stores results of overlapping subproblems."
    },
    {
        id: 14,
        level: "Advanced",
        skill: "Aptitude",
        question: "If a number is increased by 20% and then decreased by 20%, the final value is:",
        options: [
            "Same",
            "4% less",
            "4% more",
            "2% less"
        ],
        answer: 1,
        explanation: "The final value becomes 4% less than the original."
    },
    {
        id: 15,
        level: "Advanced",
        skill: "DSA",
        question: "Which traversal uses a queue?",
        options: ["DFS", "BFS", "Binary Search", "Quick Sort"],
        answer: 1,
        explanation: "BFS uses a queue."
    },

    {
        id: 16,
        level: "Basic",
        skill: "Aptitude",
        question: "What is 50% of 80?",
        options: ["20", "30", "40", "50"],
        answer: 2,
        explanation: "50% of 80 is 40."
    },
    {
        id: 17,
        level: "Basic",
        skill: "Python",
        question: "Which symbol starts a comment in Python?",
        options: ["//", "#", "/*", "$"],
        answer: 1,
        explanation: "Python comments start with #."
    },
    {
        id: 18,
        level: "Basic",
        skill: "DSA",
        question: "Which structure uses LIFO?",
        options: ["Queue", "Stack", "Graph", "Array"],
        answer: 1,
        explanation: "Stack follows Last In First Out."
    },
    {
        id: 19,
        level: "Basic",
        skill: "Problem Solving",
        question: "What comes next: 5, 10, 15, 20, ?",
        options: ["21", "22", "25", "30"],
        answer: 2,
        explanation: "The pattern increases by 5."
    },
    {
        id: 20,
        level: "Basic",
        skill: "Aptitude",
        question: "What is 100 divided by 4?",
        options: ["20", "25", "30", "40"],
        answer: 1,
        explanation: "100 / 4 equals 25."
    },

    {
        id: 21,
        level: "Intermediate",
        skill: "Python",
        question: "Which function converts a string into an integer?",
        options: ["str()", "float()", "int()", "list()"],
        answer: 2,
        explanation: "int() converts compatible values to integers."
    },
    {
        id: 22,
        level: "Intermediate",
        skill: "DSA",
        question: "Which search requires sorted data?",
        options: ["Linear Search", "Binary Search", "DFS", "BFS"],
        answer: 1,
        explanation: "Binary Search requires sorted data."
    },
    {
        id: 23,
        level: "Intermediate",
        skill: "Aptitude",
        question: "What is the average of 10 and 20?",
        options: ["10", "15", "20", "30"],
        answer: 1,
        explanation: "Average = (10 + 20) / 2 = 15."
    },
    {
        id: 24,
        level: "Intermediate",
        skill: "Problem Solving",
        question: "Which method checks every possible solution?",
        options: ["Brute Force", "BFS only", "Binary Search", "Hashing"],
        answer: 0,
        explanation: "Brute Force checks possible solutions directly."
    },
    {
        id: 25,
        level: "Intermediate",
        skill: "Python",
        question: "Which keyword exits a loop immediately?",
        options: ["continue", "stop", "break", "exitloop"],
        answer: 2,
        explanation: "break immediately terminates the loop."
    },

    {
        id: 26,
        level: "Advanced",
        skill: "DSA",
        question: "Which data structure is commonly used for DFS?",
        options: ["Queue", "Stack", "Heap only", "HashMap only"],
        answer: 1,
        explanation: "DFS uses a stack directly or through recursion."
    },
    {
        id: 27,
        level: "Advanced",
        skill: "Python",
        question: "What does list comprehension create?",
        options: [
            "A new list",
            "Only a tuple",
            "Only a dictionary",
            "A class"
        ],
        answer: 0,
        explanation: "List comprehension creates a new list."
    },
    {
        id: 28,
        level: "Advanced",
        skill: "Problem Solving",
        question: "Which approach is useful when subproblems overlap?",
        options: [
            "Dynamic Programming",
            "Random Guessing",
            "Only Sorting",
            "Compilation"
        ],
        answer: 0,
        explanation: "Dynamic Programming is useful for overlapping subproblems."
    },
    {
        id: 29,
        level: "Advanced",
        skill: "Aptitude",
        question: "A product costs 500 and has a 10% discount. Selling price is:",
        options: ["450", "460", "480", "490"],
        answer: 0,
        explanation: "10% of 500 is 50, so the price is 450."
    },
    {
        id: 30,
        level: "Advanced",
        skill: "DSA",
        question: "What is the time complexity of accessing an array element by index?",
        options: ["O(1)", "O(log n)", "O(n)", "O(nÂ²)"],
        answer: 0,
        explanation: "Array index access is O(1)."
    }
];


let assessmentQuestions = [];
let currentQuestion = 0;
let userAnswers = {};
let mcqScore = 0;
let assessmentTimer = null;
let codingTime = 20 * 60;
let codingTimerInterval = null;

let codingResults = {
    problem1: null,
    problem2: null
};

let codingTestSummaries = {
    problem1: null,
    problem2: null
};

function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}


function getQuestionsByLevel(level) {
    return shuffle(
        questionBank.filter(question => question.level === level)
    ).slice(0, 5);
}


function getAssessmentQuestions() {
    return [
        ...getQuestionsByLevel("Basic"),
        ...getQuestionsByLevel("Intermediate"),
        ...getQuestionsByLevel("Advanced")
    ];
}


function startAssessment() {
    assessmentQuestions = getAssessmentQuestions();

    currentQuestion = 0;
    userAnswers = {};

    codingResults = {
        problem1: 0,
        problem2: 0
    };

    codingTestSummaries = {
    problem1: null,
    problem2: null
    };

    startSection.style.display = "none";
    assessmentSection.style.display = "block";

    renderQuestion();
    startTimer();
}


function renderQuestion() {
    const question = assessmentQuestions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${assessmentQuestions.length}`;

    levelInfo.textContent =
        `${question.level} â€¢ ${question.skill}`;

    progressBar.style.width =
        `${((currentQuestion + 1) / assessmentQuestions.length) * 100}%`;

    let html = `
        <div class="question-card">
            <h3>${question.question}</h3>
            <div class="options">
    `;

    question.options.forEach((option, index) => {
        const checked =
            userAnswers[question.id] === index
                ? "checked"
                : "";

        html += `
            <label class="option">
                <input
                    type="radio"
                    name="answer"
                    value="${index}"
                    ${checked}
                >
                <span>${option}</span>
            </label>
        `;
    });

    html += `
            </div>
        </div>
    `;

    questionContainer.innerHTML = html;

    previousButton.disabled = currentQuestion === 0;

    if (currentQuestion === assessmentQuestions.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-flex";
    } else {
        nextButton.style.display = "inline-flex";
        submitButton.style.display = "none";
    }
}


function saveCurrentAnswer() {
    const selected = document.querySelector(
        'input[name="answer"]:checked'
    );

    if (selected) {
        const question =
            assessmentQuestions[currentQuestion];

        userAnswers[question.id] =
            Number(selected.value);
    }
}


function startTimer() {
    let timeLeft = 15 * 60;

    clearInterval(assessmentTimer);

    assessmentTimer = setInterval(() => {
        const minutes =
            Math.floor(timeLeft / 60);

        const seconds =
            timeLeft % 60;

        timerElement.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        if (timeLeft <= 0) {
            clearInterval(assessmentTimer);
            submitMCQ();
        }

        timeLeft--;

    }, 1000);
}


function submitMCQ() {
    saveCurrentAnswer();

    clearInterval(assessmentTimer);

    mcqScore = 0;

    assessmentQuestions.forEach(question => {
        if (
            userAnswers[question.id] ===
            question.answer
        ) {
            mcqScore++;
        }
    });

    assessmentSection.style.display = "none";
    codingSection.style.display = "block";

    startCodingTimer();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function startCodingTimer() {
    codingTime = 20 * 60;

    clearInterval(codingTimerInterval);

    updateCodingTimer();

    codingTimerInterval = setInterval(() => {
        codingTime--;

        updateCodingTimer();

        if (codingTime <= 0) {
            clearInterval(codingTimerInterval);

            alert("Coding time is over.");

            submitCodingSection();
        }

    }, 1000);
}


function updateCodingTimer() {
    const minutes =
        Math.floor(codingTime / 60);

    const seconds =
        codingTime % 60;

    document.getElementById("codingTimer").textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}


async function runCode(code, language, input, resultBox) {
    if (!code.trim()) {
        resultBox.textContent =
            "Please enter code first.";

        return;
    }

    resultBox.textContent =
        "Running...";

    try {
        const response = await fetch(
            `${API_URL}/run-code`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    code: code,
                    language: language,
                    input: input
                })
            }
        );

        const data = await response.json();

        if (data.success) {
            resultBox.textContent =
                `Output:\n${data.output}`;
        } else {
            resultBox.textContent =
                `Error:\n${data.output}`;
        }

    } catch (error) {
        resultBox.textContent =
            "Could not connect to backend. Make sure FastAPI is running.";
    }
}


async function submitCode(
    problemId,
    code,
    language,
    resultBox,
    testResultBox
) {
    const problemKey =
    problemId === 1 ? "problem1" : "problem2";

    codingTestSummaries[problemKey] = null;

    if (!code.trim()) {
        testResultBox.textContent =
            "Please enter code first.";

        return 0;
    }

    testResultBox.textContent =
        "Running hidden test cases...";

    try {
        const response = await fetch(
            `${API_URL}/evaluate-code`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    problem_id: problemId,
                    code: code,
                    language: language
                })
            }
        );

        const data = await response.json();

        if (!data.success) {
            testResultBox.textContent =
                data.message || "Evaluation failed.";

            return 0;
        }

        const score = Number(data.score);

        codingTestSummaries[problemKey] = {
            passed: Number(data.passed),
            total: Number(data.total),
            score: score
        };

        testResultBox.innerHTML = `
            <strong>Hidden Test Results</strong><br>
            Language: ${data.language.toUpperCase()}<br>
            Passed: ${data.passed}/${data.total}<br>
            Score: ${score}%
        `;

        return score;

    } catch (error) {
        testResultBox.textContent =
            "Could not connect to backend.";

        return 0;
    }
}


runButton1.addEventListener("click", () => {
    runCode(
        codeEditor1.value,
        language1.value,
        customInput1.value,
        resultBox1
    );
});


runButton2.addEventListener("click", () => {
    runCode(
        codeEditor2.value,
        language2.value,
        customInput2.value,
        resultBox2
    );
});


resetButton1.addEventListener("click", () => {
    codeEditor1.value = "";
    customInput1.value = "10 5 8 20 15";

    resultBox1.textContent =
        "Output will appear here.";

    testResultBox1.textContent = "";
});


resetButton2.addEventListener("click", () => {
    codeEditor2.value = "";
    customInput2.value = "swiss";

    resultBox2.textContent =
        "Output will appear here.";

    testResultBox2.textContent = "";
});


submitCodeButton1.addEventListener("click", async () => {
    codingResults.problem1 =
        await submitCode(
            1,
            codeEditor1.value,
            language1.value,
            resultBox1,
            testResultBox1
        );
});


submitCodeButton2.addEventListener("click", async () => {
    codingResults.problem2 =
        await submitCode(
            2,
            codeEditor2.value,
            language2.value,
            resultBox2,
            testResultBox2
        );
});


async function submitCodingSection() {
    if (codingSubmissionInProgress) return;

    codingSubmissionInProgress = true;
    submitCodingButton.disabled = true;
    submitCodingButton.textContent = "Submitting...";

    clearInterval(codingTimerInterval);

    try {
        const problem1Score = await submitCode(
            1,
            codeEditor1.value,
            language1.value,
            resultBox1,
            testResultBox1
        );

        const problem2Score = await submitCode(
            2,
            codeEditor2.value,
            language2.value,
            resultBox2,
            testResultBox2
        );

        codingResults.problem1 = problem1Score;
        codingResults.problem2 = problem2Score;

        await showFinalResult();

    } catch (error) {
        console.error("Coding submission failed:", error);

        alert(
            "Could not submit the coding section. " +
            "Check the browser Console and backend."
        );

    } finally {
        codingSubmissionInProgress = false;
        submitCodingButton.disabled = false;
        submitCodingButton.textContent = "Submit Coding Section";
    }
}


function calculateSkillProfile() {
    const skills = {
        "Aptitude": {
            correct: 0,
            total: 0
        },

        "Python": {
            correct: 0,
            total: 0
        },

        "DSA": {
            correct: 0,
            total: 0
        },

        "Problem Solving": {
            correct: 0,
            total: 0
        }
    };


    assessmentQuestions.forEach(question => {
        if (!skills[question.skill]) {
            return;
        }

        skills[question.skill].total++;

        if (
            userAnswers[question.id] ===
            question.answer
        ) {
            skills[question.skill].correct++;
        }
    });


    return skills;
}


function displaySkillProfile() {
    const skills =
        calculateSkillProfile();

    // This container is optional in the current assessment.html.
    if (!skillProfileContainer) return;

    skillProfileContainer.innerHTML = "";

    Object.entries(skills).forEach(
        ([skill, data]) => {

            const percentage =
                data.total === 0
                    ? 0
                    : Math.round(
                        (data.correct / data.total) * 100
                    );

            const html = `
                <div class="skill-result">

                    <div>
                        <strong>${skill}</strong>
                        <span>${percentage}%</span>
                    </div>

                    <div class="skill-bar">
                        <div
                            class="skill-progress"
                            style="width:${percentage}%">
                        </div>
                    </div>

                    <small>
                        ${data.correct}/${data.total} correct
                    </small>

                </div>
            `;

            skillProfileContainer.innerHTML += html;
        }
    );
}


function displaySkillGapRecommendations(codingAverage) {
    const skillData = calculateSkillProfile();

    const scores = {
        "Aptitude": skillData["Aptitude"].total
            ? (skillData["Aptitude"].correct /
               skillData["Aptitude"].total) * 100
            : 0,

        "Python": skillData["Python"].total
            ? (skillData["Python"].correct /
               skillData["Python"].total) * 100
            : 0,

        "DSA": skillData["DSA"].total
            ? (skillData["DSA"].correct /
               skillData["DSA"].total) * 100
            : 0,

        "Problem Solving": skillData["Problem Solving"].total
            ? (skillData["Problem Solving"].correct /
               skillData["Problem Solving"].total) * 100
            : 0,

        "Coding": codingAverage
    };

    const recommendations = {
        "Aptitude": [
            "Practice percentages, ratios, averages and time-and-work problems.",
            "Solve 10 aptitude questions daily and review mistakes."
        ],
        "Python": [
            "Revise variables, data types, conditions, loops and functions.",
            "Write small Python programs and practise lists and dictionaries."
        ],
        "DSA": [
            "Study arrays, strings, stacks, queues and linked lists.",
            "Practise searching, sorting and time-complexity questions."
        ],
        "Problem Solving": [
            "Break each problem into smaller steps before coding.",
            "Practise dry runs, edge cases and logical reasoning."
        ],
        "Coding": [
            "Solve beginner-level coding problems regularly.",
            "Test your solutions with different inputs and edge cases."
        ]
    };

    const skillGaps = Object.entries(scores)
        .filter(([skill, score]) => score < 80)
        .sort((a, b) => a[1] - b[1]);

    let container = document.getElementById(
        "skillGapRecommendations"
    );

    if (!container) {
        container = document.createElement("section");
        container.id = "skillGapRecommendations";
        container.className = "result-card";

        // Place recommendations before the question review.
        const reviewCard = reviewContainer?.parentElement;

        if (reviewCard && resultSection.contains(reviewCard)) {
            resultSection.insertBefore(container, reviewCard);
        } else {
            resultSection.appendChild(container);
        }
    }

    let html = `
        <h3>Personalized Skill-Gap Recommendations</h3>
        <p>
            Recommendations are based on your MCQ and coding assessment scores.
        </p>
    `;

    if (skillGaps.length === 0) {
        html += `
            <p>
                Great work! All assessed skills scored 80% or above.
                Continue practising to maintain your performance.
            </p>
        `;
    } else {
        skillGaps.forEach(([skill, score]) => {
            const level = score < 60
                ? "Needs improvement"
                : "Develop further";

            html += `
                <div class="skill-result">
                    <strong>${skill}: ${score.toFixed(1)}%</strong>
                    <p>${level}</p>
                    <ul>
                        ${recommendations[skill].map(item =>
                            `<li>${item}</li>`
                        ).join("")}
                    </ul>
                </div>
            `;
        });
    }

    container.innerHTML = html;
}

function displayReview() {
    reviewContainer.innerHTML = "";

    assessmentQuestions.forEach(
        (question, index) => {

            const userAnswer =
                userAnswers[question.id];

            const isCorrect =
                userAnswer === question.answer;

            const userAnswerText =
                userAnswer !== undefined
                    ? question.options[userAnswer]
                    : "Not answered";

            const correctAnswerText =
                question.options[question.answer];

            const html = `
                <div class="review-item ${
                    isCorrect
                        ? "correct"
                        : "incorrect"
                }">

                    <strong>
                        Q${index + 1}. ${question.question}
                    </strong>

                    <p>
                        Your answer:
                        ${userAnswerText}
                    </p>

                    <p>
                        Correct answer:
                        ${correctAnswerText}
                    </p>

                    <p>
                        Explanation:
                        ${question.explanation}
                    </p>

                </div>
            `;

            reviewContainer.innerHTML += html;
        }
    );
}


async function displayAttemptComparison(currentAssessment, currentPrediction) {
    const card = document.getElementById("attemptComparisonCard");

    try {
        const response = await fetch(`${API_URL}/assessment-history`);

        if (!response.ok) return;

        const data = await response.json();
        const history = data.history || [];

        const currentName = (studentProfile?.name || "").trim().toLowerCase();
        const currentBranch = (studentProfile?.branch || "").trim().toLowerCase();

        // Find the previous attempt for this same student.
        const previous = history.find(item =>
            (item.student_name || "").trim().toLowerCase() === currentName &&
            (item.branch || "").trim().toLowerCase() === currentBranch &&
            item.completed_at !== currentAssessment.completedAt
        );

        if (!previous || !card) return;

        const previousScore = Number(previous.overall_assessment_score || 0);
        const currentScore = Number(currentAssessment.overallAssessmentScore || 0);
        const previousProbability = Number(previous.placement_probability || 0);
        const currentProbability = Number(currentPrediction.placement_probability || 0);

        document.getElementById("previousAttemptScore").textContent = `${previousScore}%`;
        document.getElementById("currentAttemptScore").textContent = `${currentScore}%`;

        const scoreChange = currentScore - previousScore;
        document.getElementById("attemptScoreChange").textContent =
            `${scoreChange > 0 ? "+" : ""}${scoreChange.toFixed(1)}%`;

        document.getElementById("previousAttemptProbability").textContent =
            `${previousProbability}%`;
        document.getElementById("currentAttemptProbability").textContent =
            `${currentProbability}%`;

        const probabilityChange = currentProbability - previousProbability;
        let message = "Your results stayed the same.";

        if (scoreChange > 0) message = "Great! Your assessment score improved.";
        else if (scoreChange < 0) message = "Your score decreased. Review your skill gaps and practise.";
        else if (probabilityChange > 0) message = "Your placement probability improved.";

        document.getElementById("attemptProgressMessage").textContent = message;
        card.style.display = "block";
    } catch (error) {
        console.error("Could not display attempt comparison:", error);
    }
}

function saveAssessmentData(
    mcqPercentage,
    codingAverage,
    overallScore
) {
    const skillData = calculateSkillProfile();

    const skillProfile = {};

    Object.entries(skillData).forEach(
        ([skill, data]) => {

            skillProfile[skill] =
                data.total === 0
                    ? 0
                    : Math.round(
                        (data.correct / data.total) * 100
                    );
        }
    );

    const assessmentData = {
        mcqScore: mcqScore,

        totalMCQQuestions:
            assessmentQuestions.length,

        mcqPercentage:
            Number(mcqPercentage.toFixed(1)),

        codingScores: {
            problem1: codingResults.problem1,
            problem2: codingResults.problem2
        },

        codingAverage:
            Number(codingAverage.toFixed(1)),

        overallAssessmentScore:
            Number(overallScore.toFixed(1)),

        skillProfile: skillProfile,
        questions: assessmentQuestions,
        userAnswers: userAnswers,
        codingTestSummaries: codingTestSummaries,

        completedAt:
            new Date().toISOString()
    };

    sessionStorage.setItem(
        "assessmentData",
        JSON.stringify(assessmentData)
    );
}


function displayCodingTestSummaries() {
    const summaries = [
        ["codingProblem1Tests", codingTestSummaries.problem1],
        ["codingProblem2Tests", codingTestSummaries.problem2]
    ];

    summaries.forEach(([elementId, summary]) => {
        const element = document.getElementById(elementId);

        if (!element) return;

        if (summary && summary.total > 0) {
            element.textContent =
                `${summary.passed}/${summary.total} passed (${summary.score}%)`;
        } else {
            element.textContent = "No test results available";
        }
    });
}


async function showFinalResult() {
    const mcqPercentage =
        (mcqScore / assessmentQuestions.length) * 100;

    const codingAverage =
        (codingResults.problem1 + codingResults.problem2) / 2;
    
    document.getElementById("codingProblem1Result").textContent =
        `${codingResults.problem1}%`;

    document.getElementById("codingProblem2Result").textContent =
        `${codingResults.problem2}%`;

    document.getElementById("codingAverageResult").textContent =
        `${codingAverage.toFixed(1)}%`;


    const overallScore =
        (mcqPercentage * 0.5) + (codingAverage * 0.5);

    const skillData = calculateSkillProfile();

    const aptitudeScore =
        skillData["Aptitude"].total === 0
            ? 0
            : (skillData["Aptitude"].correct /
                skillData["Aptitude"].total) * 100;

    const dsaScore =
        skillData["DSA"].total === 0
            ? 0
            : (skillData["DSA"].correct /
                skillData["DSA"].total) * 100;

    // Display assessment results even if the ML API fails
    const incorrect =
        assessmentQuestions.length - mcqScore;

    scoreText.textContent =
        `${mcqScore}/${assessmentQuestions.length}`;

    percentageText.textContent =
        `${overallScore.toFixed(1)}%`;

    correctText.textContent = mcqScore;
    incorrectText.textContent = incorrect;

    performanceText.textContent =
        `MCQ: ${mcqPercentage.toFixed(1)}% | ` +
        `Coding: ${codingAverage.toFixed(1)}%`;

    displaySkillProfile();
    displayCodingTestSummaries();
    displayReview();

    saveAssessmentData(
        mcqPercentage,
        codingAverage,
        overallScore
    );

    codingSection.style.display = "none";
    resultSection.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    
    // Fetch placement prediction and skill-gap recommendations
    try {

        if (!studentProfile) {
            throw new Error(
                "Student profile missing. Return to dashboard and enter your profile."
            );
        }

        const response = await fetch(
            `${API_URL}/predict-assessment`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    branch: studentProfile.branch,
                    cgpa: Number(studentProfile.cgpa),
                    backlogs: Number(studentProfile.backlogs),
                    coding_skills: codingAverage / 10,
                    dsa_score: dsaScore / 10,
                    aptitude_score: aptitudeScore
                })
            }
        );

        if (!response.ok) {
            throw new Error(
                `Prediction API failed: ${response.status}`
            );
        }

        const predictionData = await response.json();

        const savedAssessment = JSON.parse(
            sessionStorage.getItem("assessmentData") || "{}"
        );

        savedAssessment.predictionData = predictionData;

        sessionStorage.setItem(
            "assessmentData",
            JSON.stringify(savedAssessment)
        );

        document.getElementById("mlPredictionStatus").textContent =
            predictionData.status ?? "Prediction received";

        document.getElementById("mlProbability").textContent =
            `${predictionData.placement_probability}%`;

        displayBackendSkillGaps(predictionData);

                const saveResponse = await fetch(
                    `${API_URL}/save-assessment`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            student_name: studentProfile.name || null,
                            branch: studentProfile.branch,
                            college_tier: studentProfile.college_tier || null,
                            cgpa: Number(studentProfile.cgpa),
                            backlogs: Number(studentProfile.backlogs),

                            mcq_score: savedAssessment.mcqScore,
                            total_mcq_questions: savedAssessment.totalMCQQuestions,
                            mcq_percentage: savedAssessment.mcqPercentage,

                            coding_problem1:
                                savedAssessment.codingScores?.problem1?.score ?? 0,
                            coding_problem2:
                                savedAssessment.codingScores?.problem2?.score ?? 0,

                            coding_average: savedAssessment.codingAverage,
                            overall_assessment_score:
                                savedAssessment.overallAssessmentScore,

                            prediction_status: predictionData.status,
                            placement_probability:
                                predictionData.placement_probability,

                            skill_gaps: predictionData.skill_gaps || [],
                            skill_profile: savedAssessment.skillProfile || {},
                            completed_at: savedAssessment.completedAt || null
                        })
                    }
                );

                if (!saveResponse.ok) {
                    throw new Error("Failed to save assessment to SQLite");
                }

                console.log(
                    "Assessment saved to SQLite:",
                    await saveResponse.json()
                );

                await displayAttemptComparison(savedAssessment, predictionData);

    } catch (error) {
        console.error("ML prediction error:", error);

        document.getElementById("mlPredictionStatus").textContent =
            "ML prediction unavailable";

        document.getElementById("mlProbability").textContent =
            "Try again after starting the backend";
    }
}

function restoreAssessmentResults() {
    let saved;

    try {
        saved = JSON.parse(
            sessionStorage.getItem("assessmentData") || "null"
        );
    } catch (error) {
        console.error("Could not restore assessment results:", error);
        return;
    }

    // Only restore when a completed assessment exists.
    if (!saved || !saved.predictionData) return;

    if (
        !Array.isArray(saved.questions) ||
        !saved.userAnswers ||
        !saved.codingScores
    ) {
        return;
    }

    // Restore the assessment state needed by the existing display functions.
    assessmentQuestions = saved.questions;
    userAnswers = saved.userAnswers;
    codingResults.problem1 = saved.codingScores.problem1 ?? 0;
    codingResults.problem2 = saved.codingScores.problem2 ?? 0;

    if (saved.codingTestSummaries) {
        codingTestSummaries.problem1 =
            saved.codingTestSummaries.problem1;
        codingTestSummaries.problem2 =
            saved.codingTestSummaries.problem2;
    }

    const prediction = saved.predictionData;
    const total = saved.totalMCQQuestions ?? assessmentQuestions.length;
    const mcqScoreValue = saved.mcqScore ?? 0;
    const incorrect = total - mcqScoreValue;

    scoreText.textContent = `${mcqScoreValue}/${total}`;
    percentageText.textContent =
        `${Number(saved.overallAssessmentScore ?? 0).toFixed(1)}%`;
    correctText.textContent = mcqScoreValue;
    incorrectText.textContent = incorrect;

    performanceText.textContent =
        `MCQ: ${Number(saved.mcqPercentage ?? 0).toFixed(1)}% | ` +
        `Coding: ${Number(saved.codingAverage ?? 0).toFixed(1)}%`;

    document.getElementById("codingProblem1Result").textContent =
        `${codingResults.problem1}%`;
    document.getElementById("codingProblem2Result").textContent =
        `${codingResults.problem2}%`;
    document.getElementById("codingAverageResult").textContent =
        `${Number(saved.codingAverage ?? 0).toFixed(1)}%`;

    displaySkillProfile();
    displayCodingTestSummaries();
    displayReview();
    displayBackendSkillGaps(prediction);

    document.getElementById("mlPredictionStatus").textContent =
        prediction.status ?? "Prediction received";
    document.getElementById("mlProbability").textContent =
        `${prediction.placement_probability}%`;

    codingSection.style.display = "none";
    assessmentSection.style.display = "none";
    startSection.style.display = "none";
    resultSection.style.display = "block";
}
// Prevent duplicate submissions if the button is clicked repeatedly.
let codingSubmissionInProgress = false;

const params = new URLSearchParams(window.location.search);

if (params.get("new") !== "1") {
    restoreAssessmentResults();
}


// Connect assessment buttons after all functions are defined.
startButton.addEventListener("click", startAssessment);

previousButton.addEventListener("click", () => {
    saveCurrentAnswer();
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
});

nextButton.addEventListener("click", () => {
    saveCurrentAnswer();
    if (currentQuestion < assessmentQuestions.length - 1) {
        currentQuestion++;
        renderQuestion();
    }
});

submitButton.addEventListener("click", submitMCQ);

submitCodingButton.addEventListener(
    "click",
    submitCodingSection
);

function displayBackendSkillGaps(data) {
    let container = document.getElementById(
        "skillGapRecommendations"
    );

    if (!container) {
        container = document.createElement("section");
        container.id = "skillGapRecommendations";
        container.className = "result-card";

        const reviewCard = reviewContainer?.parentElement;

        if (reviewCard && resultSection.contains(reviewCard)) {
            resultSection.insertBefore(container, reviewCard);
        } else {
            resultSection.appendChild(container);
        }
    }

    const gaps = data.skill_gaps || [];

    let html = `
        <h3>Personalized Skill-Gap Recommendations</h3>
        <p>${data.skill_gap_summary || "Assessment skill analysis"}</p>
    `;

    if (gaps.length === 0) {
        html += `
            <p>
                No skill gaps were identified against the configured
                baselines. Continue practising to maintain your skills.
            </p>
        `;
    } else {
        html += "<div class='skill-gap-list'>";

        gaps.forEach(gap => {
            html += `
                <div class="skill-result">
                    <strong>${gap.skill.replaceAll("_", " ")}</strong>
                    <p>Current score: ${gap.current_score}</p>
                    <p>Target score: ${gap.target_score}</p>
                    <p>Recommendation: ${gap.recommendation}</p>
                </div>
            `;
        });

        html += "</div>";
    }

    container.innerHTML = html;
}


function enableAutoIndent(editor) {
    editor.addEventListener("keydown", function (event) {
        // Tab key: insert 4 spaces
        if (event.key === "Tab") {
            event.preventDefault();

            const start = editor.selectionStart;
            const end = editor.selectionEnd;

            editor.setRangeText(
                "    ",
                start,
                end,
                "end"
            );
            return;
        }

        // Enter key: continue indentation
        if (event.key === "Enter") {
            event.preventDefault();

            const start = editor.selectionStart;
            const beforeCursor =
                editor.value.substring(0, start);

            const currentLine =
                beforeCursor.split("\n").pop();

            const indentation =
                currentLine.match(/^[ \t]*/)[0];

            // Add extra indentation after a Python colon
            const extraIndent =
                currentLine.trimEnd().endsWith(":")
                    ? "    "
                    : "";

            const insertion =
                "\n" + indentation + extraIndent;

            editor.setRangeText(
                insertion,
                start,
                editor.selectionEnd,
                "end"
            );
        }
    });
}

enableAutoIndent(codeEditor1);
enableAutoIndent(codeEditor2);

retakeButton.addEventListener("click", () => {
    sessionStorage.removeItem("assessmentData");
    location.reload();
});

