import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class PizzaList extends Component {

    render(){
        if (this.props.pizzas.length > 0){
            const pizzas = this.props.pizzas.map(pizza => <li key={pizza}>{pizza}</li>)
            return (
                <div className='pizza-box col-md-6 offset-md-3'>
                    <ul className='list-unstyled'>{pizzas}</ul>
                </div>
            )
        } else { return <ul/>}              
    }
}

PizzaList.propTypes = {
    pizzas: PropTypes.array
}

const mapStateToProps = (state) => {
    return {pizzas: state.display}
}

export default connect(mapStateToProps)(PizzaList)

