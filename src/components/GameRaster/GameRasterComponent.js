import React from 'react';
import PropTypes from 'prop-types';

import CellComponent from '../Cell/CellComponent';

import styles from './GameRasterComponent.scss';


class GameRasterComponent extends React.Component {

    static propTypes = {
        activePlayerName: PropTypes.string.isRequired,
        isGameFinished: PropTypes.bool.isRequired,
        gameRasterData: PropTypes.array.isRequired,
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

        const {
            gameRasterData,
            isGameFinished
        } = this.props;

        const gameRaster = [];
        const gameRasterHeight = gameRasterData.filter((cell) => cell.x >= 0 && cell.y === 0).length;
        const gameRasterWidth = gameRasterData.filter((cell) => cell.y >= 0 && cell.x === 0).length;

        for (let y = 0; y < gameRasterHeight; y++) {

            const cells = [];

            for (let x = 0; x < gameRasterWidth; x++) {

                const cell = gameRasterData.find((cell) => cell.x === x && cell.y === y);
                const cellValue = cell.value;

                cells.push(
                    <CellComponent cellValue={cellValue}
                                   isGameFinished={isGameFinished}
                                   isWinningSequenceCell={cell.isWinningSequenceCell}
                                   key={y + x}
                                   onCellClickHandler={
                                       () => !cellValue && !isGameFinished
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

        let text = `Your turn, ${this.props.activePlayerName}.`;

        if (this.props.isGameFinished) {
            text = 'Game over, no winner!';
        }

        if (this.props.winningPlayerName !== '') {
            text = `Game over! Winner: ${this.props.winningPlayerName}`;
        }

        return (
            <React.Fragment>
                <h3>{text}</h3>
            </React.Fragment>
        );
    }
}


export default GameRasterComponent;
