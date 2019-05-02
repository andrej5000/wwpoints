import React from 'react';

import ConfigComponent from './components/Config';
import TicTacToe from './components/TicTacToe';


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = App.getDefaultState();
    }


    static getDefaultState(gameRasterHeight, gameRasterWidth) {

        const defaultDimension = 6;

        gameRasterHeight = gameRasterHeight || defaultDimension;
        gameRasterWidth = gameRasterWidth || defaultDimension;

        return {
            config: {
                gameRasterHeight: gameRasterHeight,
                gameRasterWidth: gameRasterWidth,
                isHighscoreServiceEnabled: true,
                maxGameRasterDimension: 20,
                maxPlayerNameLength: 16,
                maxPlayerSymbolLength: 1,
                minRequiredWinningFields: 3,
                players: [
                    {
                        name: 'Apollo',
                        symbol: 'X'
                    },
                    {
                        name: 'Boreas',
                        symbol: 'O'
                    }
                ]
            },
            isConfigWindowVisible: true
        };
    }


    renderGameConfig() {

        if (!this.state.isConfigWindowVisible) {

            return null;
        }

        return (
            <ConfigComponent config={this.state.config}
                             onCreateNewGame={() => ::this.setState({isConfigWindowVisible: false})}
                             onSetConfigValue={::this.setConfigValue}
                             onSetPlayerConfigValue={::this.setPlayerConfigValue}
            />
        );
    }


    renderTicTacToe() {

        if (this.state.isConfigWindowVisible) {

            return null;
        }

        return (

            <React.Fragment>

                <button onClick={::this.onSetupNewGame}>
                    Set up new game
                </button>


                <TicTacToe gameConfig={this.state.config}/>

            </React.Fragment>
        );
    }


    setConfigValue(configKey, configValue) {

        const {config} = this.state;
        config[configKey] = configValue;

        this.setState({
            config: config
        });
    }


    setPlayerConfigValue(position, configKey, configValue) {

        const {players} = this.state.config;
        players[position][configKey] = configValue;

        this.setState({
            config: {
                ...this.state.config,
                players
            }
        });
    }


    onSetupNewGame() {

        const cleanGameConf = App.getDefaultState();

        this.setState({
            ...cleanGameConf,
            isConfigWindowVisible: !this.state.isConfigWindowVisible
        });
    }


    render() {

        return (
            <React.Fragment>

                {this.renderGameConfig()}

                {this.renderTicTacToe()}

            </React.Fragment>
        );
    }
}


export default App;
