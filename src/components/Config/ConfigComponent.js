import React from 'react';
import PropTypes from 'prop-types';

import styles from './ConfigComponent.scss';

const MAX_RASTER_DIMENSION = 20; // max number of rows and/or columns per game raster


class ConfigComponent extends React.Component {

    static propTypes = {
        gameRasterHeight: PropTypes.number.isRequired,
        gameRasterWidth: PropTypes.number.isRequired,
        onCreateNewGame: PropTypes.func.isRequired,
        onSetGameRasterHeight: PropTypes.func.isRequired,
        onSetGameRasterWidth: PropTypes.func.isRequired
    };


    static validate(value) {

        if (isNaN(value)) {
            return 1;
        }

        return value > MAX_RASTER_DIMENSION
               ? MAX_RASTER_DIMENSION
               : Number(value);
    }


    static autoSelect(event) {
        // auto-select mobile Safari safe
        event.target.setSelectionRange(0, event.target.value.length);
    }


    render() {

        return (
            <table className={styles.configTable}>
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <i>
                                <small>Max. rows and columns: {MAX_RASTER_DIMENSION}</small>
                            </i>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor={'gameRasterHeight'}>
                                Number of rows:
                            </label>
                        </td>
                        <td>
                            <input id={'gameRasterHeight'}
                                   onChange={(event) => this.props.onSetGameRasterHeight(
                                       ConfigComponent.validate(event.target.value)
                                   )}
                                   onFocus={(event) => ConfigComponent.autoSelect(event)}
                                   onMouseUp={(event) => ConfigComponent.autoSelect(event)}
                                   value={this.props.gameRasterHeight}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor={'gameRasterWidth'}>
                                Number of columns:
                            </label>
                        </td>
                        <td>
                            <input id={'gameRasterWidth'}
                                   onChange={(event) => this.props.onSetGameRasterWidth(
                                       ConfigComponent.validate(event.target.value)
                                   )}
                                   onFocus={(event) => ConfigComponent.autoSelect(event)}
                                   onMouseUp={(event) => ConfigComponent.autoSelect(event)}
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
}


export default ConfigComponent;
