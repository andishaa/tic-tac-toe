const PlayerFactory = (name, marker) => {
    let moves = [];
    let winner = false;

    return {
        name,
        marker,
        moves,
        winner
    };
};

const gameBoard = (() => {
    const boxContent = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    const winConditions = [
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['0', '4', '8'],
        ['2', '4', '6']
    ]

    const player1 = PlayerFactory('ivan', 'X');
    const player2 = PlayerFactory('misho', 'O');
    
    let player1Turn = true;
    let endGame = false;
    let moveCounter = 0;
    const totalMoves = 9;
    let draw = false;

    return {
        boxContent,
        winConditions,
        player1,
        player2,
        player1Turn,
        moveCounter,
        draw,
        endGame,
        totalMoves
    };
})();

const game = (() => {
    const markBox = chosenBox => {
        //prevent the player from choosing an already marked box
        if (gameBoard.boxContent[chosenBox] !== '') {
            return;
        }

        gameBoard.moveCounter++;

        //if all available moves are made and there is still no winner game is draw
        if (gameBoard.moveCounter === gameBoard.totalMoves && (!gameBoard.player1.winner || !gameBoard.player2.winner)) {
            gameBoard.draw = true;
        }

        if (gameBoard.player1Turn === true) {
            gameBoard.boxContent[chosenBox] = gameBoard.player1.marker;
            gameBoard.player1.moves.push(chosenBox);
            gameBoard.player1Turn = false;
        } else {
            gameBoard.boxContent[chosenBox] = gameBoard.player2.marker;
            gameBoard.player2.moves.push(chosenBox);
            gameBoard.player1Turn = true;
        }
    };

    const play = () => {
        const gameBoardContainer = document.querySelector('.gameBoard');
        gameBoardContainer.addEventListener('click', (e) => {
            if (!gameBoard.endGame) {
                let chosenBox = e.target.id;
                markBox(chosenBox);
                checkWinner();
                checkGameEnd();
                renderGameBoard.render();
            };
        });
    };

    const checkWinner = () => {
        gameBoard.winConditions.forEach(condition => {
            if (condition.every(move => gameBoard.player1.moves.includes(move))) {
                gameBoard.player1.winner = true;
                console.log('plyaer 1 wins');
            }
            if (condition.every(move => gameBoard.player2.moves.includes(move))) {
                gameBoard.player2.winner = true;
                console.log('player 2 wins');
            }
        })
    }

    const checkGameEnd = () => {
        if (gameBoard.player1.winner || gameBoard.player2.winner || gameBoard.draw) {
            gameBoard.endGame = true;
        };
    };

    return {
        play
    };
})();

const renderGameBoard = (() => {
    const boxes = document.querySelectorAll('.box');
    const render = () => gameBoard.boxContent.forEach((markedBox, index) => {
        if (markedBox !== '') {
            boxes[index].textContent = markedBox;
        }
    });

    return {
        render
    }
})();

function init() {
    game.play();
}
init();