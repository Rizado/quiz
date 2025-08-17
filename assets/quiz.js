let currentQuestion = 0;
let score = 0;
let selectedAnswers = [];

function loadQuestion() {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';
    if (currentQuestion < questions.length) {
        let answers = [];
        const questionData = questions[currentQuestion];
        questionData.options.forEach((item, index) => answers.push({'id': index, 'answer': item}));
        answers = answers.sort(() => Math.random() - 0.5)
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question active';
        questionDiv.innerHTML = `
                    <div class="question-number">Вопрос ${currentQuestion + 1} из ${questions.length}</div>
                    <h2>${questionData.question}</h2>
                    <div class="options">
                        ${answers.map((option) =>
            `<div class="option" onclick="selectAnswer(${option.id})" id="answer_${option.id}">${option.answer}</div>`
        ).join('')}
                    </div>
                    <button class="btn" id="nextBtn" onclick="nextQuestion()">Далее</button>
                `;
        quizContainer.appendChild(questionDiv);
        updateProgress();
    } else {
        showResult();
    }
}

function selectAnswer(index) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {option.classList.remove('selected'); if (option.id === `answer_${index}`) option.classList.add('selected')});
    selectedAnswers[currentQuestion] = index;
    document.getElementById('nextBtn').classList.add('show');
}

function nextQuestion() {
    const selectedIndex = selectedAnswers[currentQuestion];
    const questionData = questions[currentQuestion];

    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.style.pointerEvents = 'none';
        if (option.id === `answer_${questionData.answer}`) {
            option.classList.add('correct');
        } else if (option.id === `answer_${selectedIndex}` && selectedIndex !== questionData.answer) {
            option.classList.add('incorrect');
        }
    });

    if (selectedIndex === questionData.answer) {
        score++;
    }

    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
    }, 1000);
}

function updateProgress() {
    const progress = document.getElementById('progress');
    const percentage = (currentQuestion / questions.length) * 100;
    progress.style.width = percentage + '%';
}

function showResult() {
    updateProgress();
    document.getElementById('quiz').style.display = 'none';
    document.querySelector('.result').style.display = 'block';
    document.getElementById('score').textContent = score;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswers = [];
    document.querySelector('.result').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    loadQuestion();
}

// Инициализация викторины
loadQuestion();

