import React from 'react';
import { expect } from 'code';
import { shallow } from 'enzyme';
import PIZZA from '../../pizza.json'
import PizzaList from '../../src/components/PizzaList'

describe('PizzaList', () => {
    it('should start with empty list', () => {
        const wrapper = shallow(<PizzaList/>)
        expect(wrapper.find('li').length).to.equal(0)
    })

    it('should display the list of pizza passed to it', () => {
        const wrapper = shallow(<PizzaList pizzas={PIZZA.pizzas}/>)
        const texts = wrapper.find('li').map(node => node.text())
        expect(texts).to.equal(PIZZA.pizzas)
    })
})