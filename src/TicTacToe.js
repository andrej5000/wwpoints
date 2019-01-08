import React from 'react';

import ConfigComponent from './components/Config';
import GameRasterComponent from './components/GameRaster';


class TicTacToe extends React.Component {

    constructor(props) {
        super(props);

        this.state = TicTacToe.getDefaultState();
    }


    static getDefaultState(gameRasterHeight, gameRasterWidth) {

        // set default dimensions like this so we can reset an already
        // created game with different dimensions than defaults
        gameRasterHeight = gameRasterHeight || 6;
        gameRasterWidth = gameRasterWidth || 6;

        const defaultPlayers = [
            {name: 'Harry', symbol: 'X'},
            {name: 'Player 2', symbol: 'O'}
        ];

        return {
            activePlayerName: defaultPlayers[0].name,
            gameRasterData: [],
            gameRasterHeight: gameRasterHeight,
            gameRasterWidth: gameRasterWidth,
            initialCellValue: false,
            isConfigWindowVisible: true,
            isGameFinished: false,
            maxRasterDimension: 20, // max number of rows and/or columns per game raster
            minRequiredWinningFields: 3,
            players: defaultPlayers,
            winningFields: [],
            winningPlayerName: ''
        };
    }


    render() {

        return (
            <React.Fragment>

                <ConfigComponent gameRasterHeight={this.state.gameRasterHeight}
                                 gameRasterWidth={this.state.gameRasterWidth}
                                 isConfigWindowVisible={this.state.isConfigWindowVisible}
                                 maxRasterDimension={this.state.maxRasterDimension}
                                 onCreateNewGame={::this.createNewGame}
                                 onSetGameRasterHeight={::this.setGameRasterHeight}
                                 onSetGameRasterWidth={::this.setGameRasterWidth}
                />


                {this.renderGameConfigButtons()}


                {this.renderGameRaster()}


            </React.Fragment>
        );
    }


    renderGameConfigButtons() {

        if (this.state.isConfigWindowVisible) {
            return null;
        }

        return (
            <React.Fragment>

                <button onClick={() => this.setState({isConfigWindowVisible: !this.state.isConfigWindowVisible})}>
                    Set up new game
                </button>

                &nbsp;&nbsp;

                <button onClick={::this.createNewGame}>
                    Reset game
                </button>

            </React.Fragment>
        );
    }


    createNewGame() {

        this.setState({
            ...TicTacToe.getDefaultState(this.state.gameRasterHeight, this.state.gameRasterWidth)
        }, this.createGameRasterData);
    }


    createGameRasterData() {

        const {
            gameRasterHeight,
            gameRasterWidth,
            initialCellValue,
            minRequiredWinningFields
        } = this.state;

        let createdGameRasterData = [];
        let newMinRequiredWinningFields = minRequiredWinningFields;

        if ((gameRasterHeight || gameRasterWidth) < minRequiredWinningFields) {
            newMinRequiredWinningFields = Math.min(gameRasterHeight, gameRasterWidth);
        }

        for (let y = 0; y < gameRasterHeight; y++) {

            for (let x = 0; x < gameRasterWidth; x++) {

                createdGameRasterData.push(
                    {
                        x: x,
                        y: y,
                        isWinningSequenceCell: false,
                        value: initialCellValue
                    }
                );
            }
        }

        this.setState({
            gameRasterData: createdGameRasterData,
            isConfigWindowVisible: false,
            minRequiredWinningFields: newMinRequiredWinningFields
        });
    }


    renderGameRaster() {

        if (this.state.isConfigWindowVisible) {

            return null;
        }

        const {
            activePlayerName,
            gameRasterData,
            gameRasterHeight,
            gameRasterWidth,
            isGameFinished
        } = this.state;


        return (
            <GameRasterComponent activePlayerName={activePlayerName}
                                 isGameFinished={isGameFinished}
                                 gameRasterData={gameRasterData}
                                 gameRasterHeight={gameRasterHeight}
                                 gameRasterWidth={gameRasterWidth}
                                 onCellClickHandler={::this.onCellClickHandler}
                                 winningPlayerName={this.state.winningPlayerName}
            />
        );
    }


    onCellClickHandler(clickedCell) {

        const activePlayerName = this.state.activePlayerName;
        const activePlayerSymbol = this.getPlayerByName(activePlayerName).symbol;

        // copy and set symbol
        const gameRasterData = [...this.state.gameRasterData];
        this.getCell(gameRasterData, clickedCell).value = activePlayerSymbol; // modification by reference

        const winningSequence = this.validateGameWinner(gameRasterData, clickedCell);
        const remainingClickableCells = this.state.gameRasterData.filter((cell) => cell.value === false);
        const isGameFinished = winningSequence !== null || remainingClickableCells.length === 0;

        if (winningSequence !== null) {

            this.setState({
                winningPlayerName: this.state.activePlayerName
            });

            winningSequence.forEach((winningCell) => {

                this.getCell(gameRasterData, winningCell).isWinningSequenceCell = true; // modification by reference
            });
        }

        this.setState({
            activePlayerName: this.getNextPlayer(activePlayerName).name,
            gameRasterData,
            isGameFinished
        });
    }


