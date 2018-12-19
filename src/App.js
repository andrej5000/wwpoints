import React from 'react';


class TicTacToe extends React.Component {

    constructor(props) {
        super(props);

        this.state({
            config: {
                fieldHeight: 3,
                fieldWidth: 3,
                cellValue: false
            }
        });
    }

    renderFieldConfig() {

        const {
            fieldHeight,
            fieldWidth
        } = this.state;

        return (
            <div>
                <label>
                    Field height: &nbsp;
                    <input onChange={() => ::this.setConfigValue('fieldHeight')}/>
                </label>
                <br/>
                <label>
                    Field width: &nbsp;
                    <input onChange={() => ::this.setConfigValue('fieldWidth')}/>
                </label>
                <br/><br/>
                <button>Render TicTacToe field</button>
            </div>
        );
    }

    setConfigValue(event, field) {

        this.setState({
            field: event.target.value
        });
    }



    render() {
        return <div>Stulle</div>;
    }
}



export default TicTacToe;
