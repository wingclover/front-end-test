import constants from './constants';

export const getPizza = () => {
    return (dispatch) => {
        return fetch(constants.PIZZA_URL)
            .then(res => res.json())
            .then(json => dispatch({type: constants.GET_PIZZA, data: json.pizzas}))
    }
}

export const filterPizza = (match) => {
    return {
        type: constants.FILTER_PIZZA, 
        data: match
    }
}

export const sortPizza = () => {
    return {
        type: constants.SORT_PIZZA,
    }
}