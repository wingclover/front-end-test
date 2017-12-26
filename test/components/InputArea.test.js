import React from 'react'
import { expect } from 'code'
import { shallow } from 'enzyme'
import { InputArea } from '../../src/components/InputArea'
import sinon from 'sinon'


describe('InputArea', () => {
    let wrapper;

    const filterMock = sinon.spy()
    const sortMock = sinon.spy()

    const props = {
        filterPizza: filterMock,
        sortPizza: sortMock
    }

    beforeEach(() => {
        wrapper = shallow(<InputArea {...props}/>)
    })

    it('should render', () => {
        expect(wrapper.exists()).to.be.true()
    })

    it('should contain an input area and a button', () => {
        expect(wrapper.find('input').exists()).to.be.true()
        expect(wrapper.find('button').exists()).to.be.true()
    })

    describe('when user types into the input', () => {
        const userInput = 'a'
        
        beforeEach(() =>{
            wrapper.find('input').simulate('change', {target: {value: userInput}})
        })

        it('should update local state with user input', () => {
            expect(wrapper.state('text')).to.equal(userInput)
        })

        it('should call `filterPizza` from props with user input', () => {
            expect(wrapper.instance().props.filterPizza.calledWith(userInput)).to.be.true()
        })
    })

    describe('when user click `sort` button', () => {
        beforeEach(() => {
            wrapper.find('button').simulate('click')
        })
        
        it('should call `sortPizza` from props', () => {
            expect(wrapper.instance().props.sortPizza.calledOnce).to.be.true()
        })
    })
})