import React from 'react';
import {shallow} from 'enzyme';

import GameRasterComponent from '../../../../src/components/GameRaster';


describe('<GameRasterComponent />', () => {

    let activePlayerName = "Apollo";
    let gameRasterData = [
        {"x": 0, "y": 0, "isWinningSequenceCell": false, "value": false},
        {"x": 1, "y": 0, "isWinningSequenceCell": false, "value": false},
        {"x": 2, "y": 0, "isWinningSequenceCell": false, "value": false},
        {"x": 3, "y": 0, "isWinningSequenceCell": false, "value": false},
        {"x": 4, "y": 0, "isWinningSequenceCell": false, "value": false},
        {"x": 5, "y": 0, "isWinningSequenceCell": false, "value": false},
        {"x": 0, "y": 1, "isWinningSequenceCell": false, "value": false},
        {"x": 1, "y": 1, "isWinningSequenceCell": false, "value": false},
        {"x": 2, "y": 1, "isWinningSequenceCell": false, "value": false},
        {"x": 3, "y": 1, "isWinningSequenceCell": false, "value": false},
        {"x": 4, "y": 1, "isWinningSequenceCell": false, "value": false},
        {"x": 5, "y": 1, "isWinningSequenceCell": false, "value": false},
        {"x": 0, "y": 2, "isWinningSequenceCell": false, "value": false},
        {"x": 1, "y": 2, "isWinningSequenceCell": false, "value": false},
        {"x": 2, "y": 2, "isWinningSequenceCell": false, "value": false},
        {"x": 3, "y": 2, "isWinningSequenceCell": false, "value": false},
        {"x": 4, "y": 2, "isWinningSequenceCell": false, "value": false},
        {"x": 5, "y": 2, "isWinningSequenceCell": false, "value": false},
        {"x": 0, "y": 3, "isWinningSequenceCell": false, "value": false},
        {"x": 1, "y": 3, "isWinningSequenceCell": false, "value": false},
        {"x": 2, "y": 3, "isWinningSequenceCell": false, "value": false},
        {"x": 3, "y": 3, "isWinningSequenceCell": false, "value": false},
        {"x": 4, "y": 3, "isWinningSequenceCell": false, "value": false},
        {"x": 5, "y": 3, "isWinningSequenceCell": false, "value": false},
        {"x": 0, "y": 4, "isWinningSequenceCell": false, "value": false},
        {"x": 1, "y": 4, "isWinningSequenceCell": false, "value": false},
        {"x": 2, "y": 4, "isWinningSequenceCell": false, "value": false},
        {"x": 3, "y": 4, "isWinningSequenceCell": false, "value": false},
        {"x": 4, "y": 4, "isWinningSequenceCell": false, "value": false},
        {"x": 5, "y": 4, "isWinningSequenceCell": false, "value": false},
        {"x": 0, "y": 5, "isWinningSequenceCell": false, "value": false},
        {"x": 1, "y": 5, "isWinningSequenceCell": false, "value": false},
        {"x": 2, "y": 5, "isWinningSequenceCell": false, "value": false},
        {"x": 3, "y": 5, "isWinningSequenceCell": false, "value": false},
        {"x": 4, "y": 5, "isWinningSequenceCell": false, "value": false},
        {"x": 5, "y": 5, "isWinningSequenceCell": false, "value": false}
    ];
    let isGameFinished = false;
    let props;
    let wrapper;


    beforeEach(() => {

        props = {
            activePlayerName: activePlayerName,
            gameRasterData: gameRasterData,
            isGameFinished: isGameFinished,
            onCellClickHandler: () => {}
        };

        wrapper = shallow(<GameRasterComponent {...props}/>);
    });



    describe('renderGameRaster()', () => {

        it('Renders game raster DOM correctly', () => {

            //console.log((wrapper.find('div').first()));
            expect(wrapper.find('div').length).toEqual(1);
        });

    });

});
