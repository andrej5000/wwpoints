import React from 'react';
import PropTypes from 'prop-types';

import GameRasterComponent from '../GameRaster';
import TicTacToeGame from '../../libs/TicTacToe';
import {formatTime, getFormattedDate} from '../../utils/utils';

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
            gameDuration: 0,
            gameEnd: null,
            gameStart: gameStart,
            gameTimeRunning: true,
            highscore: [],
            isGameFinished: false,
            numberOfMoves: {
                player0: 0,
                player1: 0
            }
        };
    }


    componentDidMount() {

        this.getHighscore((response) => {

            ::this.setState({
                highscore: response
            })
        });
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

        if (winningCells) {
            this.saveHighscore();
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


    renderGameDuration(gameDuration) {

        gameDuration = gameDuration || new Date(this.state.gameDuration);

        return formatTime(gameDuration);
    }


    saveHighscore() {

        fetch('http://localhost:3000/highscore', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                playerName: this.state.activePlayer.name,
                gameDuration: this.state.gameDuration
            })
        })
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(error => {

                console.error(error)
            });
    }


    getHighscore(onSuccess) {

        fetch('http://localhost:3000/highscore', {method: 'GET'})
            .then((response) => {

                return response.json();
            })
            .then(onSuccess)
            .catch(error => {

                console.error(error)
            });
    }


    renderHighscore() {

        if (!this.state.isGameFinished) {

            return;
        }

        const highscore = this.state.highscore.sort(TicTacToeComponent.sortHighscoreByGameDuration);
        const highscoreRows = [];
        let highscoreTable;

        highscore.map((entry) => {

            highscoreRows.push(
                <tr key={entry._id}>
                    <td>{entry.playerName}</td>
                    <td>{this.renderGameDuration(entry.gameDuration)}</td>
                    <td>{getFormattedDate(entry.createdAt)}</td>
                </tr>
            );
        });

        highscoreTable = (
            <div className={styles.highscoreWrap}>
                <table className={styles.highscore}>
                    <thead>
                        <tr>
                            <th colSpan={3}>TicTacToe High-Score</th>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <th>Game Duration</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>

                        {highscoreRows}

                    </tbody>
                </table>
            </div>
        );

        return highscoreTable;
    }


    static sortHighscoreByGameDuration(a, b)  {

        if (a.gameDuration < b.gameDuration) {

            return -1;
        }

        if (a.gameDuration > b.gameDuration) {

            return 1;
        }

        return 0;
    };


    renderGameTime() {

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


                    {this.renderGameTime()}


                </tbody>
            </table>
        );
    }


    handleGameTimeStop() {

        if (this.state.gameTimeRunning) {

            let gameEnd = Math.floor(Date.now());
            let gameTime = gameEnd - this.state.gameStart;

            this.setState({
                gameDuration: gameTime,
                gameEnd: gameEnd,
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


                {this.renderHighscore()}

            </React.Fragment>
        );
    }
}


export default TicTacToeComponent;
