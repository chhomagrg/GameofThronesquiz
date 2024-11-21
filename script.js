(function(){
    function buildQuiz(){
        const output = [];
    
        myQuestions.forEach(
            (currentQuestion, questionNumber) => {
    
                const answers = [];
    
                for(letter in currentQuestion.answers){

                    answers.push(
                        `<label>
                            <input type="radio" name="question${questionNumber}" value="${letter}"/>
                            ${letter} :
                            ${currentQuestion.answers[letter]}
                        `
                    );
                }
    
                output.push(
                    `<div class="slide">
                        <div class="question"> ${currentQuestion.question} </div>
                        <div class="answers"> ${answers.join("")} </div>
                    </div>`
                );
            }
        );
    
        quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
        const answerContainers = quizContainer.querySelectorAll('.answers');
        let numCorrect = 0;
        
        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if(userAnswer === currentQuestion.correctAnswer){
                numCorrect++; 
            }
        });
    
        // Display the results 
        resultsContainer.innerHTML = `<h2>Your Score</h2>${numCorrect} out of ${myQuestions.length}`;
        
        // Hide elements while the results are being displayed
        quizContainer.style.display = "none"; 
        previousButton.style.display = "none"; 
        nextButton.style.display = "none"; 
        submitButton.style.display = "none"; 
        retakeButton.style.display = "inline-block"; 
        clearInterval(timerID); 
    }

    // Reset the quiz when retake is clicked
    function resetQuiz() {
        currentSlide = 0; 
        timeLeft = quizTime; 
        resultsContainer.innerHTML = ""; // Clear results
        quizContainer.style.display = "block"; 
        previousButton.style.display = "none"; 
        nextButton.style.display = "inline-block"; 
        submitButton.style.display = "none"; 
        retakeButton.style.display = "none"; 

        buildQuiz(); 
        slides = document.querySelectorAll(".slide"); // Refresh slides
        showSlide(currentSlide);
        timerElement.textContent = `Time Remaining: ${quizTime}s`;
        timerID = setInterval(countdown, 1000); 
    }
    
    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide'); 
        slides[n].classList.add('active-slide'); 
        currentSlide = n;
        if(currentSlide === 0){
            previousButton.style.display = 'none';
        }
        else{
            previousButton.style.display = 'inline-block'; 
        }
        if(currentSlide === slides.length-1){
            nextButton.style.display = 'none'; 
            submitButton.style.display = 'inline-block'; 
        }
        else{
            nextButton.style.display = 'inline-block'; 
            submitButton.style.display = 'none'; 
        }
    }
  
    function showNextSlide() {
        showSlide(currentSlide + 1); 
    }
  
    function showPreviousSlide() {
        showSlide(currentSlide - 1); 
    }
    
    // Update the timer
    function countdown() {
        if (timeLeft === 0) {
            clearInterval(timerID); 
            showResults(); 
        } else {
            timeLeft--; 
            timerElement.textContent = `Time Remaining: ${timeLeft}s`; // Update timer display
        }
    }
  
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const timerElement = document.getElementById("timer"); // Timer element
    const retakeButton = document.getElementById("retake"); // Retake button
    const myQuestions = [
        {
            question: "What is the name of Jon Snow's direwolf?",
            answers: {
                a: "Ghost",
                b: "Nymeria",
                c: "Summer",
                d: "Grey Wind"
            },
            correctAnswer: "a"
        },
        {
            question: "Who sits on the Iron Throne at the end of the series?",
            answers: {
                a: "Daenerys Targaryen",
                b: "Jon Snow",
                c: "Bran Stark",
                d: "Tyrion Lannister"
            },
            correctAnswer: "c"
        },
        {
            question: "What is the motto of House Stark?",
            answers: {
                a: "Fire and Blood",
                b: "Winter is Coming",
                c: "A Lannister Always Pays His Debts",
                d: "Ours is the Fury"
            },
            correctAnswer: "b"
        },
        {
            question: "Who resurrected Jon Snow?",
            answers: {
                a: "Melisandre",
                b: "Thoros of Myr",
                c: "Beric Dondarrion",
                d: "The Lord of Light"
            },
            correctAnswer: "a"
        },
        {
            question: "Which castle is the ancestral home of House Lannister?",
            answers: {
                a: "Harrenhal",
                b: "Casterly Rock",
                c: "Riverrun",
                d: "Highgarden"
            },
            correctAnswer: "b"
        }
    ];
  
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    let slides;
    let currentSlide = 0;

    const quizTime = 60; 
    let timeLeft = quizTime; 
    let timerID; 

    buildQuiz();
    slides = document.querySelectorAll(".slide"); 
    showSlide(currentSlide); 

    timerElement.textContent = `Time Remaining: ${quizTime}s`; // Initialize timer display
    timerID = setInterval(countdown, 1000); // Start countdown

    // Event listeners for buttons
    submitButton.addEventListener('click', showResults); 
    previousButton.addEventListener("click", showPreviousSlide); 
    nextButton.addEventListener("click", showNextSlide); 
    retakeButton.addEventListener("click", resetQuiz); 
})();
