import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import { expect } from 'code'
import { getPizza, filterPizza, sortPizza } from '../../src/actions/pizza'
import constants from '../../src/actions/constants'

describe('getPizza action creator', () => {
    const createMockStore = configureMockStore([thunk])
    const store = createMockStore({menu: [], display: []})
    const mockResponse = { pizzas: ['chicken'] }

    fetchMock.get(constants.PIZZA_URL, mockResponse)
    
    it('creates an async action to fetch pizza from pizza.json', async () => {
        const expectedActions = [{ type: constants.GET_PIZZA, data: mockResponse.pizzas }]
        await store.dispatch(getPizza()).then(() => {
            expect(store.getActions()).to.equal(expectedActions)
            fetchMock.restore();
        })       
    })
})

describe('filter action creator', () => {
    it('creates an action to filter a list of items', () => {
        const letter = 'a'
        const expectedAction = {type: constants.FILTER_PIZZA, data: letter}
        expect(filterPizza(letter)).to.equal(expectedAction)
    })
})

describe('sort action creator', () => {
    it('creates an action to sort a list of items in reverse alphabetic order', () => {
        const expectedAction = {type: constants.SORT_PIZZA}
        expect(sortPizza()).to.equal(expectedAction)
    })
})