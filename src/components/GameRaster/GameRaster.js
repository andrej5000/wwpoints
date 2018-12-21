import React from 'react';
import PropTypes from 'prop-types';

import {getMaxValueFromData} from '../../utils/dataUtils';

import CellComponent from '../CellComponent/CellComponent';


class GameRaster extends React.Component {

    static propTypes = {
        activePlayer: PropTypes.number.isRequired,
        activePlayerSymbol: PropTypes.string.isRequired,
        isGameFinished: PropTypes.bool.isRequired,
        gameRasterData: PropTypes.array.isRequired,
        onCellClickHandler: PropTypes.func.isRequired
    };


    render() {

        return (
            <div className={this.setCssClasses()}>

                {this.renderHeadline()}

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
            gameRasterData,
            onCellClickHandler
        } = this.props;

        let count = -1; // make sure cell counter value starts with zero after for-loops
        let gameRaster = [];

        const rasterHeight = getMaxValueFromData(gameRasterData, 'y');
        const rasterWidth = getMaxValueFromData(gameRasterData, 'x');

        for (let i = 0; i <= rasterHeight; i++){

            let cells = [];

            for (let j = 0; j <= rasterWidth; j++){
                count++;

                let cellX = gameRasterData[count].x;
                let cellY = gameRasterData[count].y;
                let cellValue = gameRasterData[count].value;

                cells.push(
                    <CellComponent activePlayerSymbol={activePlayerSymbol}
                                   cellValue={cellValue}
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


    renderHeadline() {

        let text = `Your turn, player ${this.props.activePlayerSymbol}`;

        if (this.props.isGameFinished) {
            text = 'Game over!';
        }

        return <h3>{text}</h3>;
    }
}


export default GameRaster;
