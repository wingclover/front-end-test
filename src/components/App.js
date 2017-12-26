import React, { Component } from 'react';
import Loading from './Loading';
import Header from './Header';
import InputArea from './InputArea';
import PizzaList from './PizzaList';
import { connect } from 'react-redux';
import { getPizza } from '../actions/pizza';
import PropTypes from 'prop-types';

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
    getPizza: PropTypes.func,
    menu: PropTypes.array
}

const mapStateToProps = (state) => {
    return { menu: state.menu }
}

export default connect(mapStateToProps, { getPizza })(App)

