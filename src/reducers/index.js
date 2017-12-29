import constants from '../../src/actions/constants'

const getPizza = (state, action) => ({ 
    menu: action.data, 
    display: action.data
})

const filterPizza = (state, action) => ({
    menu: state.menu, 
    display: state.menu.filter(item => (
            item.toLowerCase().includes(action.data.toLowerCase())
    ))
})

const sortPizza = (state, action) => ({
    menu: state.menu, 
    display: [...state.display].sort((a, b) => a.toLowerCase() < b.toLowerCase() ? 1: -1)
})

const rootReducer = (state = {menu: [], display: []}, action) => {
    const actionTypes = {
        [constants.GET_PIZZA]: getPizza,
        [constants.FILTER_PIZZA]: filterPizza,
        [constants.SORT_PIZZA]: sortPizza 
    }

    const reducer = actionTypes[action.type]
    return reducer ? reducer(state, action) : state 
}

export default rootReducer