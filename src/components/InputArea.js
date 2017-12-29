import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { filterPizza, sortPizza } from '../actions/pizza';

export class InputArea extends Component {
    state = {
        text: ''
    }

    handleChange = (e) => {
        this.setState({text: e.target.value})
        this.props.filterPizza(e.target.value)
    }

    handleClick = () => {
        this.props.sortPizza()
    }
    render(){
        return (
            <div className='input-area text-center'>
                <input id="pizzaInput" placeholder="type here to filter" onChange={this.handleChange}/>
                <button onClick={this.handleClick}>Sort</button>
            </div>
        )
    }
}

InputArea.propTypes = {
    filterPizza: PropTypes.func.isRequired,
    sortPizza: PropTypes.func.isRequired
}

export default connect(null, { filterPizza, sortPizza})(InputArea)