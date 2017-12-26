import constants from '../../src/actions/constants'

const reducer = (state = {menu: [], display: []}, action) => {
    switch(action.type) {
        case constants.GET_PIZZA:
            return { 
                menu: action.data, 
                display: action.data
            }
        case constants.FILTER_PIZZA:
            return { 
                menu: state.menu, 
                display: state.menu.filter(item => (
                        item.toLowerCase().includes(action.data.toLowerCase())
                ))
            }
        case constants.SORT_PIZZA:
            return {
                menu: state.menu, 
                display: [...state.display].sort((a, b) => a.toLowerCase() < b.toLowerCase() ? 1: -1)
            }
 
        default:
            return state
    }
}

export default reducer