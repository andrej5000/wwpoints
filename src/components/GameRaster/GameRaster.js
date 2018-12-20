import React from 'react';
import PropTypes from 'prop-types';

import {getMaxValueFromData} from '../../utils/dataUtils';

import CellComponent from '../CellComponent/CellComponent';


class GameRaster extends React.Component {

    static propTypes = {
        activePlayer: PropTypes.number.isRequired,
        initialRasterData: PropTypes.array.isRequired,
        onCellClickHandler: PropTypes.func.isRequired
    };


    render() {

        return (
            <table className={'gameRaster'}>
                <tbody>

                    {this.renderGameRaster()}

                </tbody>
            </table>
        );
    }


    renderGameRaster() {

        const {
            activePlayer,
            initialRasterData,
            onCellClickHandler
        } = this.props;

        let count = -1; // make sure value starts with zero after iterations
        let gameRaster = [];

        let rasterHeight = getMaxValueFromData(initialRasterData, 'y');
        let rasterWidth = getMaxValueFromData(initialRasterData, 'x');

        for (let i = 0; i <= rasterHeight; i++){

            let cells = [];

            for (let j = 0; j <= rasterWidth; j++){
                count++;

                //let cellId = `cell_${initialRasterData[count].x}-${initialRasterData[count].y}`;
                let cellX = initialRasterData[count].x;
                let cellY = initialRasterData[count].y;
                let cellValue = initialRasterData[count].value;

                //console.log('COUNT: ', count, cellId);

                cells.push(
                    <CellComponent cellValue={cellValue}
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
}


export default GameRaster;
