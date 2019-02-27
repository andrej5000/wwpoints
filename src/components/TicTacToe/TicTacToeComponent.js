import React from 'react';
import PropTypes from 'prop-types';

import GameRasterComponent from '../GameRaster';
import TicTacToeGame from '../../libs/TicTacToe';
import {formatTime} from '../../utils/utils';

import styles from './TicTacToeComponent.scss';


class TicTacToeComponent extends React.Component {

    static propTypes = {
        gameConfig: PropTypes.object.isRequired
    };


    /**
     * TicTacToe game
     *
     * @type {TicTacToe}
     */
    game;


    constructor(props) {
        super(props);

        this.state = this.getDefaultState();
        this.game = this.createGame();
    }


    getDefaultState() {

        const gameStart = Math.floor(Date.now());

        return {
            activePlayer: this.props.gameConfig.players[0],
            gameEnd: null,
            gameStart: gameStart,
            gameTime: 0,
            gameTimeRunning: true,
            isGameFinished: false,
            numberOfMoves: {
                player0: 0,
                player1: 0
            }
        };
    }


    createGame() {

        return new TicTacToeGame({
            gameRasterHeight: this.props.gameConfig.gameRasterHeight,
            gameRasterWidth: this.props.gameConfig.gameRasterWidth,
            minRequiredWinningFields: this.props.gameConfig.minRequiredWinningFields
        });
    }


    onMarkCell(cell) {

        const {
            activePlayer,
            numberOfMoves
        } = this.state;

        const currentPlayerIndex = this.getCurrentPlayerIndex(activePlayer.name);
        const winningCells = this.game.markCell(cell, activePlayer.symbol);
        const remainingCells = this.game.getGameRasterData().filter((cell) => cell.value === false).length > 0;
        const isGameFinished = winningCells !== null || !remainingCells;

        if (isGameFinished) {
            this.handleGameTimeStop();
        }

        numberOfMoves['player' + currentPlayerIndex] = numberOfMoves['player' + currentPlayerIndex] + 1;

        this.setState({
            activePlayer: !isGameFinished ? this.getNextPlayer(activePlayer.name) : activePlayer,
            isGameFinished: isGameFinished,
            ...numberOfMoves['player' + currentPlayerIndex]
        });
    }


    getPlayerByName(playerName) {

        return this.props.gameConfig.players.find((player) => player.name === playerName);
    }


    getNextPlayer(currentPlayerName) {

        const {players} = this.props.gameConfig;
        const currentPlayerIndex = this.getCurrentPlayerIndex(currentPlayerName);
        const newPlayerIndex = players[currentPlayerIndex + 1] ? currentPlayerIndex + 1 : 0;

        return players[newPlayerIndex];
    }


    getCurrentPlayerIndex(currentPlayerName) {

        const currentPlayer = this.getPlayerByName(currentPlayerName);

        return this.props.gameConfig.players.indexOf(currentPlayer);
    }


    renderGameDuration() {

        const gameDuration = new Date(this.state.gameTime);

        return formatTime(gameDuration);
    }


    showGameTime() {

        if (this.state.isGameFinished) {

            return (
                <tr>
                    <td colSpan={2}>
                        <strong>Game time:</strong>
                        <span>

                            {::this.renderGameDuration()}

                        </span>
                    </td>
                </tr>
            );
        }
    }


    renderNumberOfMovesBox() {

        return (

            <table className={styles.playerMovesBox}>
                <tbody>
                    <tr className={styles.borderless}>
                        <td colSpan={2}>
                            <strong>Number of moves:</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>
                                {this.props.gameConfig.players[0].name}:
                            </span>
                            <input disabled={'disabled'}
                                   maxLength={4}
                                   type={'text'}
                                   value={this.state.numberOfMoves.player0}
                            />
                        </td>
                        <td>
                            <span>
                                {this.props.gameConfig.players[1].name}:
                            </span>
                            <input disabled={'disabled'}
                                   maxLength={4}
                                   type={'text'}
                                   value={this.state.numberOfMoves.player1}
                            />
                        </td>
                    </tr>


                    {this.showGameTime()}


                </tbody>
            </table>
        );
    }


    handleGameTimeStop() {

        if (this.state.gameTimeRunning) {

            let gameEnd = Math.floor(Date.now());
            let gameTime = gameEnd - this.state.gameStart;

            this.setState({
                gameEnd: gameEnd,
                gameTime: gameTime,
                gameTimeRunning: false
            });
        }
    }


    onResetGame() {

        this.game = this.createGame();
        this.setState(this.getDefaultState());
    }


    render() {

        return (
            <React.Fragment>

                <button onClick={::this.onResetGame}>
                    Reset game
                </button>


                {this.renderNumberOfMovesBox()}


                <GameRasterComponent activePlayerName={this.state.activePlayer.name}
                                     gameRasterData={this.game.getGameRasterData()}
                                     isGameFinished={this.state.isGameFinished}
                                     onCellClickHandler={::this.onMarkCell}
                />

            </React.Fragment>
        );
    }
}


export default TicTacToeComponent;
