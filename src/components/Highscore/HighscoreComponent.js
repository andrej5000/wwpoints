import React from 'react';
import PropTypes from 'prop-types';

import styles from './HighscoreComponent.scss';
import {formatTime, getFormattedDate} from '../../utils/utils';


class HighscoreComponent extends React.Component {

    static propTypes =  {
        gameWinnerHighscoreId: PropTypes.string.isRequired,
        highscore: PropTypes.array.isRequired,
        isGameFinished: PropTypes.bool.isRequired
    };


    renderHighscore() {

        if (!this.props.isGameFinished) {

            return;
        }

        const sortedHighscore = this.props.highscore.sort(HighscoreComponent.sortHighscoreByGameDuration);
        const highscoreDomRows = [];
        let highscoreDomTable;
        let gameWinnerCssClass;

        sortedHighscore.map((row) => {

            gameWinnerCssClass = row._id === this.props.gameWinnerHighscoreId
                ? gameWinnerCssClass = styles.gameWinner
                : null;

            highscoreDomRows.push(
                <tr className={gameWinnerCssClass}
                    key={row._id}
                >
                    <td>{row.playerName}</td>
                    <td>{formatTime(row.gameDuration)}</td>
                    <td>{getFormattedDate(row.createdAt)}</td>
                </tr>
            );
        });

        highscoreDomTable = (
            <div className={styles.highscoreWrap}>
                <table className={styles.highscore}>
                    <thead>
                        <tr>
                            <th className={styles.title}
                                colSpan={3}
                            >
                                TicTacToe High-Score
                            </th>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <th>Game Duration</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>

                        {highscoreDomRows}

                    </tbody>
                </table>
            </div>
        );

        return highscoreDomTable;
    }


    static sortHighscoreByGameDuration(a, b)  {

        const A = Number(a.gameDuration);
        const B = Number(b.gameDuration);

        if (A < B) {

            return -1;
        }

        if (A > B) {

            return 1;
        }

        return 0;
    };


    render() {

        return (

            <React.Fragment>

                {this.renderHighscore()}

            </React.Fragment>

        );
    }

}


export default HighscoreComponent;
