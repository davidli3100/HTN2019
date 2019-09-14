import React, { Component } from 'react';
import { SideSheet, Pane, Tablist, Paragraph, Card, Heading, Tab } from 'evergreen-ui';

export default class AppointmentSideSheet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShown: false
        }
    }
    
    render() {
        return (
            <SideSheet
                isShown={this.props.isShown}
                onCloseComplete={() => this.props.setState()}
                containerProps={{
                    display: 'flex',
                    flex: '1',
                    flexDirection: 'column',
                  }}
            >
                    <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
                    <Pane padding={16} borderBottom="muted">
                        <Heading size={600}>{this.props.appointment.name}</Heading>
                        <Paragraph size={400} color="muted">
                            {this.props.appointment.date + ' | ' + this.props.appointment.time}
                        </Paragraph>
                    </Pane>
                    <Pane display="flex" padding={8}>
                        <Tablist>
                        {['Symptoms', 'Patient History', 'Invoicing'].map(
                            (tab, index) => (
                                <Tab
                                key={tab}
                                isSelected={this.state.selectedIndex === index}
                                onSelect={() => this.setState({ selectedIndex: index })}
                                >
                                {tab}
                                </Tab>
                            )
                            )}

                        </Tablist>
                    </Pane>
                    </Pane>
                    <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
                    <Card
                        backgroundColor="white"
                        elevation={0}
                        height={240}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Heading>Some content</Heading>
                    </Card>
                </Pane>
            </SideSheet>
        )
    }
}