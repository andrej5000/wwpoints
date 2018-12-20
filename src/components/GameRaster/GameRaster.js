import React from 'react';
import PropTypes from 'prop-types';

import {getMaxValueFromData} from '../../utils/dataUtils';

import CellComponent from '../CellComponent/CellComponent';


class GameRaster extends React.Component {

    static propTypes = {
        activePlayer: PropTypes.number.isRequired,
        activePlayerSymbol: PropTypes.string.isRequired,
        isGameFinished: PropTypes.bool.isRequired,
        rasterData: PropTypes.array.isRequired,
        onCellClickHandler: PropTypes.func.isRequired
    };


    render() {

        return (
            <div className={this.setCssClasses()}>

                <h3>Your turn, player {this.props.activePlayerSymbol}</h3>

                <table className={'gameRaster'}>
                    <tbody>

                        {this.renderGameRaster()}

                    </tbody>
                </table>
            </div>
        );
    }


    renderGameRaster() {

        const {
            activePlayer,
            activePlayerSymbol,
            rasterData,
            onCellClickHandler
        } = this.props;

        let count = -1; // make sure cell counter value starts with zero after for-loops
        let gameRaster = [];

        const rasterHeight = getMaxValueFromData(rasterData, 'y');
        const rasterWidth = getMaxValueFromData(rasterData, 'x');

        for (let i = 0; i <= rasterHeight; i++){

            let cells = [];

            for (let j = 0; j <= rasterWidth; j++){
                count++;

                let cellX = rasterData[count].x;
                let cellY = rasterData[count].y;
                let cellValue = rasterData[count].value;

                cells.push(
                    <CellComponent activePlayerSymbol={activePlayerSymbol}
                                   cellValue={cellValue}
                                   number={count}
                                   key={count}
                                   onCellClickHandler={() => onCellClickHandler(cellX, cellY, activePlayer)}
                    />
                );
            }

            gameRaster.push(
                <tr key={i}>
                    {cells}
                </tr>
            );
        }

        return gameRaster;
    }


    setCssClasses() {

        let cssClasses = 'gameField';

        if (this.props.isGameFinished) {
            cssClasses += ' finished';
        }

        return cssClasses;
    }
}


export default GameRaster;
