import React from 'react';
import PropTypes from 'prop-types';

import CellComponent from '../Cell/CellComponent';

import styles from './GameRasterComponent.scss';


class GameRasterComponent extends React.Component {

    static propTypes = {
        activePlayerName: PropTypes.string.isRequired,
        gameRasterData: PropTypes.array.isRequired,
        isGameFinished: PropTypes.bool.isRequired,
        onCellClickHandler: PropTypes.func.isRequired
    };


    renderGameRaster() {

        const {
            gameRasterData,
            isGameFinished
        } = this.props;

        const gameRaster = [];
        const gameRasterHeight = gameRasterData.filter((cell) => cell.y >= 0 && cell.x === 0).length;
        const gameRasterWidth = gameRasterData.filter((cell) => cell.x >= 0 && cell.y === 0).length;

        for (let y = 0; y < gameRasterHeight; y++) {

            const cells = [];

            for (let x = 0; x < gameRasterWidth; x++) {

                const cell = gameRasterData.find((cell) => cell.x === x && cell.y === y);
                const cellValue = cell.value;

                cells.push(
                    <td key={y + x}>
                        <CellComponent cellValue={cellValue}
                                       isActive={!isGameFinished}
                                       isWinningSequenceCell={cell.isWinningSequenceCell}
                                       onCellClickHandler={() => this.props.onCellClickHandler({...cell})}
                        />
                    </td>
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


    renderHeadlines() {

        const hasWinner = this.hasWinner();
        let text;

        if (this.props.isGameFinished && !hasWinner) {
            text = 'Game over, no winner!';
        } else if (this.props.isGameFinished && hasWinner) {
            text = `Game over! Winner: ${this.props.activePlayerName}`;
        } else {
            text = `Your turn, ${this.props.activePlayerName}.`;
        }

        return <h3>{text}</h3>;
    }


    hasWinner() {

        return this.props.gameRasterData.filter((cell) => cell.isWinningSequenceCell).length > 0;
    }


    setCssClasses() {

        let cssClasses = styles.gameRaster;

        if (this.props.isGameFinished) {
            cssClasses += ` ${styles.finished}`;
        }

        if (this.hasWinner()) {
            cssClasses += ` ${styles.hasGameWinner}`;
        }

        return cssClasses;
    }


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
}


export default GameRasterComponent;
