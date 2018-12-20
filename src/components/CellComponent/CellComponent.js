import React from 'react';
import PropTypes from 'prop-types';
import {isExistent} from '../../utils/dataUtils';


class CellComponent extends React.Component {

    static propTypes = {
        cellValue: PropTypes.oneOfType(
            [
                PropTypes.bool,
                PropTypes.number
            ]
        ).isRequired,
        onCellClickHandler: PropTypes.func.isRequired
    };


    render() {

        return (
            <td className={this.setCssClasses()}
                onClick={this.props.onCellClickHandler}
            >
                &nbsp;
            </td>
        );
    }


    setCssClasses() {

        const {cellValue} = this.props;

        let cssClasses = 'gameCell';

        if (isExistent(cellValue)) {
            cssClasses += ' player' + cellValue;
        }

        return cssClasses;
    }
}


export default CellComponent;
