import React from 'react';

import ConfigComponent from './components/ConfigComponent';
import GameRaster from './components/GameRaster';


class TicTacToe extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activePlayer: 1, // min|max values are 1|3, equivalent to `this.state.players[i].name`
            fieldHeight: 3,
            fieldWidth: 3,
            gameRasterData: [],
            initialCellValue: false,
            isConfigWindowVisible: true,
            isGameFinished: false,
            maxRasterDimension: 20, // max rows|columns per game raster
            players: [
                {name: 1, symbol: 'X'},
                {name: 2, symbol: 'O'}
            ]
        };
    }


    render() {

        const {
            fieldHeight,
            fieldWidth,
            isConfigWindowVisible,
            maxRasterDimension
        } = this.state;

        return (
            <React.Fragment>

                <ConfigComponent fieldHeightName={'fieldHeight'}
                                 fieldHeightValue={Number(fieldHeight)}
                                 fieldWidthName={'fieldWidth'}
                                 fieldWidthValue={Number(fieldWidth)}
                                 isConfigWindowVisible={isConfigWindowVisible}
                                 maxRasterDimension={maxRasterDimension}
                                 onGetConfigValue={::this.getStateValue}
                                 onSetConfigValue={::this.setStateValue}
                                 onRenderGameField={::this.onCreateGame}
                />

                {this.toggledConfigWindow()}


                {this.renderGameRaster()}


            </React.Fragment>
        );
    }


    setStateValue(field, value) {

        this.setState({
            [field]: value
        });
    }


    getStateValue(field) {

        return this.state[field];
    }


    onCreateGame() {

        this.createGameRasterData();

        this.setStateValue('isConfigWindowVisible', false);
    }


    createGameRasterData() {

        let createdFieldData = [];

        for (let iteratorColumn = 0; iteratorColumn < this.state.fieldWidth; iteratorColumn++) {

            for (let iteratorRow = 0; iteratorRow < this.state.fieldHeight; iteratorRow++) {

                createdFieldData.push(
                    {
                        x: iteratorColumn,
                        y: iteratorRow,
                        value: this.state.initialCellValue
                    }
                );
            }
        }

        this.setStateValue('gameRasterData', createdFieldData);
    }


    toggledConfigWindow() {

        if (this.state.isConfigWindowVisible) {
            return null;
        }

        return (
            <button onClick={() => this.setState({isConfigWindowVisible: !this.state.isConfigWindowVisible})}>
                Create new game
            </button>
        );
    }


    renderGameRaster() {

        const {
            activePlayer,
            isConfigWindowVisible,
            players,
            gameRasterData
        } = this.state;


        if (isConfigWindowVisible) {
            return null;
        }

        const activePlayerSymbol = players.find((element) => {

            return element.name === activePlayer;
        }).symbol;


        return (
            <GameRaster activePlayer={activePlayer}
                        activePlayerSymbol={activePlayerSymbol}
                        isGameFinished={this.state.isGameFinished}
                        gameRasterData={gameRasterData}
                        onCellClickHandler={::this.onCellClickHandler}
            />
        );
    }


    onCellClickHandler(x, y, currentPlayer) {

        //Find clicked cell in game raster data...
        const obj = this.state.gameRasterData.find((element) => {

            return element.x === x && element.y === y;
        });

        //...and only if 'value' of found data is 'false' (as initially set)...
        if (!obj.value) {

            // ...we assign player number to value in state's raster data (for symbol recognition etc.)...
            obj.value = currentPlayer;

            // ... and define the next player who has to make a move and persist that player into state...
            this.setNextPlayer(currentPlayer);

            // ... and in case all cells are clicked on, we need to abort the game!
            this.checkForGameOver();
        }
    }


    setNextPlayer(currentPlayer) {

        const nextPlayer = (currentPlayer + 1) > this.state.players.length ? 1 : (currentPlayer + 1);

        this.setStateValue('activePlayer', nextPlayer);
    }


    checkForGameOver() {

        const remainingCells = this.state.gameRasterData.filter((element) => {

            return element.value === false;
        });

        if (remainingCells.length === 0) {
            this.setStateValue('isGameFinished', true);
        }
    }
}


export default TicTacToe;
