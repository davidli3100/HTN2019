
import React, { Component } from 'react';
import { Card } from 'evergreen-ui';

export default class CustomCard extends Component {
    render() {
        return (
                <Card 
                className="overviewcard"
                elevation={1}
                backgroundColor="white"
                >
                    {this.props.children}
                </Card>
        )
    }
}