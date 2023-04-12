//create variables 
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionsContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.querySelectorAll('.btn');
const answerButtonsElement = document.querySelector('#answer-buttons');


var timeEl = document.querySelector(".time");

// Selects element by id
// var mainEl = document.getElementById("main");

var secondsLeft = 60;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left till colorsplosion.";
    localStorage.setItem('score', secondsLeft);
    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();
    }

  }, 1000);
}



let shuffledQuestions, currentQuestionIndex;

//create variable to store all questions in an array
const questions = [
    {
        question: 'Who is the lead guitarist for the Grateful Dead?',
        answers: [
            {text: 'Jerry Garcia', correct: true},
            {text: 'Jimi Hendrix', correct: false},
            {text: 'Trey Anastasio', correct: false},
            {text: 'John Bell', correct: false}
        ],
        correct: 'Jerry Garcia'
    },
        {
            question: 'Who is the best drummer in the world?',
            answers: [
                {text: 'Jonathan Fishman', correct: true},
                {text: 'Jon bovi', correct: false},
                {text: 'Hector Mann', correct: false},
                {text: 'Dowling Briggs', correct: false}
            ],
            correct: "Jonathan Fishman"
        }
]

//Event listener when user clicks start
startButton.addEventListener('click', startGame);

function startGame() {
    setTime();
    startButton.classList.add('hide');
    // shuffledQuestions = questions.sort(() => Math.random() -.5);
    currentQuestionIndex = -1;
    questionsContainerElement.classList.remove('hide');
    nextQuestion();

}

 

function nextQuestion(){
    currentQuestionIndex++;
    if(currentQuestionIndex == questions.length) {
        var initials = prompt('Please enter initials');
        localStorage.setItem('initials', initials);
        window.location.replace("/highscore.html");
    }
    resetState();
    showQuestion(questions[currentQuestionIndex]);
    const answerButtons = document.querySelectorAll('.btn');
    console.log(answerButtons);
    for(i = 0; i < answerButtons.length; i++) {
        answerButtons[i].addEventListener('click', function() {
            console.log(this.textContent);
            console.log(questions[currentQuestionIndex]);
            if(this.textContent != questions[currentQuestionIndex].correct){
                secondsLeft -= 10;
            }
        })
    }
 
    
}

nextButton.addEventListener('click', nextQuestion);

function resetState() {
    // nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
        
    });

}



function selectAnswer() {

}