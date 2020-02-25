import React from 'react';
import { shallow } from 'enzyme';
import PreCheck from './pre-call-check';

describe("PreCheck Component", function() {
    let wrapper;
    const historyMock = { push: jest.fn() };
    localStorage.setItem('signedIn', true);
    beforeEach(() => {
        wrapper = shallow(<PreCheck history={historyMock} />);
    });
    afterEach(() => {
        localStorage.clear();
    });

    

    it("Render PreCheck component", function() {
        const instance2 = wrapper.instance();
        expect(instance2.props.history.push).toHaveBeenCalled();
    });

});