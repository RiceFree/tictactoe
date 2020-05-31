const playerFactory = (name, id) => {
    const playerSymbol = _setSymbol()
    let moves = [];
    let points = 0;
    function _setSymbol() {
       return (id === 'player-one' ? 'X' : 'O');
    }
    return {name, playerSymbol, moves, points}
}
const $body = document.querySelector('body');
const jeff = playerFactory('jeff', 'player-one')
const computer = playerFactory('computer', 'computer')


const gameBoard = (() => {

   
    let gameBoard = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];
    let $gameBoard 
    let playerOne
    let playerTwo
    let currentPlayer
    let displayCurrentPlayer;
    let displayPointsOne;
    let displayPointsTwo;
    let gameBoardDiv;

    function init() {
        createGameBoard()
        renderGameboard()
        renderTurn()
        renderPlayscore()
    }

    function createGameBoard() {
        gameBoardDiv = document.createElement('div')
        gameBoardDiv.setAttribute('id','gameBoardDiv')
        $body.appendChild(gameBoardDiv)
        const newGameBoard = document.createElement('div');
        newGameBoard.setAttribute('id', 'game-board');
        gameBoardDiv.appendChild(newGameBoard)
        $gameBoard = document.getElementById('game-board');
    }
    function renderGameboard() {
        
        gameBoard.map(cell => {
            const newCell = document.createElement('div');
            newCell.classList.add('cell');
            newCell.setAttribute('id', cell);
            $gameBoard.appendChild(newCell);
        });

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
    }

    function renderTurn() {
        displayCurrentPlayer = document.createElement('h3');
        gameBoardDiv.appendChild(displayCurrentPlayer);
        displayCurrentPlayer.textContent = "Turn of " + currentPlayer.name
    }

    function renderPlayscore() {
        displayPointsOne = document.createElement('p');
        displayPointsTwo = document.createElement('p');
        gameBoardDiv.appendChild(displayPointsOne);
        gameBoardDiv.appendChild(displayPointsTwo);
        _adjournPoints()
    }
    function deleteAll() {
        $body.removeChild(gameBoardDiv);

    }
    function _cleanBoard() {
        gameBoardDiv.removeChild($gameBoard);
        playerOne.moves = [];
        playerTwo.moves = [];
        init();
    }

    function _playerMove(cell) {
        cell.textContent = currentPlayer.playerSymbol
        currentPlayer.moves.push(cell.id)
    }
    function _changePlayer() {
        currentPlayer == playerOne ? currentPlayer = playerTwo : currentPlayer = playerOne;
        displayCurrentPlayer.textContent = "Turn of " + currentPlayer.name
    }
    function setPlayers(playerOnes, playerTwos) {
        playerOne = playerOnes;
        playerTwo = playerTwos;
        currentPlayer = playerOne
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
        gameBoardDiv.removeChild(displayCurrentPlayer);
        gameBoardDiv.removeChild(displayPointsOne);
        gameBoardDiv.removeChild(displayPointsTwo)
        _cleanBoard();

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
    return {
        createGameBoard, renderGameboard, setPlayers, renderTurn, renderPlayscore, deleteAll
    }
})();


const displayController = (() => {
    let playerSelectionDiv;
    let form;
    let labelOne;
    let labelTwo;
    let nameInputOne;
    let nameInputTwo;
    let startBtn;
    let startBtnDiv;

    let backBtn;
    let backBtnDiv;

    init()
    //initGame(jeff, computer);

    function renderForm() {
        playerSelectionDiv = document.createElement('div');
        playerSelectionDiv.setAttribute('id','playerSelDiv')
        $body.appendChild(playerSelectionDiv)
        form = document.createElement('form')
        playerSelectionDiv.appendChild(form);
        labelOne = document.createElement('label');
        labelOne.setAttribute('for', 'pOne')
        labelOne.textContent = "Player 1";
        form.appendChild(labelOne);   
        nameInputOne = document.createElement('input')
        nameInputOne.setAttribute('id', 'pOne');
        nameInputOne.setAttribute('type', 'text');
        nameInputOne.setAttribute('placeholder', 'Name');
        form.appendChild(nameInputOne);
        labelTwo = document.createElement('label');
        labelTwo.setAttribute('for', 'pTwo')
        labelTwo.textContent = "Player 2";
        form.appendChild(labelTwo);
        nameInputTwo = document.createElement('input')
        nameInputTwo.setAttribute('id', 'pTwo');
        nameInputTwo.setAttribute('type', 'text');
        nameInputTwo.setAttribute('placeholder', 'Name');
        form.appendChild(nameInputTwo);
        startBtnDiv = document.createElement('div');
        startBtnDiv.setAttribute('id', 'startBtnDiv');
        playerSelectionDiv.appendChild(startBtnDiv);
        startBtn = document.createElement('button');
        startBtn.setAttribute('id', 'startBtn')
        startBtn.textContent = "START"
        startBtn.addEventListener('click', startGame)
        startBtnDiv.appendChild(startBtn);
    }

    function init() {
        renderForm()
    }

    function startGame() {
        //check value
        let playerOneName = nameInputOne.value
        let playerTwoName = nameInputTwo.value
        let playerOne = playerFactory(playerOneName, 'player-one');
        let playerTwo = playerFactory(playerTwoName, 'player-two');
        $body.removeChild(playerSelectionDiv)
        initGame(playerOne, playerTwo);
    }
    function initGame(playerOne, playerTwo) {
        renderBackBtn()

        gameBoard.createGameBoard()
        gameBoard.renderGameboard()
        gameBoard.setPlayers(playerOne,playerTwo)
        gameBoard.renderTurn()
        gameBoard.renderPlayscore()

    }

    function renderBackBtn() {
        backBtnDiv = document.createElement('div')
        backBtnDiv.setAttribute('id','backBtnDiv')
        $body.appendChild(backBtnDiv)
        backBtn = document.createElement('button');
        backBtn.setAttribute('id', 'backBtn');
        backBtn.textContent = "NEW GAME"
        backBtn.addEventListener('click', backToPlayerSel)
        backBtnDiv.appendChild(backBtn)
    }
    function backToPlayerSel() {
        gameBoard.deleteAll()
        $body.removeChild(backBtnDiv)
        renderForm()
    }

    return {
        
    }
})();