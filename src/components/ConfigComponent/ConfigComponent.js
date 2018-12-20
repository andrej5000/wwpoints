import React from 'react';
import PropTypes from 'prop-types';


class ConfigComponent extends React.Component {

    static propTypes = {
        fieldHeightName: PropTypes.string.isRequired,
        fieldHeightValue: PropTypes.number.isRequired,
        fieldWidthName: PropTypes.string.isRequired,
        fieldWidthValue: PropTypes.number.isRequired,
        isConfigWindowVisible: PropTypes.bool.isRequired,
        onSetConfigValue: PropTypes.func.isRequired,
        onRenderGameField: PropTypes.func.isRequired
    };

    render() {

        const{
            fieldHeightName,
            fieldHeightValue,
            fieldWidthName,
            fieldWidthValue,
            isConfigWindowVisible,
            onSetConfigValue,
            onRenderGameField
        } = this.props;


        if (!isConfigWindowVisible) {
            return null;
        }

        return (
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor={'fieldHeight'}>
                                Field height:
                            </label>
                        </td>
                        <td>
                            <input id={'fieldHeight'}
                                   onChange={() => onSetConfigValue(fieldHeightName, Number(this.inputWidth.value))}
                                   onFocus={() => this.inputWidth.setSelectionRange(0, this.inputWidth.value.length)} // auto-select mobile Safari safe
                                   ref={(inputWidth) => this.inputWidth = inputWidth}
                                   value={fieldHeightValue}
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
                                   onChange={() => onSetConfigValue(fieldWidthName, Number(this.inputHeight.value))}
                                   onFocus={() => this.inputHeight.setSelectionRange(0, this.inputHeight.value.length)} // auto-select mobile Safari safe
                                   ref={(inputHeight) => this.inputHeight = inputHeight}
                                   value={fieldWidthValue}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button onClick={onRenderGameField}>
                                Render TicTacToe field
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    };
}

export default ConfigComponent;
