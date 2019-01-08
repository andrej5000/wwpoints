import React from 'react';
import PropTypes from 'prop-types';

import styles from './ConfigComponent.scss';


class ConfigComponent extends React.Component {

    static propTypes = {
        gameRasterHeight: PropTypes.number.isRequired,
        gameRasterWidth: PropTypes.number.isRequired,
        maxRasterDimension: PropTypes.number.isRequired,
        onCreateNewGame: PropTypes.func.isRequired,
        onSetGameRasterHeight: PropTypes.func.isRequired,
        onSetGameRasterWidth: PropTypes.func.isRequired
    };


    render() {


        return (
            <table className={styles.configTable}>
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <i>
                                <small>Max. rows and columns: {this.props.maxRasterDimension}</small>
                            </i>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor={'gameRasterHeight'}>
                                Field height:
                            </label>
                        </td>
                        <td>
                            <input id={'gameRasterHeight'}
                                   onChange={(event) => this.props.onSetGameRasterHeight(
                                       ::this.validate(event.target.value)
                                   )}
                                   onFocus={(event) => ConfigComponent.autoSelect(event)}
                                   value={this.props.gameRasterHeight}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor={'gameRasterWidth'}>
                                Field width:
                            </label>
                        </td>
                        <td>
                            <input id={'gameRasterWidth'}
                                   onChange={(event) => this.props.onSetGameRasterWidth(
                                       ::this.validate(event.target.value)
                                   )}
                                   onFocus={(event) => ConfigComponent.autoSelect(event)}
                                   value={this.props.gameRasterWidth}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button onClick={this.props.onCreateNewGame}>
                                Create Tic Tac Toe game
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }


    validate(value) {

        if (isNaN(value)) {
            return 0;
        }

        return value > this.props.maxRasterDimension
               ? this.props.maxRasterDimension
               : Number(value);
    }


    static autoSelect(event) {
        // auto-select mobile Safari safe
        event.target.setSelectionRange(0, event.target.value.length);
    }
}


export default ConfigComponent;
