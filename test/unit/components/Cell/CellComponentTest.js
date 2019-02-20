import React from 'react';
import {shallow} from 'enzyme';

import CellComponent from '../../../../src/components/Cell';


describe('<CellComponent />', () => {

    let cellDomElement;
    let props;
    let wrapper;
    let mockOnCellClick;

    beforeEach(() => {

        props = {
            cellValue: false,
            isActive: true,
            isWinningSequenceCell: false,
            onCellClickHandler: () => {}
        };

        wrapper = shallow(<CellComponent {...props}/>);
        cellDomElement = wrapper.find('div');
        mockOnCellClick = jest.fn();
    });


    it('renders a plain div per default (empty but clickable cell in game raster)', () => {

        expect(cellDomElement.length).toEqual(1);
        expect(cellDomElement.hasClass('gameCell')).toEqual(true);
    });


    it('renders an inactive, not clickable cell when respective prop is set', ()=> {

        props = {
            ...props,
            isActive: false,
            onCellClickHandler: mockOnCellClick
        };
        wrapper = shallow(<CellComponent {...props}/>);
        cellDomElement = wrapper.find('div');

        cellDomElement.simulate('click');

        expect(mockOnCellClick).not.toHaveBeenCalled();
        expect(cellDomElement.hasClass('inactive')).toEqual(true);
    });


    it('renders cell as winning sequence when respective prop is set', ()=> {

        props = {
            ...props,
            isWinningSequenceCell: true
        };
        wrapper = shallow(<CellComponent {...props}/>);
        cellDomElement = wrapper.find('div');

        expect(cellDomElement.hasClass('isWinningSequenceCell')).toEqual(true);
    });


    it('when clicked, cell is marked with symbol of player', () => {

        props = {
            ...props,
            cellValue: 'O',
            onCellClickHandler: mockOnCellClick
        };
        wrapper = shallow(<CellComponent {...props}/>);
        cellDomElement = wrapper.find('div');

        cellDomElement.simulate('click');

        expect(mockOnCellClick).toHaveBeenCalled();
        expect(cellDomElement.hasClass('gameCell')).toEqual(true);
        expect(cellDomElement.hasClass('active')).toEqual(true);
        expect(cellDomElement.html()).toEqual('<div class="gameCell active">O</div>');
    });

});
