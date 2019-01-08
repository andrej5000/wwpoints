import React from 'react';
import PropTypes from 'prop-types';

import styles from './CellComponent.scss';


class CellComponent extends React.Component {

    static propTypes = {
        cellValue: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string
        ]).isRequired,
        isGameFinished: PropTypes.bool.isRequired,
        isWinningSequenceCell: PropTypes.bool.isRequired,
        onCellClickHandler: PropTypes.func.isRequired
    };


    render() {

        return (
            <td className={this.setCssClasses()}
                onClick={::this.props.onCellClickHandler}
            >
                {this.props.cellValue}
            </td>
        );
    }


    setCssClasses() {

        let cssClasses = styles.gameCell;

        if (this.props.cellValue) {
            cssClasses += ` ${styles.active}`;
        }

        if (this.props.isWinningSequenceCell) {
            cssClasses += ` ${styles.isWinningSequenceCell}`;
        }

        if (this.props.isGameFinished) {
            cssClasses += ` ${styles.inactive}`;
        }

        return cssClasses;
    }
}


export default CellComponent;
