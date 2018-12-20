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

        this.setState({
            isConfigWindowVisible: false
        });
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

        if (this.state.isConfigWindowVisible) {
            return null;
        }

        return (
            <GameRaster activePlayer={this.state.activePlayer}
                        initialRasterData={this.state.rasterData}
                        onCellClickHandler={this.onCellClickHandler}
            />
        );
    }


    onCellClickHandler(x, y, player) {

        this.setState({
            activePlayer: player === 1 ? 2 : 1
        });

        //Find clicked cell data in data array...
        let obj = this.state.rasterData.find((element) => {

            return element.x === x && element.y === y
        });

        //...and only if initial value is false, assign player number to value.
        if (!obj['value']) {
            obj['value'] = player;
        }
    }
}



export default TicTacToe;
