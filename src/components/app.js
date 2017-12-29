import React from 'react';
import { fetchPizza } from '../helpers/helper'
import InputArea from './InputArea'
import PizzaList from './PizzaList'
import PropTypes from 'prop-types'

class PizzaApp extends React.Component {
    state = {
        pizzas: [],
        allPizzas: []
    }

    componentDidMount(){
        this.props.fetchPizza().then(response =>{
            this.setState({pizzas: response.data.pizzas, allPizzas: response.data.pizzas})
        });
    }

    updateList = (pizzas) => {
        this.setState({pizzas: pizzas})
    }
    
    filterPizza = (word) => {
        const keyword = word.toLowerCase()
        const filtered = this.state.allPizzas.filter(pizza => {
            return pizza.toLowerCase().includes(keyword)
        })
        this.updateList(filtered)
    }

    sortPizza = () => {
        const sorted = [...this.state.pizzas].sort((a,b) => a.toLowerCase() < b.toLowerCase() ? 1: -1)
        this.updateList(sorted)
    }
    render(){
        if (this.state.allPizzas && this.state.allPizzas.length === 0){
            return <div>Loading</div>
        }
        else {
            return(
                <div>
                    <InputArea onFilter={this.filterPizza}/>
                    <button onClick={this.sortPizza}>Sort</button>
                    <PizzaList pizzas = {this.state.pizzas}/>
                </div>
            )
        }
        
    }
}

PizzaApp.defaultProps = {
    fetchPizza
}

PizzaApp.propTypes = {
    fetchPizza: PropTypes.func.isRequired
}

export default PizzaApp


