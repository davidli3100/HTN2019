import React, { Component } from 'react';
import { SideSheet, Pane, Tablist, Paragraph, Card, Heading, Tab } from 'evergreen-ui';

class Patient extends Component {
    render() {
        return (
            <Pane
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
            >
                    Patient
            </Pane>
        )
    }
}

class Symptoms extends Component {
    render() {
        return (
            <Pane
            height="100%"
            paddingY="10px"
            paddingX="10px"
            >
                <Paragraph>
                    {this.props.symptoms}
                </Paragraph>
            </Pane>
        )
    }
}

class Invoicing extends Component {
    render() {
        return (
            <Pane
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
            >
                Invoicing
            </Pane>
        )
    }
}

export default class AppointmentSideSheet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShown: false,
            tabs: ['Symptoms', 'Patient History', 'Invoicing'],
            selectedIndex: 0
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
                        <Heading size={600}>{this.props.appointment.Patient}</Heading>
                        <Paragraph size={400} color="muted">
                            {this.props.appointment.date + ' | ' + this.props.appointment.time}
                        </Paragraph>
                    </Pane>
                    <Pane display="flex" padding={8}>
                        <Tablist>
                        {this.state.tabs.map(
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
                    >
                        {this.state.tabs.map((tab, index) => (
                            <Pane
                                key={tab}
                                id={`panel-${tab}`}
                                role="tabpanel"
                                aria-labelledby={tab}
                                aria-hidden={index !== this.state.selectedIndex}
                                display={index === this.state.selectedIndex ? 'block' : 'none'}
                                height="100%"
                            >
                                {(() => { 
                                    switch(tab) {
                                        case 'Symptoms':
                                            return <Symptoms symptoms={this.props.appointment.Symptoms}/>
                                        case 'Patient History':
                                            return <Patient/>
                                        case 'Invoicing':
                                            return <Invoicing patient={this.props.appointment.patient} phoneNumber={this.props.appointment.phoneNumber}/>
                                        default:
                                            return <Symptoms symptoms={this.props.appointment.Symptoms}/>
                                }})()}
                            </Pane>
                            ))}
                    </Card>
                </Pane>
            </SideSheet>
        )
    }
}