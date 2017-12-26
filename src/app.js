import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
// Note: this is the entry point for the entire application

// step 1: you will need to load the pizza data. it is available at /pizza.json. what-wg fetch is pre-installed.
// remember that fetch uses promises.

export const PIZZA_URL = 'pizza.json'
export const fetchPizza = () => {
    return axios.get(PIZZA_URL)  
};

// step 2: implement the view and required behaviors

export class PizzaApp extends React.Component {
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
        if (this.state.allPizzas.length == 0){
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

export class InputArea extends React.Component {
    state = {
        text: ''
    }

    updateText = (text) => {
        this.setState({text: text})
    }

    handleChange = (e) => {
        this.updateText(e.target.value)
        this.props.onFilter(e.target.value)
    }

    handleClick = () => {
        this.props.onSort()
    }
    render(){
        return (
            <div>
                <input id="pizzaInput" onChange={this.handleChange}/>
            </div>
        )
    }
}

export class PizzaList extends React.Component {
    render(){
        if (this.props.pizzas){
            const pizzas = this.props.pizzas.map(pizza => <li key={pizza}>{pizza}</li>)
            return <ul>{pizzas}</ul>
        } else { return <ul/>}              
    }
}

