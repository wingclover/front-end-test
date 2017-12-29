import { expect } from 'code'
import React from 'react'
import { shallow } from 'enzyme'
import Header from '../../src/components/Header'

describe('Header', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(<Header/>)
    })

    it('should render', () => {
        expect(wrapper.exists()).to.be.true()
    })

    it('should include a h1 title', () => {
        expect(wrapper.find('h1').exists()).to.be.true()
    })
})