import React from 'react';
import {mount, shallow} from 'enzyme';

import GameRasterComponent from '../../../../src/components/GameRaster';
import CellComponent from '../../../../src/components/Cell/CellComponent';


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
    let mockOnCellClick = jest.fn();
    let props;
    let wrapper;


    beforeEach(() => {

        props = {
            activePlayerName: activePlayerName,
            gameRasterData: gameRasterData,
            isGameFinished: isGameFinished,
            onCellClickHandler: mockOnCellClick
        };

        wrapper = shallow(<GameRasterComponent {...props}/>);
    });



    describe('renderGameRaster()', () => {

        it('Renders game raster DOM in given dimensions correctly', () => {

            expect(wrapper.find(CellComponent).length).toEqual(36);
        });


        describe('CSS classes for game raster are correct', () => {

            it('CSS class for: default', () => {

                expect(wrapper.hasClass('gameRaster')).toEqual(true);
            });


            it('CSS class for: game finished', () => {
                props = {
                    ...props,
                    isGameFinished: true,
                };
                wrapper = shallow(<GameRasterComponent {...props}/>);

                expect(wrapper.hasClass('finished')).toEqual(true);
            });


            it('CSS class for: game finished, has winner', () => {

                const newGameRasterData = [
                    {"x": 0, "y": 0, "isWinningSequenceCell": true, "value": "X"},
                    {"x": 1, "y": 0, "isWinningSequenceCell": true, "value": "X"},
                    {"x": 2, "y": 0, "isWinningSequenceCell": true, "value": "X"},
                    {"x": 0, "y": 1, "isWinningSequenceCell": false, "value": false},
                    {"x": 1, "y": 1, "isWinningSequenceCell": false, "value": false},
                    {"x": 2, "y": 1, "isWinningSequenceCell": false, "value": false},
                    {"x": 0, "y": 2, "isWinningSequenceCell": false, "value": false},
                    {"x": 1, "y": 2, "isWinningSequenceCell": false, "value": false},
                    {"x": 2, "y": 2, "isWinningSequenceCell": false, "value": false}
                ];

                props = {
                    ...props,
                    gameRasterData: newGameRasterData,
                    isGameFinished: true,
                };
                wrapper = shallow(<GameRasterComponent {...props}/>);

                expect(wrapper.hasClass('hasGameWinner')).toEqual(true);
            });
        });


        describe('Headlines:', () => {

            it('Renders headline for: game not finished, regular move (default)', () => {

                expect(wrapper.find('h3').html()).toEqual('<h3>Your turn, Apollo.</h3>');
            });


            it('Renders headline for: game finished, no winner', () => {

                props = {
                    ...props,
                    isGameFinished: true,
                };
                wrapper = shallow(<GameRasterComponent {...props}/>);

                expect(wrapper.find('h3').html()).toEqual('<h3>Game over, no winner!</h3>');
            });


            it('Renders headline for: game finished, has winner', () => {

                gameRasterData = [
                    {"x": 0, "y": 0, "isWinningSequenceCell": true, "value": "X"},
                    {"x": 1, "y": 0, "isWinningSequenceCell": true, "value": "X"},
                    {"x": 2, "y": 0, "isWinningSequenceCell": true, "value": "X"},
                    {"x": 0, "y": 1, "isWinningSequenceCell": false, "value": false},
                    {"x": 1, "y": 1, "isWinningSequenceCell": false, "value": false},
                    {"x": 2, "y": 1, "isWinningSequenceCell": false, "value": false},
                    {"x": 0, "y": 2, "isWinningSequenceCell": false, "value": false},
                    {"x": 1, "y": 2, "isWinningSequenceCell": false, "value": false},
                    {"x": 2, "y": 2, "isWinningSequenceCell": false, "value": false}
                ];

                props = {
                    ...props,
                    gameRasterData: gameRasterData,
                    isGameFinished: true,
                };
                wrapper = shallow(<GameRasterComponent {...props}/>);

                expect(wrapper.find('h3').html()).toEqual('<h3>Game over! Winner: Apollo</h3>');
            });
        });
    });
});
