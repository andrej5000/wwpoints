import React from 'react';

import ConfigComponent from './components/ConfigComponent';
import GameRaster from './components/GameRaster';

import './App.css';


class TicTacToe extends React.Component {

    constructor(props) {
        super(props);

        this.createGameFieldData = this.createGameFieldData.bind(this);
        this.setStateValue = this.setStateValue.bind(this);
        this.onCellClickHandler = this.onCellClickHandler.bind(this);
        this.onCreateGame = this.onCreateGame.bind(this);
        this.toggledConfigWindow = this.toggledConfigWindow.bind(this);

        this.state = {
            activePlayer: 1,
            fieldHeight: 3,
            fieldWidth: 3,
            initialCellValue: false,
            isConfigWindowVisible: true,
            players: [
                {name: 1, symbol: 'X'},
                {name: 2, symbol: 'O'},
                {name: 3, symbol: 'M'}
            ],
            rasterData: []
        };
    }


    render() {

        const{
            fieldHeight,
            fieldWidth,
            isConfigWindowVisible
        } = this.state;

        return (
            <React.Fragment>

                <ConfigComponent fieldHeightName={'fieldHeight'}
                                 fieldHeightValue={Number(fieldHeight)}
                                 fieldWidthName={'fieldWidth'}
                                 fieldWidthValue={Number(fieldWidth)}
                                 isConfigWindowVisible={isConfigWindowVisible}
                                 onSetConfigValue={this.setStateValue}
                                 onRenderGameField={this.onCreateGame}
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


    onCreateGame() {

        this.createGameFieldData();

        this.setStateValue('isConfigWindowVisible', false);
    }


    createGameFieldData() {

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

        this.setStateValue('rasterData', createdFieldData);
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
            rasterData
        } = this.state;


        if (isConfigWindowVisible) {
            return null;
        }

        const activePlayerSymbol = players.find((element) => {

            return element.name === activePlayer
        })['symbol'];

        return (
            <GameRaster activePlayer={activePlayer}
                        activePlayerSymbol={activePlayerSymbol}
                        rasterData={rasterData}
                        onCellClickHandler={this.onCellClickHandler}
            />
        );
    }


    onCellClickHandler(x, y, player) {

        //Find clicked cell data in raster data...
        const obj = this.state.rasterData.find((element) => {

            return element.x === x && element.y === y
        });

        //...and only if 'value' of found data is 'false' (as initially set)...
        if (!obj['value']) {

            // ...we assign player number to value in state's raster data.
            obj['value'] = player;

            // Now we define the next player...
            const nextPlayer = (player + 1) > this.state.players.length ? 1 : (player + 1);

            // ...and persist that into state.
            this.setStateValue('activePlayer', nextPlayer);
        }
    }
}


export default TicTacToe;
