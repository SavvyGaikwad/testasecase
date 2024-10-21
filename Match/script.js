document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game-board');
    const timeLeftDisplay = document.querySelector('#time-left');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let timer; // Timer variable
    let timeLeft = 20; // 20 seconds timer

    const cardArray = [
        { name: 'card1', img: 'images/distracted.jpeg' },
        { name: 'card1', img: 'images/distracted.jpeg' },
        { name: 'card2', img: 'images/drake.jpeg' },
        { name: 'card2', img: 'images/drake.jpeg' },
        { name: 'card3', img: 'images/fine.jpeg' },
        { name: 'card3', img: 'images/fine.jpeg' },
        { name: 'card4', img: 'images/rollsafe.jpeg' },
        { name: 'card4', img: 'images/rollsafe.jpeg' },
        { name: 'card5', img: 'images/success.jpeg' },
        { name: 'card5', img: 'images/success.jpeg' },
        { name: 'card6', img: 'images/a.jpeg' },
        { name: 'card6', img: 'images/a.jpeg' },
        // ...add more pairs as needed
    ];

    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        shuffle(cardArray);
        grid.innerHTML = '';
        cardsWon = [];
        timeLeft = 20; // Reset the timer
        timeLeftDisplay.textContent = timeLeft; // Display the initial time

        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }

        startTimer(); // Start the timer when the board is created
    }

    function startTimer() {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timeLeftDisplay.textContent = timeLeft; // Update the display
            } else {
                clearInterval(timer); // Stop the timer when it reaches 0
                endGame(); // Call end game function
            }
        }, 1000);
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (!cardsChosenId.includes(cardId)) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute('src', cardArray[cardId].img);
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('#game-board img');
        const firstCardId = cardsChosenId[0];
        const secondCardId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].style.visibility = 'hidden';
            cards[secondCardId].style.visibility = 'hidden';
            cards[firstCardId].removeEventListener('click', flipCard);
            cards[secondCardId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[firstCardId].setAttribute('src', 'images/blank.png');
            cards[secondCardId].setAttribute('src', 'images/blank.png');
        }

        cardsChosen = [];
        cardsChosenId = [];

        // Check if all cards have been matched
        if (cardsWon.length === cardArray.length / 2) {
            alert('Congratulations! You found them all!');
            localStorage.setItem('finalScore', cardsWon.length); // Store the score in localStorage
            localStorage.setItem('gameName', 'Match'); // Store the game name in localStorage 
            window.location.href = 'scoreboard.html?score=' + cardsWon.length + '&gameName=Match'; // Redirect to scoreboard.html
            clearInterval(timer); // Stop the timer when all cards are matched
        }
    }

    function endGame() {
        alert(`Time's up! Your score is ${cardsWon.length}.`); // Show score at the end
        localStorage.setItem('finalScore', cardsWon.length); // Store the score in localStorage
        localStorage.setItem('gameName', 'Match'); // Store the game name in localStorage 
        window.location.href = '../scoreboard.html?score=' + cardsWon.length + '&gameName=Match'; // Redirect to scoreboard.html
 // Redirect to scoreboard.html
        grid.innerHTML = ''; // Clear the game board
    }

    // Start the game directly by creating the board
    createBoard();
});
