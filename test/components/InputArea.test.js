import React from 'react';
import { expect } from 'code';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import InputArea from '../../src/components/InputArea';

describe('InputArea', () => {
    it('should show a filter input', () => {
        const wrapper = shallow(<InputArea />)
        expect(wrapper.containsMatchingElement(<input/>)).to.be.true();
    })

    describe('when the user enters filter text', () => {
        it('should update the InputArea state, and call `onfilter` with filter text', () => {
            const filterSpy = sinon.spy()
            const wrapper = shallow(<InputArea onFilter={filterSpy}/>)
            const input = wrapper.find('input')
            input.simulate('change', {target:{value: 'pepperoni'}})
            expect(wrapper.state('text')).to.equal('pepperoni')
            expect(filterSpy.calledOnce).to.be.true()
            expect(filterSpy.calledWith('pepperoni')).to.be.true()
        })
    })
})