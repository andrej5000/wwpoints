import React from 'react';
import PropTypes from 'prop-types';

import {saveHighscore, getHighscore} from '../../services/api/HighscoreApi';
import GameRasterComponent from '../GameRaster';
import HighscoreComponent from '../Highscore';
import StatsComponent from '../Stats';
import TicTacToeGame from '../../libs/TicTacToe';


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
            gameDuration: 0,
            gameEnd: null,
            gameStart: gameStart,
            gameTimeRunning: true,
            gameWinnerHighscoreId: '',
            highscore: [],
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

        numberOfMoves['player' + currentPlayerIndex] = numberOfMoves['player' + currentPlayerIndex] + 1;

        // Save current game state ...
        this.setState({
            activePlayer: !isGameFinished ? this.getNextPlayer(activePlayer.name) : activePlayer,
            isGameFinished: isGameFinished,
            ...numberOfMoves['player' + currentPlayerIndex]
        }, () => {

            // ... and in case the game has ended, execute the game's end accordingly.
            if (isGameFinished) {
                this.handleGameEnd(!!winningCells);
            }
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


    handleGameEnd(isGameWinnerExists) {

        let gameEnd = Math.floor(Date.now());
        let gameTime = gameEnd - this.state.gameStart;

        this.setState({
            gameDuration: gameTime,
            gameEnd: gameEnd
        }, () => {
            if (isGameWinnerExists) {
                this.saveHighscore();
            } else {
                this.getHighscore();
            }
        });
    }


    saveHighscore() {

        if (!this.props.gameConfig.isHighscoreServiceEnabled) {

            return;
        }

        const highscoreData = JSON.stringify({
            playerName: this.state.activePlayer.name,
            gameDuration: this.state.gameDuration
        });

        saveHighscore(highscoreData, (latestHighscore) => {

            this.setState({
                gameWinnerHighscoreId: latestHighscore._id
            }, ::this.getHighscore);
        });
    }


    getHighscore() {

        if (!this.props.gameConfig.isHighscoreServiceEnabled) {

            return;
        }

        getHighscore((highscore) => {

            this.setToState('highscore', highscore)
        });
    }


    setToState(key, value, callback = () => {}) {

        this.setState({
            [key]: value
        }, callback);
    }


    onResetGame() {

        this.game = this.createGame();
        this.setState(this.getDefaultState());
    }


    renderHighscore() {

        if (!this.props.gameConfig.isHighscoreServiceEnabled) {

            return;
        }

        return (
            <HighscoreComponent gameWinnerHighscoreId={this.state.gameWinnerHighscoreId}
                                highscore={this.state.highscore}
                                isGameFinished={this.state.isGameFinished}
            />
        );
    }


    render() {

        return (
            <React.Fragment>

                <button onClick={::this.onResetGame}>
                    Reset game
                </button>


                <StatsComponent gameDuration={this.state.gameDuration}
                                isGameFinished={this.state.isGameFinished}
                                numberOfMoves={this.state.numberOfMoves}
                                players={this.props.gameConfig.players}
                />


                <GameRasterComponent activePlayerName={this.state.activePlayer.name}
                                     gameRasterData={this.game.getGameRasterData()}
                                     isGameFinished={this.state.isGameFinished}
                                     onCellClickHandler={::this.onMarkCell}
                />


                {this.renderHighscore()}


            </React.Fragment>
        );
    }
}


export default TicTacToeComponent;
