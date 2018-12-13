import React from 'react';

import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow';


class ProductTable extends React.Component {

    render() {
        const rows = [];
        let lastCategory = null;
        let productList = this.props.products;
        let searchTerm = this.props.searchTerm.toLocaleLowerCase();//.toString();

        let products = this.props.isHideProductsWithZeroPoints
                       ? productList.filter((product) => Number(product.points) === 0)
                       : productList;

        products = searchTerm && searchTerm !== ''
                   ? products.filter((product) => product.name.toLowerCase().indexOf(searchTerm) !== -1)
                   : products;

        products.forEach((product, index) => {

            if (product.category !== lastCategory) {
                rows.push(
                    <ProductCategoryRow
                        category={product.category}
                        key={product.category}
                    />
                );
            }

            rows.push(
                <ProductRow
                    key={index.toString()}
                    name={product.name}
                    points={product.points}
                />
            );

            lastCategory = product.category;
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}


export default ProductTable;
