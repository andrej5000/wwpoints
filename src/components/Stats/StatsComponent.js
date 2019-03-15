import React from 'react';
import PropTypes from 'prop-types';

import {formatTime} from '../../utils/utils';

import styles from './StatsComponent.scss';


class StatsComponent extends React.Component {

    static propTypes = {
        gameDuration: PropTypes.number.isRequired,
        isGameFinished: PropTypes.bool.isRequired,
        numberOfMoves: PropTypes.object.isRequired,
        players: PropTypes.array.isRequired
    };


    renderGameTime() {

        if (this.props.isGameFinished) {

            return (
                <tr>
                    <td colSpan={2}>
                        <strong>Game time:</strong>
                        <span>

                            {formatTime(this.props.gameDuration)}

                        </span>
                    </td>
                </tr>
            );
        }
    }


    render() {

        return (
            <table className={styles.playerMovesBox}>
                <tbody>
                    <tr className={styles.borderless}>
                        <td colSpan={2}>
                            <strong>Number of moves:</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>
                                {this.props.players[0].name}:
                            </span>
                            <input disabled={'disabled'}
                                   maxLength={4}
                                   type={'text'}
                                   value={this.props.numberOfMoves.player0}
                            />
                        </td>
                        <td>
                            <span>
                                {this.props.players[1].name}:
                            </span>
                            <input disabled={'disabled'}
                                   maxLength={4}
                                   type={'text'}
                                   value={this.props.numberOfMoves.player1}
                            />
                        </td>
                    </tr>


                    {this.renderGameTime()}


                </tbody>
            </table>
        );
    }
}


export default StatsComponent;
