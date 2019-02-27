import React from 'react';
import {shallow} from 'enzyme';

import CellComponent from '../../../../src/components/Cell';


describe('<CellComponent />', () => {

    let cellDomElement;
    let props;
    let wrapper;
    let mockOnCellClick;

    beforeEach(() => {

        mockOnCellClick = jest.fn();

        props = {
            cellValue: false,
            isActive: true,
            isWinningSequenceCell: false,
            onCellClickHandler: mockOnCellClick
        };

        wrapper = shallow(<CellComponent {...props}/>);
        cellDomElement = wrapper.find('div');
    });


    it('renders a plain div per default (empty but clickable cell in game raster)', () => {

        expect(cellDomElement.length).toEqual(1);
        expect(cellDomElement.hasClass('gameCell')).toEqual(true);
    });


    it('renders an inactive, not clickable cell', ()=> {

        props = {
            ...props,
            isActive: false
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


    it('when clicked, it calls callback function', () => {

        cellDomElement = wrapper.find('div');

        cellDomElement.simulate('click');

        expect(mockOnCellClick).toHaveBeenCalled();
    });


    it('renders a not clickable cell if cell has value already', ()=> {

        props = {
            ...props,
            cellValue: false,
            isActive: false
        };
        wrapper = shallow(<CellComponent {...props}/>);
        cellDomElement = wrapper.find('div');

        cellDomElement.simulate('click');

        expect(mockOnCellClick).not.toHaveBeenCalled();
    });


    it('renders an already clicked-on cell with corresponding CSS class', ()=> {

        props = {
            ...props,
            cellValue: 'X'
        };
        wrapper = shallow(<CellComponent {...props}/>);
        cellDomElement = wrapper.find('div');

        cellDomElement.simulate('click');

        expect(cellDomElement.hasClass('active')).toEqual(true);
    });
});
