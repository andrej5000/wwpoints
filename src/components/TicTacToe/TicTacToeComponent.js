import React from 'react';
import PropTypes from 'prop-types';

import GameRasterComponent from '../GameRaster';
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

        return {
            activePlayer: this.props.gameConfig.players[0],
            isGameFinished: false,
            winningPlayerName: ''
        };
    }


    createGame() {

        return new TicTacToeGame({
            gameRasterHeight: this.props.gameConfig.gameRasterHeight,
            gameRasterWidth: this.props.gameConfig.gameRasterWidth,
            minRequiredWinningFields: this.props.gameConfig.minRequiredWinningFields
        });
    }


    onResetGame() {

        this.game = this.createGame();
        this.setState(this.getDefaultState());
    }


    onMarkCell(cell) {

        const winningCells = this.game.markCell(cell, this.state.activePlayer.symbol);
        const remainingCells = this.game.getGameRasterData().filter((cell) => cell.value === false).length > 0;
        const isGameFinished = winningCells !== null || !remainingCells;

        this.setState({
            activePlayer: !isGameFinished ? this.getNextPlayer(this.state.activePlayer.name) : this.state.activePlayer,
            isGameFinished: isGameFinished
        });
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


    render() {

        return (
            <React.Fragment>

                <button onClick={::this.onResetGame}>
                    Reset game
                </button>

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
