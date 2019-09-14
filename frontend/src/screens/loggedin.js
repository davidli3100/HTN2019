import React, { Component } from 'react'

export default class LoggedIn extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user
        }
    }

    render() {
        return (
            <div>Logged In: {this.state.user.displayName} </div>
        )
    }
}