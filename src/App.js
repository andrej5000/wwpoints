import React from 'react';

import ConfigComponent from './components/Config';
import TicTacToe from './components/TicTacToe';


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = App.getDefaultState();
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

        const config = {
            gameRasterHeight: gameRasterHeight,
            gameRasterWidth: gameRasterWidth,
            minRequiredWinningFields: 3,
            players: defaultPlayers
        };

        return {
            activePlayerName: defaultPlayers[0].name,
            config: config,
            gameRasterData: [],
            isConfigWindowVisible: true,
            isGameFinished: false,
            winningFields: [],
            winningPlayerName: ''
        };
    }


    render() {

        return (
            <React.Fragment>

                {this.renderGameConfig()}

                {this.renderTicTacToe()}

            </React.Fragment>
        );
    }


    renderGameConfig() {

        if (!this.state.isConfigWindowVisible) {
            return null;
        }

        return (
            <ConfigComponent gameRasterHeight={this.state.config.gameRasterHeight}
                             gameRasterWidth={this.state.config.gameRasterWidth}
                             onCreateNewGame={::this.renderTicTacToe}
                             onSetGameRasterHeight={(gameRasterHeight) => ::this.setConfigValue({gameRasterHeight})}
                             onSetGameRasterWidth={(gameRasterWidth) => ::this.setConfigValue({gameRasterWidth})}
            />
        );
    }


    renderTicTacToe() {

        if (this.state.isConfigWindowVisible) {

            return null;
        }

        return (

            <React.Fragment>

                <button onClick={() => this.setState({isConfigWindowVisible: !this.state.isConfigWindowVisible})}>
                    Set up new game
                </button>

                &nbsp;&nbsp;

                <button onClick={::this.renderTicTacToe}>
                    Reset game
                </button>


                <TicTacToe activePlayerName={this.state.activePlayerName}
                           config={this.state.config}
                           gameRasterData={this.state.gameRasterData}
                           isGameFinished={this.state.isGameFinished}
                           onCreateNewGame={(gameData) => ::this.setState({
                               ...App.getDefaultState(this.state.config.gameRasterHeight, this.state.config.gameRasterWidth),
                               gameData
                           })}
                           onSetCurrentRoundData={(data) => ::this.setState(data)}
                           onSetWinningPlayerName={(winningPlayerName) => ::this.setState({winningPlayerName})}
                           winningPlayerName={this.state.winningPlayerName}
                />

            </React.Fragment>
        );
    }


    setConfigValue(newConfigData) {

        this.setState({
            config: {
                ...this.state.config,
                ...newConfigData
            }
        });
    }
}


export default App;
