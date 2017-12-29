import React from 'react';
import { expect } from 'code';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { PIZZA_URL, fetchPizza } from '../../src/helpers/helper';
import PizzaApp from '../../src/components/app'
import InputArea from '../../src/components/InputArea'
import PizzaList from '../../src/components/PizzaList'
import PIZZA from '../../pizza.json'

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
    
    describe('when the page waits for data to load', () => {
        it('then the text `Loading` should be shown', () => {
            expect(wrapper.equals(<div className='loading text-center'>Loading...</div>)).to.be.true(); 
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
