import React from 'react';
import PropTypes from 'prop-types';

import GameRasterComponent from '../GameRaster';


class TicTacToe extends React.Component {

    static propTypes = {
        gameConfig: PropTypes.object.isRequired
    };


    constructor(props) {
        super(props);

        this.state = this.getDefaultState();
    }


    getDefaultState() {

        return {
            activePlayerName: this.props.gameConfig.players[0].name,
            isGameFinished: false,
            winningPlayerName: '',
            ...this.createGameField()
        };
    }


    render() {

        return (
            <React.Fragment>

                <button onClick={::this.resetGame}>
                    Reset game
                </button>


                <GameRasterComponent activePlayerName={this.state.activePlayerName}
                                     gameRasterData={this.state.gameRasterData}
                                     isGameFinished={this.state.isGameFinished}
                                     onCellClickHandler={::this.onCellClickHandler}
                                     winningPlayerName={this.state.winningPlayerName}
                />

            </React.Fragment>
        );
    }


    createGameField() {

        const {
            gameRasterHeight,
            gameRasterWidth,
            minRequiredWinningFields
        } = this.props.gameConfig;

        const newMinRequiredWinningFields = (gameRasterHeight || gameRasterWidth) < minRequiredWinningFields
            ? Math.min(gameRasterHeight, gameRasterWidth)
            : minRequiredWinningFields;

        const gameRasterData = [];

        for (let y = 0; y < gameRasterHeight; y++) {

            for (let x = 0; x < gameRasterWidth; x++) {

                gameRasterData.push(
                    {
                        x: x,
                        y: y,
                        isWinningSequenceCell: false,
                        value: false
                    }
                );
            }
        }

        return {
            gameRasterData: gameRasterData,
            minRequiredWinningFields: newMinRequiredWinningFields
        };
    }


    onCellClickHandler(clickedCell) {

        if (clickedCell.value) {

            return null;
        }

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


    validateGameWinner(gameRasterData, cell) {

        const winningCheckSequences = [

            // horizontal
            gameRasterData.filter((data) => data.y === cell.y),

            // vertical
            gameRasterData.filter((data) => data.x === cell.x),

            // diagonal top left
            this.getDiagonalSequence(
                gameRasterData,
                this.getDiagonalStartCoordinates(cell.x, cell.y, -1),
                1
            ),

            // diagonal top right
            this.getDiagonalSequence(
                gameRasterData,
                this.getDiagonalStartCoordinates(cell.x, cell.y, 1),
                -1
            )
        ];

        for (let i = 0; i < winningCheckSequences.length; i++) {

            const sequenceToCheck = winningCheckSequences[i];
            const winningSequence = TicTacToe.getWinningSequence(
                sequenceToCheck,
                this.props.gameConfig.minRequiredWinningFields
            );

            if (winningSequence !== null) {

                return winningSequence;
            }
        }

        return null;
    }


    getDiagonalStartCoordinates(x, y, xModifier) {

        const deltaX = xModifier === -1
            ? x
            : (this.props.gameConfig.gameRasterWidth - 1) - x;

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

        let previousSymbol = null;
        let winningSequenceCells = [];

        for (let i = 0; i < sequence.length; i++) {

            const cell = sequence[i];

            // catching initial/empty cells
            if (cell.value === false) {
                previousSymbol = null;
                winningSequenceCells = [];
                continue;
            }

            if (previousSymbol === null || previousSymbol === cell.value) {
                winningSequenceCells.push(cell);
            } else {
                winningSequenceCells = [cell];
            }

            previousSymbol = cell.value;

            if (winningSequenceCells.length === minRequiredFields) {

                return winningSequenceCells;
            }
        }

        return null;
    }


    getCell(gameRasterData, coordinates) {

        return gameRasterData.find((cell) => cell.x === coordinates.x && cell.y === coordinates.y);
    }


    getPlayerByName(playerName) {

        return this.props.gameConfig.players.find((player) => player.name === playerName);
    }


    getNextPlayer(currentPlayerName) {

        const {players} = this.props.gameConfig;
        const currentPlayer = this.getPlayerByName(currentPlayerName);
        const currentPlayerIndex = players.indexOf(currentPlayer);
        const newPlayerIndex = players[currentPlayerIndex + 1] ? currentPlayerIndex + 1 : 0;

        return players[newPlayerIndex];
    }


    resetGame() {

        this.setState({
            ...this.state,
            ...this.getDefaultState()
        });
    }
}


export default TicTacToe;
