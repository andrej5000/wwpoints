import React from 'react';
import PropTypes from 'prop-types';

import CellComponent from '../Cell/CellComponent';

import styles from './GameRasterComponent.scss';


class GameRasterComponent extends React.Component {

    static propTypes = {
        activePlayerName: PropTypes.string.isRequired,
        isGameFinished: PropTypes.bool.isRequired,
        gameRasterData: PropTypes.array.isRequired,
        gameRasterHeight: PropTypes.number.isRequired,
        gameRasterWidth: PropTypes.number.isRequired,
        onCellClickHandler: PropTypes.func.isRequired,
        winningPlayerName: PropTypes.string.isRequired
    };


    render() {

        return (
            <div className={this.setCssClasses()}>

                {this.renderHeadlines()}

                <table className={styles.gameField}>
                    <tbody>

                        {this.renderGameRaster()}

                    </tbody>
                </table>
            </div>
        );
    }


    renderGameRaster() {

        const gameRaster = [];

        for (let y = 0; y < this.props.gameRasterHeight; y++) {

            const cells = [];

            for (let x = 0; x < this.props.gameRasterWidth; x++) {

                const cell = this.props.gameRasterData.find((cell) => cell.x === x && cell.y === y);
                const cellValue = cell.value;

                cells.push(
                    <CellComponent cellValue={cellValue}
                                   isGameFinished={this.props.isGameFinished}
                                   isWinningSequenceCell={cell.isWinningSequenceCell}
                                   key={y + x}
                                   onCellClickHandler={
                                       () => !cellValue && !this.props.isGameFinished
                                             ? this.props.onCellClickHandler({...cell})
                                             : null
                                   }
                    />
                );
            }

            gameRaster.push(
                <tr key={y}>
                    {cells}
                </tr>
            );
        }

        return gameRaster;
    }


    setCssClasses() {

        let cssClasses = styles.gameRaster;

        if (this.props.isGameFinished) {
            cssClasses += ` ${styles.finished}`;
        }

        if (this.props.winningPlayerName !== '') {
            cssClasses += ` ${styles.hasGameWinner}`;
        }

        return cssClasses;
    }


    renderHeadlines() {

        let cssClass = '';
        let text = `Your turn, ${this.props.activePlayerName}.`;

        if (this.props.isGameFinished) {
            text = 'Game over, no winner!';
        }

        if (this.props.winningPlayerName !== '') {
            cssClass = styles.blink;
            text = `Game over! Winner: ${this.props.winningPlayerName}`;
        }

        return (
            <React.Fragment>
                <h3 className={cssClass}>{text}</h3>
            </React.Fragment>
        );
    }
}


export default GameRasterComponent;
