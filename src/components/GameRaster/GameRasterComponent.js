import React from 'react';
import PropTypes from 'prop-types';

import CellComponent from '../Cell/CellComponent';

import styles from './GameRasterComponent.scss';


class GameRasterComponent extends React.Component {

    static propTypes = {
        activePlayerName: PropTypes.string.isRequired,
        gameRasterData: PropTypes.array.isRequired,
        isGameFinished: PropTypes.bool.isRequired,
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
        const gameRasterHeight = gameRasterData.filter((cell) => cell.y >= 0 && cell.x === 0).length;
        const gameRasterWidth = gameRasterData.filter((cell) => cell.x >= 0 && cell.y === 0).length;

        for (let y = 0; y < gameRasterHeight; y++) {

            const cells = [];

            for (let x = 0; x < gameRasterWidth; x++) {

                const cell = gameRasterData.find((cell) => cell.x === x && cell.y === y);
                const cellValue = cell.value;

                cells.push(
                    <CellComponent cellValue={cellValue}
                                   isActive={!isGameFinished}
                                   isWinningSequenceCell={cell.isWinningSequenceCell}
                                   key={y + x}
                                   onCellClickHandler={() => this.props.onCellClickHandler({...cell})}
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


    renderHeadlines() {

        let text = `Your turn, ${this.props.activePlayerName}.`;

        if (this.props.isGameFinished) {
            text = 'Game over, no winner!';
        }

        if (this.props.winningPlayerName !== '') {
            text = `Game over! Winner: ${this.props.winningPlayerName}`;
        }

        return <h3>{text}</h3>;
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
}


export default GameRasterComponent;
