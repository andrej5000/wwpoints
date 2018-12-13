import React from 'react';

class ProductRow extends React.Component {

    renderPoints() {
        return this.props.points.replace('.', ',');
    }

    render() {

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
