import reducer from '../../src/reducers'
import constants from '../../src/actions/constants'

import { expect } from 'code'

describe('reducer', () => {
    const pizzas = ['abc', 'efg', '3', 'bgl']
    const state = {menu: pizzas, display: pizzas}

    it('initializes with default state', () => {
        expect(reducer(undefined, {})).to.equal({menu: [], display: []})
    })

    it('should receive and set menu', () => {
        expect(reducer({}, {type: constants.GET_PIZZA, data: pizzas})).to.equal(state)
    })

    it('should filter the list of displayed pizza in a case insensitive way', () => {
        expect(reducer(state, {type: constants.FILTER_PIZZA, data: 'a'})).to.equal({menu: pizzas, display: ['abc']})
    })

    it('should sort the displayed pizza', () => {
        expect(reducer(state, {type: constants.SORT_PIZZA})).to.equal({menu: pizzas, display: ['efg', 'bgl', 'abc', '3']})
    })
})