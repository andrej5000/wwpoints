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
                minRequiredWinningFields: 3,
                players: [
                    {
                        name: 'Harry',
                        symbol: 'X'
                    },
                    {
                        name: 'Player 2',
                        symbol: 'O'
                    }
                ]
            },
            isConfigWindowVisible: true
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
                             onCreateNewGame={() => ::this.setState({isConfigWindowVisible: false})}
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


                <TicTacToe gameConfig={this.state.config}/>

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
