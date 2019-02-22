import React from 'react';
import PropTypes from 'prop-types';

import styles from './ConfigComponent.scss';


class ConfigComponent extends React.Component {

    static propTypes = {
        config: PropTypes.object.isRequired,
        onCreateNewGame: PropTypes.func.isRequired,
        onSetConfigValue: PropTypes.func.isRequired,
        onSetPlayerConfigValue: PropTypes.func.isRequired
    };


    renderPlayerEdit() {

        let jsxCode = [];

        this.props.config.players.map((player, index) => {

            jsxCode.push(

                <tr key={`players${index}`}>
                    <td>
                        <label htmlFor={`playerName${index}`}>
                            {`Player ${index + 1} name:`}
                        </label>
                    </td>
                    <td>
                        <input defaultValue={player.name}
                               id={('playerName' + index)}
                               maxLength={this.props.config.maxPlayerNameLength}
                               onFocus={(event) => ConfigComponent.autoSelect(event)}
                               onMouseUp={(event) => ConfigComponent.autoSelect(event)}
                               onChange={(event) => {
                                   this.props.onSetPlayerConfigValue(
                                       index,
                                       'name',
                                       this.validateTextConfig(event.target)
                                   )
                               }}
                               type={'text'}
                        />
                    </td>
                    <td>
                        <label htmlFor={`playerSymbol${index}`}>
                            Symbol:
                        </label>
                    </td>
                    <td>
                        <input className={styles.short}
                               defaultValue={player.symbol}
                               id={`playerSymbol${index}`}
                               maxLength={this.props.config.maxPlayerSymbolLength}
                               onChange={(event) => this.props.onSetPlayerConfigValue(
                                   index,
                                   'symbol',
                                   this.validateTextConfig(event.target)
                               )}
                               onFocus={(event) => ConfigComponent.autoSelect(event)}
                               onMouseUp={(event) => ConfigComponent.autoSelect(event)}
                               type={'text'}
                        />
                    </td>
                </tr>
            );
        });

        return jsxCode;
    }


    renderGameRasterEdit() {

        return (

            <React.Fragment>

                <tr>
                    <td>
                        <label htmlFor={'gameRasterHeight'}>Number of rows:</label>
                    </td>
                    <td colSpan={3}>
                        <input id={'gameRasterHeight'}
                               onChange={(event) => this.props.onSetConfigValue(
                                   'gameRasterHeight',
                                   ConfigComponent.validateRasterDimension(event.target.value)
                               )}
                               onFocus={(event) => ConfigComponent.autoSelect(event)}
                               onMouseUp={(event) => ConfigComponent.autoSelect(event)}
                               type={'text'}
                               value={this.props.config.gameRasterHeight}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor={'gameRasterWidth'}>Number of columns:</label>
                    </td>
                    <td colSpan={3}>
                        <input id={'gameRasterWidth'}
                               onChange={(event) => this.props.onSetConfigValue(
                                   'gameRasterWidth',
                                   ConfigComponent.validateRasterDimension(event.target.value)
                               )}
                               onFocus={(event) => ConfigComponent.autoSelect(event)}
                               onMouseUp={(event) => ConfigComponent.autoSelect(event)}
                               type={'text'}
                               value={this.props.config.gameRasterWidth}
                        />
                    </td>
                </tr>

            </React.Fragment>
        );
    }


    renderInfoBox() {

        return (
            <table className={styles.infoBox}>
                <tbody>
                    <tr>
                        <td colSpan={2}><strong>Info:</strong></td>
                    </tr>
                    <tr>
                        <td>Min. rows and columns:</td>
                        <td>{this.props.config.minRequiredWinningFields}</td>
                    </tr>
                    <tr>
                        <td>Max. rows and columns:</td>
                        <td>{this.props.config.maxGameRasterDimension}</td>
                    </tr>
                    <tr>
                        <td>Max. name length:</td>
                        <td>16 Characters, no spaces</td>
                    </tr>
                </tbody>
            </table>
        );
    }


    static validateRasterDimension(value) {

        if (isNaN(value)) {
            return 1;
        }

        const {
            maxGameRasterDimension,
            minRequiredWinningFields
        } = this.props.config;

        value = Number(value);

        value = value > maxGameRasterDimension ? maxGameRasterDimension : value;
        value = value < minRequiredWinningFields ? minRequiredWinningFields : value;

        return value;
    }


    validateTextConfig(element) {

        let value = element.value
            .replace(/\s+/gi, '')
            .substring(0, this.props.config.maxPlayerNameLength - 1);

        element.value = value;

        return value;
    }


    static autoSelect(event) {

        // auto-select mobile Safari safe
        event.target.setSelectionRange(0, event.target.value.length);
    }


    render() {

        return (

            <React.Fragment>

                {this.renderInfoBox()}

                <table className={styles.configTable}>
                    <tbody>

                        {this.renderPlayerEdit()}

                        {this.renderGameRasterEdit()}

                        <tr>
                            <td colSpan={4}>
                                <button onClick={this.props.onCreateNewGame}>
                                    Create Tic Tac Toe game
                                </button>
                            </td>
                        </tr>

                    </tbody>
                </table>

            </React.Fragment>
        );
    }
}


export default ConfigComponent;