    getCell(gameRasterData, coordinates) {

        return gameRasterData.find((data) => data.x === coordinates.x && data.y === coordinates.y);
    }


    getPlayerByName(playerName) {

        return this.state.players.find((player) => player.name === playerName);
    }


    getNextPlayer(currentPlayerName) {

        const {players} = this.state;
        const currentPlayer = this.getPlayerByName(currentPlayerName);
        const currentPlayerIndex = players.indexOf(currentPlayer);
        const newPlayerIndex = players[currentPlayerIndex + 1] ? currentPlayerIndex + 1 : 0;

        return players[newPlayerIndex];
    }


    validateGameWinner(gameRasterData, cell) {

        const winningCheckSequences = [

            // horizontal
            gameRasterData.filter((data) => data.y === cell.y),

            // vertical
            gameRasterData.filter((data) => data.x === cell.x),

            // diagonal top left
            this.getDiagonalSequence(gameRasterData, this.getDiagonalStartCoordinates(cell.x, cell.y, -1), 1),

            // diagonal top right
            this.getDiagonalSequence(gameRasterData, this.getDiagonalStartCoordinates(cell.x, cell.y, 1), -1)
        ];

        for (let i = 0; i < winningCheckSequences.length; i++) {

            const sequenceToCheck = winningCheckSequences[i];
            const winningSequence = TicTacToe.getWinningSequence(sequenceToCheck, this.state.minRequiredWinningFields);

            if (winningSequence !== null) {

                return winningSequence;
            }
        }

        return null;
    }


    getDiagonalStartCoordinates(x, y, xModifier) {

        const deltaX = xModifier === -1 ? x : (this.state.gameRasterWidth - 1) - x;
        const min = Math.min(deltaX, y);

        const startX = x + (min * xModifier);
        const startY = y - min;

        return {
            x: startX,
            y: startY
        };
    }


    getDiagonalSequence(gameRasterData, startCoordinates, xModifier) {

        const sequence = [];
        let coordinates = startCoordinates;
        let cell;

        do {
            cell = this.getCell(gameRasterData, coordinates);

            if (cell) {
                sequence.push(cell);
            }

            coordinates = {
                x: coordinates.x + xModifier,
                y: coordinates.y + 1
            };

        } while (cell);

        return sequence;
    }


    /**
     * @param sequence {array|object[]}
     * @param minRequiredFields {number} Minimum subsequent identical symbols to define a winning sequence
     * @return {array|object[]} Cells reflecting a winning sequence; empty if none
     */
    static getWinningSequence(sequence, minRequiredFields) {

/*        let winningSequence = null;

        const uniqueValues = sequence.map((cell) => cell.value)
            .filter((value) => value !== false)
            .filter((value, index, self) => self.indexOf(value) === index)
            .forEach((value) => {

                const valueSequence = sequence.filter((cell) => cell.value === value);

                if (valueSequence.length < minRequiredWinningFields) {
                    return;
                }

                const retValue = valueSequence.reduce((prev, currentCell, index, cells) => {

                    const previousCell = cells[index - 1] || null;
                    if (previousCell === null) {

                        return prev + 1;
                    }

                    if (currentCell.x <= previousCell.x -1)

                    // if delta is only 1
// eslint-disable-next-line no-debugger
                    debugger;

                }, 0);

                console.log('valueSequence', valueSequence);
                console.log('retValue', retValue);
            });

        return winningSequence;*/

        let previousSymbol = null;
        let subsequentIdenticalSymbols = 0;
        let winningSequenceCells = [];

        for (let i = 0; i < sequence.length; i++) {

            const cell = sequence[i];
            const cellValue = cell.value;

            // catching initial/empty cells
            if (cellValue === false) {
                previousSymbol = null;
                subsequentIdenticalSymbols = 0;
                winningSequenceCells = [];
                continue;
            }

            if (previousSymbol === null || previousSymbol === cellValue) {
                subsequentIdenticalSymbols++;
                winningSequenceCells.push(cell);
            } else {
                subsequentIdenticalSymbols = 1;
                winningSequenceCells = [cell];
            }

            previousSymbol = cellValue;

            if (subsequentIdenticalSymbols === minRequiredFields) {

                return winningSequenceCells;
            }
        }

        return null;
    }


    setGameRasterHeight(value) {

        this.setState({
            gameRasterHeight: value
        });
    }


    setGameRasterWidth(value) {

        this.setState({
            gameRasterWidth: value
        });
    }
}


export default TicTacToe;
