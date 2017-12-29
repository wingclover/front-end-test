import { expect } from 'code'
import React from 'react'
import { shallow } from 'enzyme'
import { PizzaList } from '../../src/components/PizzaList'

describe('PizzaList', () => {
    let wrapper

    const props = {
        pizzas: ['chicken']    
    }

    beforeEach(() =>{
        wrapper = shallow(<PizzaList {...props}/>)
    })

    it('should render', () =>{
        expect(wrapper.exists()).to.be.true()
    })

    describe('when mounted', () => {
        it('should display pizza received from props', () => {
            expect(wrapper.find('li').length).to.equal(props.pizzas.length)
        })
    })
    

    
})