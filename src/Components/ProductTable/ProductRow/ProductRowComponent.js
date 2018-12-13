import React from 'react';

class ProductRow extends React.Component {

    renderPoints() {
        return this.props.points.replace('.', ',');
    }

    render() {
        /*
        const name = this.props.stocked
                     ? this.props.name
                     : <span style={{color: 'red'}}>{this.props.name}</span>
        ;
        */

        return (
            <tr>
                <td>
                    {this.props.name}
                </td>
                <td style={{textAlign: 'right'}}>
                    {this.renderPoints()}
                </td>
            </tr>
        );
    }
}

export default ProductRow;
