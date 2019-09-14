import React, { Component } from 'react'
import { Heading } from 'evergreen-ui'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className="dashboard-container">
                <Heading size={700}>Overview</Heading>
            </div>
        )
    }
}