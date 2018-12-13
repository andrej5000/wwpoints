import React from 'react';


class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.throwError = this.throwError.bind(this);
    }

    throwError() {
        throw new Error('I crashed!');
    }

    render() {

        return (
            <form>
                <fieldset>

                    <input
                        onKeyUp={this.props.onHandleSearch}
                        placeholder='Search...'
                        type='text'
                    />

                    <label
                        //onClick={this.throwError}
                        style={{
                            'display': 'block',
                            'cursor': 'pointer'
                        }}
                    >

                        <input
                            onChange={this.props.onToggleProductStock}
                            type='checkbox'
                        />
                        Only show food with 0 points!

                    </label>
                </fieldset>
            </form>
        );
    }
}


export default SearchBar;
