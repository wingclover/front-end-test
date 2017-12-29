import React from 'react';
import PropTypes from 'prop-types'

const PizzaList = (props) => {
    if (props.pizzas){
        const pizzas = props.pizzas.map(pizza => <li key={pizza}>{pizza}</li>)
        return (
            <div className='pizza-box col-md-6 offset-md-3'>
                <ul className='list-unstyled'>{pizzas}</ul>
            </div>)
    } else { return <ul/>}              
}

PizzaList.propTypes = {
    pizzas: PropTypes.array.isRequired
}

export default PizzaList