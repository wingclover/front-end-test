import { expect } from 'code';
import axios from 'axios';
import sinon from 'sinon';
import React from 'react';
import { PIZZA_URL, fetchPizza } from '../../src/helpers/helper';

describe('fetchPizza', () => {
    it('should call pizza.json', () => {
        sinon.stub(axios, 'get')
        fetchPizza()
        expect(axios.get.firstCall.args[0]).to.equal(PIZZA_URL)
        axios.get.restore()
    })
})