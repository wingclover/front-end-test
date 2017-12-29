import { expect } from 'code'
import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { App } from '../../src/components/App'
import InputArea from '../../src/components/InputArea'
import Loading from '../../src/components/Loading'
import PizzaList from '../../src/components/PizzaList'

describe('App', () => {
    let wrapper;
    const getPizzaSpy = sinon.spy()
    const props = {
        menu: [],
        getPizza: getPizzaSpy
    }

    beforeEach(() => {
        wrapper = shallow(<App {...props}/>)
    })

    afterEach(() => {
        wrapper.unmount()
        getPizzaSpy.reset()
    })
    
    it('should render', () => {
        expect(wrapper.exists()).to.be.true()
    })

    it('should call `getPizza` from props when mounted', () => {
        expect(wrapper.instance().props.getPizza.calledOnce).to.be.true()
    })

    describe('When the page waits for data to load', () => {

        it('should show only the `Loading` component', () => {
            expect(wrapper.equals(<Loading/>)).to.be.true()
        })

    })

    describe('after data loaded', () => {
        let loadedWrapper
        const loadedProps = {
            menu: ['chicken'],
            getPizza: getPizzaSpy
        }

        beforeEach(() => {
            loadedWrapper = shallow(<App {...loadedProps} />)
        })
        
        it('should render Header', () => {
            expect(loadedWrapper.find('Header').exists()).to.be.true()
        })

        it('should render connected InputArea', () => {
            expect(loadedWrapper.find('Connect(InputArea)').exists()).to.be.true()
        })

        it('should render connected PizzaList', () => {
            expect(loadedWrapper.find('Connect(PizzaList)').exists()).to.be.true()
        })
    })


})