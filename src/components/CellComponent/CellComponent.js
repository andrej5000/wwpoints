import React from 'react';
import PropTypes from 'prop-types';

import styles from './CellComponent.scss';


class CellComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activePlayerSymbol: ''
        };
    }


    static propTypes = {
        activePlayerSymbol: PropTypes.string.isRequired,
        cellValue: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.number
        ]).isRequired,
        onCellClickHandler: PropTypes.func.isRequired
    };


    render() {

        return (
            <td className={this.setCssClasses()}
                onClick={::this.onCellClick}
            >
                {this.state.activePlayerSymbol}
            </td>
        );
    }


    setCssClasses() {

        let cssClasses = styles.gameCell;

        if (this.props.cellValue) {
            cssClasses += ` ${styles.active}`;
        }

        return cssClasses;
    }


    onCellClick() {

        // We need to also store the player's symbol locally. Learned it the hard way ...
        if (this.state.activePlayerSymbol === '') {

            this.setState({
                activePlayerSymbol: this.props.activePlayerSymbol
            });
        }

        this.props.onCellClickHandler();
    }
}


export default CellComponent;
