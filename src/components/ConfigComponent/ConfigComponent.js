import React from 'react';
import PropTypes from 'prop-types';

import styles from './ConfigComponent.scss';


class ConfigComponent extends React.Component {

    static propTypes = {
        onGetConfigValue: PropTypes.func.isRequired,
        onSetConfigValue: PropTypes.func.isRequired,
        onRenderGameField: PropTypes.func.isRequired,
        state: PropTypes.object.isRequired
    };


    render() {

        const {
            onSetConfigValue,
            state
        } = this.props;


        if (!state.isConfigWindowVisible) {
            return null;
        }


        return (
            <table className={styles.configTable}>
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <i><small>Max. rows and columns: {state.maxRasterDimension}</small></i>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor={'fieldHeight'}>
                                Field height:
                            </label>
                        </td>
                        <td>
                            <input id={'fieldHeight'}
                                   onChange={(event) => onSetConfigValue(
                                       this.getConfigFieldFromStateProp('fieldHeight'),
                                       ::this.validate(event.target.value)
                                   )}
                                   onFocus={(event) => event.target.setSelectionRange(0, event.target.value.length)} // auto-select mobile Safari safe
                                   value={state.fieldHeight}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor={'fieldWidth'}>
                                Field width:
                            </label>
                        </td>
                        <td>
                            <input id={'fieldWidth'}
                                   onChange={(event) => onSetConfigValue(
                                       this.getConfigFieldFromStateProp('fieldWidth'),
                                       ::this.validate(event.target.value)
                                   )}
                                   onFocus={(event) => event.target.setSelectionRange(0, event.target.value.length)} // auto-select mobile Safari safe
                                   value={state.fieldWidth}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button onClick={::this.onClickHandler}>
                                Render TicTacToe field
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }


    onClickHandler() {

        // Reset old game.
        this.resetGame();

        this.props.onRenderGameField();
    }


    resetGame() {

        const {onSetConfigValue, onGetConfigValue} = this.props;

        onSetConfigValue(
            this.getConfigFieldFromStateProp('isGameFinished'),
            false
        );

        onSetConfigValue(
            this.getConfigFieldFromStateProp('activePlayer'),
            onGetConfigValue('players')[0].name
        );
    }


    validate(value) {

        if (isNaN(value)) {
            return 0;
        }

        return value > this.props.state.maxRasterDimension
               ? this.props.state.maxRasterDimension
               : Number(value);
    }


    getConfigFieldFromStateProp(field) {

        return Object
            .keys(this.props.state)
            .filter(
                (stateField) => stateField === field
            );
    }
}


export default ConfigComponent;
