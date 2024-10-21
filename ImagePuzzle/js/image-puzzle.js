var imagePuzzle = {
    stepCount: 0,
    timerDuration: 30, // Countdown duration in seconds
    timer: null,
    score: 0, // Initialize score

    startGame: function (images, gridSize) {
        this.setImage(images, gridSize);
        $('#playPanel').show();
        $('#sortable').randomize();
        this.enableSwapping('#sortable li');
        this.stepCount = 0;
        this.score = 10; // Reset score for a new game
        this.startTimer();
    },

    enableSwapping: function (elem) {
        $(elem).draggable({
            snap: '#droppable',
            snapMode: 'outer',
            revert: "invalid",
            helper: "clone"
        });
        $(elem).droppable({
            drop: function (event, ui) {
                var $dragElem = $(ui.draggable).clone().replaceAll(this);
                $(this).replaceAll(ui.draggable);

                var currentList = $('#sortable > li').map(function (i, el) { return $(el).attr('data-value'); });
                if (isSorted(currentList)) {
                    $('#actualImageBox').empty().html($('#gameOver').html());
                    imagePuzzle.stopTimer(); // Stop the timer on game over
                    imagePuzzle.calculateScore(); // Calculate score when game is completed
                } else {
                    imagePuzzle.stepCount++;
                    $('.stepCount').text(imagePuzzle.stepCount);
                    imagePuzzle.updateScore(); // Update score with each move
                }

                imagePuzzle.enableSwapping(this);
                imagePuzzle.enableSwapping($dragElem);
            }
        });
    },

    setImage: function (images, gridSize) {
        gridSize = gridSize || 8; // If gridSize is null or not passed, default it as 4.
        var percentage = 100 / (gridSize - 1);
        var image = images[Math.floor(Math.random() * images.length)];
        $('#imgTitle').html(image.title);
        $('#actualImage').attr('src', image.src);
        $('#sortable').empty();
        for (var i = 0; i < gridSize * gridSize; i++) {
            var xpos = (percentage * (i % gridSize)) + '%';
            var ypos = (percentage * Math.floor(i / gridSize)) + '%';
            var li = $('<li class="item" data-value="' + (i) + '"></li>').css({
                'background-image': 'url(' + image.src + ')',
                'background-size': (gridSize * 100) + '%',
                'background-position': xpos + ' ' + ypos,
                'width': 700 / gridSize,
                'height': 700 / gridSize
            });
            $('#sortable').append(li);
        }
        $('#sortable').randomize();
    },

    startTimer: function () {
        var timeLeft = this.timerDuration;
        var h1 = document.getElementsByTagName('h1')[0];

        this.timer = setInterval(function () {
            if (timeLeft <= 0) {
                clearInterval(imagePuzzle.timer);
                $('#actualImageBox').empty().html($('#gameOver').html());
                alert("Time's up! Your score: 0"); // Alert on time up
                imagePuzzle.score = 0; // Set score to 0 on time up
                imagePuzzle.storeGameData(); // Store the score in localStorage
                return;
            }

            var minutes = Math.floor(timeLeft / 60);
            var seconds = timeLeft % 60;

            h1.textContent = (minutes > 9 ? minutes : '0' + minutes) + ":" + (seconds > 9 ? seconds : '0' + seconds);
            timeLeft--;
        }, 1000);
    },

    stopTimer: function () {
        clearInterval(this.timer);
    },

    updateScore: function () {
        // Reduce score based on moves made
        if (this.stepCount < 4) {
            this.score = 10 - this.stepCount; // Score decreases with moves
        } else {
            this.score = Math.max(0, 10 - (this.stepCount - 4)); // Minimum score is 0
        }
    },

    calculateScore: function () {
        // Call this function when the puzzle is completed
        this.storeGameData(); // Store the score and game name in localStorage
        this.displayScore(); // Display the final score
    },

    storeGameData: function () {
        localStorage.setItem('finalScore', this.score); // Store the score in localStorage
        localStorage.setItem('gameName', 'Image Puzzle'); // Store the game name in localStorage 

        // Redirect to scoreboard.html with query parameters
        window.location.href = '../scoreboard.html?score=' + this.score + '&gameName=Image Puzzle'; // Redirect to scoreboard.html
    },

    displayScore: function () {
        alert("Congratulations! Your score: " + this.score); // Display final score
    }
};

function isSorted(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] != i)
            return false;
    }
    return true;
}

$.fn.randomize = function (selector) {
    var $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();

    $parents.each(function () {
        $(this).children(selector).sort(function () {
            return Math.round(Math.random()) - 0.5;
        }).remove().appendTo(this);
    });
    return this;
};
