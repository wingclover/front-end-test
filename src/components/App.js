import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getPizza } from '../actions/pizza';
import Header from './Header';
import InputArea from './InputArea';
import Loading from './Loading';
import PizzaList from './PizzaList';

export class App extends Component {
    componentDidMount(){
        this.props.getPizza()
    }
    render(){
        if (this.props.menu.length === 0){ 
            return <Loading/>
        }
        else{
            return (
                <div>
                    <Header/>
                    <div className='bottom'>
                        <InputArea/>
                        <PizzaList/>
                    </div>                   
                </div>
            )
        }
    }
}

App.propTypes = {
    getPizza: PropTypes.func.isRequired,
    menu: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
    return { menu: state.menu }
}

export default connect(mapStateToProps, { getPizza })(App)

