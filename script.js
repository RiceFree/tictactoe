const playerFactory = (name, id) => {
    const playerSymbol = _setSymbol()
    let moves = [];
    function _setSymbol() {
       return (id === 'player-one' ? 'X' : 'O');
    }
    return {name, playerSymbol, moves}
}


const jeff = playerFactory('jeff', 'player-one')
const computer = playerFactory('computer', 'computer')

const gameBoard = (() => {
    //private
    playerOne = jeff;
    playerTwo = computer;
    currentPlayer = playerOne;
    let gameBoard = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3']
    //cacheDOM
    const $body = document.querySelector('body');
    
    
    _init()

    
    function _init() {
        _displayController().createGameBoard()
        _displayController().renderGameboard()
        let currentPlayer = playerOne;
        console.log(currentPlayer)
        const cells = document.querySelectorAll('.cell');
        cells.forEach((div) => {
            div.addEventListener('click', (e) =>  {
                let cell = event.currentTarget
                if (cell.textContent == '') {
                _playerMove(cell);
                _changePlayer()
                _checkWin()
                }
            })
        })
    }
    function _displayController() {
        function createGameBoard() {
            const newGameBoard = document.createElement('div');
            newGameBoard.setAttribute('id', 'game-board');
            $body.appendChild(newGameBoard)

        }
        function renderGameboard() {
            const $gameBoard = document.getElementById('game-board');
            gameBoard.map(cell => {
                const newCell = document.createElement('div');
                newCell.classList.add('cell');
                newCell.setAttribute('id', cell);
                $gameBoard.appendChild(newCell);
            });
        }

        return {renderGameboard, createGameBoard}
    }
    function _playerMove(cell) {
        cell.textContent = currentPlayer.playerSymbol
        currentPlayer.moves.push(cell.id)
    }
    function _changePlayer() {
        currentPlayer == playerOne ? currentPlayer = playerTwo : currentPlayer = playerOne;
    }
    function _setPlayers() {

    }

    function _checkWin() {
        currentPlayer.moves.filter(cell =>
            cell)
    }
    
    //public
    return {
        gameBoard
    }
})();



