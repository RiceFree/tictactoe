const playerFactory = (name, id) => {
    const playerSymbol = _setSymbol()
    let moves = [];
    let points = 0;
    function _setSymbol() {
       return (id === 'player-one' ? 'X' : 'O');
    }
    return {name, playerSymbol, moves, points}
}


const jeff = playerFactory('jeff', 'player-one')
const computer = playerFactory('computer', 'computer')

const gameBoard = (() => {
    //private
    playerOne = jeff;
    playerTwo = computer;
    let displayCurrentPlayer;
    let displayPointsOne;
    let displayPointsTwo;
    currentPlayer = playerOne;
    let gameBoard = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3']
    //cacheDOM
    const $body = document.querySelector('body');
    
    
    _init()

    
    function _init() {
        let currentPlayer = playerOne;
        displayCurrentPlayer = document.createElement('h3');
        $body.appendChild(displayCurrentPlayer);
        displayCurrentPlayer.textContent = "Turn of " + currentPlayer.name
        _displayController().createGameBoard()
        _displayController().renderGameboard()
        console.log(currentPlayer)
        const cells = document.querySelectorAll('.cell');
        cells.forEach((div) => {
            div.addEventListener('click', (e) =>  {
                let cell = event.currentTarget
                if (cell.textContent == '') {
                _playerMove(cell);
                _checkWin();
                _changePlayer();
                }
            })
        })
        displayPointsOne = document.createElement('p');
        displayPointsTwo = document.createElement('p');
        $body.appendChild(displayPointsOne);
        $body.appendChild(displayPointsTwo);
        _adjournPoints()
    }
    function _displayController() {
        const $gameBoard = document.getElementById('game-board');
        function createGameBoard() {
            const newGameBoard = document.createElement('div');
            newGameBoard.setAttribute('id', 'game-board');
            $body.appendChild(newGameBoard)

        }
        function renderGameboard() {
            
            gameBoard.map(cell => {
                const newCell = document.createElement('div');
                newCell.classList.add('cell');
                newCell.setAttribute('id', cell);
                $gameBoard.appendChild(newCell);
            });
        }

        function cleanBoard() {
            $body.removeChild($gameBoard);
            playerOne.moves = [];
            playerTwo.moves = [];
            _init();
        }

        return {renderGameboard, createGameBoard, cleanBoard}
    }
    function _playerMove(cell) {
        cell.textContent = currentPlayer.playerSymbol
        currentPlayer.moves.push(cell.id)
    }
    function _changePlayer() {
        currentPlayer == playerOne ? currentPlayer = playerTwo : currentPlayer = playerOne;
        displayCurrentPlayer.textContent = "Turn of " + currentPlayer.name
    }
    function _setPlayers() {

    }

    function _checkWin() {
        let moves = currentPlayer.moves
        if (moves.length < 3) return
        moves.sort((a,b) => a > b ? 1 : -1);
        let Acell = moves.filter(cell => {
            if (cell.charAt(0) == "A")
            return true
        })
        let Bcell = moves.filter(cell => {
            if (cell.charAt(0) == "B")
            return true
        })
        let Ccell = moves.filter(cell => {
            if (cell.charAt(0) == "C")
            return true
        })
        let oneCell = moves.filter(cell => {
            if (cell.charAt(1) == "1")
            return true
        })
        let twoCell = moves.filter(cell => {
            if (cell.charAt(1) == "2")
            return true
        })
        let threeCell = moves.filter(cell => {
            if (cell.charAt(1) == "3")
            return true
        })
        let diagTwo = moves.filter(cell => {
            if (cell == "C1" || cell == "B2" || cell == "A3")
            return true
        })
        let diagOne = moves.filter(cell => {
            if (cell == "A1" || cell == "B2" || cell == "C3")
            return true
        })
        let array = [Acell.length, Bcell.length, Ccell.length, oneCell.length, twoCell.length, threeCell.length, diagOne.length, diagTwo.length];
        let newarray = array.some(cellblock => {
            return (cellblock == 3);
        });
        if (newarray) return _endSequence("win")
        _checkTie();
    }
    function _checkTie() {
        if (playerOne.moves.length > 3 && playerTwo.moves.length > 3) {
            _endSequence("tie");
        }
        
    }

    function _alertTie() {
        alert("It's a tie!")
    }
    function _alertWinner() {
        alert(currentPlayer.name + " has won!");
        currentPlayer.points += 1;
        _adjournPoints()
        if (playerOne.points > 4 || playerTwo.points > 4) {
            _gameover()
        }
    }

    function _endSequence(end) {
        (end == "win") ? _alertWinner() : _alertTie();
        $body.removeChild(displayCurrentPlayer);
        $body.removeChild(displayPointsOne);
        $body.removeChild(displayPointsTwo)
        _displayController().cleanBoard();

    }
    function _adjournPoints() {
        displayPointsOne.textContent = playerOne.name + " score is " + playerOne.points
        displayPointsTwo.textContent = playerTwo.name + " score is " + playerTwo.points
    }

    function _gameover() {
        alert("GAME OVER! " + currentPlayer.name + " has won!");
        playerOne.points = 0;
        playerTwo.points = 0;
    }
    //public
    return {
        gameBoard
    }
})();



