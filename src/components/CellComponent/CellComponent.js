import React from 'react';
import PropTypes from 'prop-types';


class CellComponent extends React.Component {

    constructor(props) {
        super(props);

        this.onCellClick = this.onCellClick.bind(this);

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
                onClick={this.onCellClick}
            >
                {this.state.activePlayerSymbol}
            </td>
        );
    }


    setCssClasses() {

        let cssClasses = 'gameCell';

        if (this.props.cellValue) {
            cssClasses += ' active';
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
