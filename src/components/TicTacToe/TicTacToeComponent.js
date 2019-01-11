import React from 'react';
import PropTypes from 'prop-types';

import GameRasterComponent from '../GameRaster';


class TicTacToe extends React.Component {

    static propTypes = {
        activePlayerName: PropTypes.string.isRequired,
        config: PropTypes.object.isRequired,
        gameRasterData: PropTypes.array.isRequired,
        isGameFinished: PropTypes.bool.isRequired,
        onCreateNewGame: PropTypes.func.isRequired,
        onSetCurrentRoundData: PropTypes.func.isRequired,
        onSetWinningPlayerName: PropTypes.func.isRequired,
        winningPlayerName: PropTypes.string.isRequired
    };


    render() {

        return this.createNewGame();
    }


    createNewGame() {

        const {
            gameRasterHeight,
            gameRasterWidth,
            minRequiredWinningFields
        } = this.props.config;

        const createdGameRasterData = [];
        const newMinRequiredWinningFields = (gameRasterHeight || gameRasterWidth) < minRequiredWinningFields
            ? Math.min(gameRasterHeight, gameRasterWidth)
            : minRequiredWinningFields;

        for (let y = 0; y < gameRasterHeight; y++) {

            for (let x = 0; x < gameRasterWidth; x++) {

                createdGameRasterData.push(
                    {
                        x: x,
                        y: y,
                        isWinningSequenceCell: false,
                        value: false
                    }
                );
            }
        }

        this.props.onCreateNewGame({
            config: {
                ...this.props.config,
                minRequiredWinningFields: newMinRequiredWinningFields
            },
            gameRasterData: createdGameRasterData,
            isConfigWindowVisible: false
        });


        return (
            <GameRasterComponent activePlayerName={this.props.activePlayerName}
                                 gameRasterData={this.props.gameRasterData}
                                 isGameFinished={this.props.isGameFinished}
                                 onCellClickHandler={::this.onCellClickHandler}
                                 winningPlayerName={this.props.winningPlayerName}
            />
        );
    }


    onCellClickHandler(clickedCell) {

        if (clickedCell.value) {

            return null;
        }

        const activePlayerName = this.props.activePlayerName;
        const activePlayerSymbol = this.getPlayerByName(activePlayerName).symbol;

        // copy and set symbol
        const gameRasterData = [...this.props.gameRasterData];
        this.getCell(gameRasterData, clickedCell).value = activePlayerSymbol; // modification by reference

        const winningSequence = this.validateGameWinner(gameRasterData, clickedCell);
        const remainingClickableCells = this.props.gameRasterData.filter((cell) => cell.value === false);
        const isGameFinished = winningSequence !== null || remainingClickableCells.length === 0;

        if (winningSequence !== null) {

            this.props.onSetWinningPlayerName(this.props.activePlayerName);

            winningSequence.forEach((winningCell) => {

                this.getCell(gameRasterData, winningCell).isWinningSequenceCell = true; // modification by reference
            });
        }

        this.props.onSetCurrentRoundData({
            activePlayerName: this.getNextPlayer(activePlayerName).name,
            gameRasterData,
            isGameFinished
        });
    }


    getCell(gameRasterData, coordinates) {

        return gameRasterData.find((cell) => cell.x === coordinates.x && cell.y === coordinates.y);
    }


    getPlayerByName(playerName) {

        return this.props.config.players.find((player) => player.name === playerName);
    }


    getNextPlayer(currentPlayerName) {

        const {players} = this.props.config;
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
                this.props.config.minRequiredWinningFields
            );

            if (winningSequence !== null) {

                return winningSequence;
            }
        }

        return null;
    }


    getDiagonalStartCoordinates(x, y, xModifier) {

        const deltaX = xModifier === -1 ? x : (this.props.config.gameRasterWidth - 1) - x;
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
            const cellValue = cell.value;

            // catching initial/empty cells
            if (cellValue === false) {
                previousSymbol = null;
                continue;
            }

            if (previousSymbol === null || previousSymbol === cellValue) {
                winningSequenceCells.push(cell);
            } else {
                winningSequenceCells = [cell];
            }

            previousSymbol = cellValue;

            if (winningSequenceCells.length === minRequiredFields) {

                return winningSequenceCells;
            }
        }

        return null;
    }
}


export default TicTacToe;
