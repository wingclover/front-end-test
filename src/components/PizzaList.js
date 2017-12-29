import React from 'react';
import PropTypes from 'prop-types'

const PizzaList = (props) => {
    if (props.pizzas){
        const pizzas = props.pizzas.map(pizza => <li key={pizza}>{pizza}</li>)
        return <ul>{pizzas}</ul>
    } else { return <ul/>}              
}

PizzaList.propTypes = {
    pizzas: PropTypes.array.isRequired
}

export default PizzaList