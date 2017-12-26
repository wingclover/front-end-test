import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'code';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import axios from 'axios';

import { PIZZA_URL, fetchPizza, PizzaApp, InputArea, PizzaList } from '../src/app.js';
import PIZZA from '../pizza.json'

describe('PizzaApp', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<PizzaApp/>)
    })    

    it('should render', () => {
        expect(wrapper.exists()).to.be.true();
    })

    it('should start with an empty list', () => {
        expect(wrapper.state('allPizzas')).to.be.empty()
    })

    it('should call fetchPizza on component mount', async () => {
        const fetchStub = sinon.stub().resolves({data:{}});
        const app = await shallow(<PizzaApp fetchPizza={fetchStub}/>);
        app.instance().componentDidMount()
        expect(fetchStub.calledOnce).to.be.true();
    })

    it('should set component state to returned data', async () => {
        const fetchStub = sinon.stub().resolves({data: PIZZA});
        const app = await shallow(<PizzaApp fetchPizza={fetchStub}/>);
        await app.instance().componentDidMount()
        expect(app.state('allPizzas')).to.equal(PIZZA.pizzas)
        expect(app.state('pizzas')).to.equal(PIZZA.pizzas)
    })
    

    it('should call pizza.json', () => {
        sinon.stub(axios, 'get')
        fetchPizza()
        expect(axios.get.firstCall.args[0]).to.equal(PIZZA_URL)
        axios.get.restore()
    })

    describe('when the page waits for data to load', () => {
        it('then the text `Loading` should be shown', () => {
            expect(wrapper.equals(<div>Loading</div>)).to.be.true(); 
        })
    })
    
    describe('when the server returns a response', () => {
        beforeEach(() => {
            wrapper.setState({pizzas: PIZZA.pizzas, allPizzas: PIZZA.pizzas})
        })
    
        it('should render InputArea, `Sort` button and PizzaList', () => {
            expect(wrapper.containsAllMatchingElements([
                <InputArea/>,
                <button>Sort</button>,
                <PizzaList/>
            ])).to.be.true();
        })

        it ('should pass list of pizza to PizzaList for display', () => {
            const list = wrapper.find(PizzaList);
            expect(list.prop('pizzas')).to.equal(wrapper.state('pizzas'))
        })

        describe('filter function', () =>{
            it('should filter the pizza in a case insensitive way', () => {
                wrapper.instance().filterPizza('sau');
                expect(wrapper.state('pizzas')).to.equal(["Sausage", "Sausage and Pepperoni"])
            })
    
            it('should pass filterPizza to `InputArea`', () => {
                const inputArea = wrapper.find(InputArea) 
                expect(inputArea.prop('onFilter')).to.equal(wrapper.instance().filterPizza)
            })
    
            it('should pass a bound filterPizza function to `InputArea`', () => {
                const inputArea = wrapper.find(InputArea) 
                inputArea.prop('onFilter')('sau');
                expect(wrapper.state('pizzas')).to.equal(["Sausage", "Sausage and Pepperoni"])
            })
        })

        describe('sort function', () => {
            it('should sort the list of displayed pizzas in reverse alphabetic order when `sort` button is clicked', () => {
                const button = wrapper.find('button')
                button.simulate('click')
                expect(wrapper.state('pizzas')).to.equal([
                    "vegetable", 
                    "Sausage and Pepperoni", 
                    "Sausage", 
                    "Pepperoni", 
                    "macaroni", 
                    "Hawaiian", 
                    "Chicken", 
                    "Cheese", 
                    "3 cheeSe"
                ])
            })
        })
           
    })
   
})

describe('InputArea', () => {
    
    it('should show a filter input', () => {
        const wrapper = shallow(<InputArea />)
        expect(wrapper.containsMatchingElement(<input/>)).to.be.true();
    })

    describe('when the user enters filter text', () => {
        it('should update the InputArea state, and call `onfilter` with filter text', () => {
            const filterSpy = sinon.spy()
            const wrapper = shallow(<InputArea onFilter={filterSpy}/>)
            const input = wrapper.find('input')
            input.simulate('change', {target:{value: 'pepperoni'}})
            expect(wrapper.state('text')).to.equal('pepperoni')
            expect(filterSpy.calledOnce).to.be.true()
            expect(filterSpy.calledWith('pepperoni')).to.be.true()
        })

    })
})

describe('PizzaList', () => {
    it('should start with empty list', () => {
        const wrapper = shallow(<PizzaList/>)
        expect(wrapper.find('li').length).to.equal(0)
    })

    it('should display the list of pizza passed to it', () => {
        const wrapper = shallow(<PizzaList pizzas={PIZZA.pizzas}/>)
        const texts = wrapper.find('li').map(node => node.text())
        expect(texts).to.equal(PIZZA.pizzas)
    })
})