import React from 'react';
import PropTypes from 'prop-types'

class InputArea extends React.Component {
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

    render(){
        return (
            <div className='input-area text-center col-md-2 offset-md-5'>
                <input id="pizzaInput" onChange={this.handleChange}/>
            </div>
        )
    }
}

InputArea.propTypes = {
    onFilter: PropTypes.func.isRequired
}

export default InputArea