import React from 'react'
import { expect } from 'code'
import { shallow } from 'enzyme'
import Loading from '../../src/components/Loading'

describe('Loading', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Loading/>)
    })

    it('should render', () => {
        expect(wrapper.exists()).to.be.true()
    })
   
    it('should h2 of `Loading...`', () => {
        expect(wrapper.find('h2').text()).to.equal('Loading...')
    })
})