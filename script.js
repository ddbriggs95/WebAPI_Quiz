//create variables 
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionsContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.querySelectorAll('.btn');
const answerButtonsElement = document.querySelector('#answer-buttons');


var timeEl = document.querySelector(".time");
var secondsLeft = 60;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = "TIMER:" + secondsLeft;
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

//create variable to store all questions in 
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
            question: 'Who is the drummer for the band Phish?',
            answers: [
                {text: 'Jonathan Fishman', correct: true},
                {text: 'Bon Jovi', correct: false},
                {text: 'Hector Mann', correct: false},
                {text: 'Reese Witherspoon', correct: false}
            ],
            correct: "Jonathan Fishman"
     },

        {
            question: 'Who is the lead singer for Tedeschi Trucks Band?',
            answers: [
                {text: 'Bob Weir', correct: false},
                {text: 'Robert Plant', correct: false},
                {text: 'Caleb Butler', correct: false},
                {text: 'Susan Tedeschi', correct: true}
            ],
            correct: 'Susan Tedeschi'
        },

        {
            question: 'Who is the percussionist for the band Widespread Panic?',
            answers: [
                {text: 'Willie Nelson', correct: false},
                {text: 'JoJo Herman', correct: true},
                {text: 'Brendan Bayliss', correct: false},
                {text: 'Luke Skywalker', correct: false}
            ],
            correct: 'JoJo Herman'
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

nextButton.addEventListener('click', nextQuestion);
//function to load next question when user clicks next
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