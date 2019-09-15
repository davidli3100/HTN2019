import React, { Component, Fragment } from 'react';
import { SideSheet, Pane, Tablist, Paragraph, Card, Heading, Tab, TextInput, Text, Small, Button, SelectMenu, IconButton  } from 'evergreen-ui';

class Patient extends Component {
    render() {
        return (
            <Pane
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
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

    state = {
        items: [],
        tempItem: '',
        tempPrice: '',
        selectedBilling: "OHIP",
        patientEmail: '',
        totalPrice: 0
    }

    render() {
        return (
            <Pane display="flex" height="100%" flexDirection="column">
              <Pane
                display="flex"
                alignItems="flex-start"
                justifyContent="center"
                height="fit-content"
                backgroundColor="#f9f9fb"
                border="none"
                marginBottom={15}
                flexDirection="row"
                >
                    <Pane display="flex" flexDirection="column" width="30%" marginRight={10}>
                        <Text><Small>Bill To</Small></Text>
                        <SelectMenu
                            hasFilter={false}
                            title="Select Billing Account"
                            options={["OHIP", "Patient", "Insurance"].map(label => ({ label, value: label }))}
                            selected={this.state.selectedBilling}
                            onSelect={item => this.setState({ selectedBilling: item.value })}
                        >
                            <Button>{this.state.selectedBilling || 'OHIP'}</Button>
                        </SelectMenu>
                    </Pane>
                    <Pane display="flex" flexDirection="column" width="70%">
                        <Text><Small>Patient Email</Small></Text>
                        <TextInput width="100%" placeholder="name@gmail.com" required disabled={this.state.selectedBilling === "OHIP" || this.state.selectedBilling === "Insurance"}
                            onChange={e => this.setState({ patientEmail: e.target.value })}
                            value={this.state.patientEmail}                    
                        />
                    </Pane>
                </Pane>                
                <Pane
                display="flex"
                alignItems="flex-start"
                justifyContent="center"
                height="fit-content"
                backgroundColor="#f9f9fb"
                border="none"
                flexDirection="row"
                >
                    <Pane display="flex" flexDirection="column" width="80%" marginRight={10}>
                        <Text><Small>Line Item</Small></Text>
                        <TextInput width="100%" placeholder="General Consultation" required 
                            onChange={e => this.setState({ tempItem: e.target.value })}
                            value={this.state.tempItem}
                        />
                    </Pane>
                    <Pane display="flex" flexDirection="column" width="20%" marginRight={10}>
                        <Text><Small>Price ($)</Small></Text>
                        <TextInput width="100%" placeholder="70" required
                            onChange={e => this.setState({ tempPrice: e.target.value })}
                            value={this.state.tempPrice}                    
                        />
                    </Pane>
                    <Pane display="flex" alignItems="flex-end" alignSelf="flex-end" height="100%">
                        <IconButton 
                        icon="add"
                        appearance="minimal"
                        size={40}
                        onClick={() => {
                            this.setState(state => {
                                const items = state.items.concat({item: state.tempItem, price: state.tempPrice});
                                const totalPrice = state.totalPrice += parseInt(state.tempPrice)
                                return {
                                items,
                                tempItem: '',
                                tempPrice: '',
                                totalPrice
                                };
                            });                    
                        }}>
                            Add
                        </IconButton>
                    </Pane>
                </Pane>
                <Pane marginTop={20}>
                {this.state.items ? this.state.items.map((item, index) => (
                    <Card 
                    marginBottom={10}
                    backgroundColor="white"
                    elevation={1}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    height={50}
                    padding={10}
                    >
                        <Heading size={500}>{item.item}</Heading>
                        <Heading size={400}>${item.price}</Heading>
                    </Card>
                )) : <div></div>}
                </Pane>
                <Pane alignSelf="flex-end" marginTop="auto" flexDirection="row" display="flex" width="100%" height={45} justifyContent="space-between" alignItems="center">
                    <Heading size={400}>Subtotal: ${this.state.totalPrice} </Heading> 
                    <Button intent="success" appearance="default" >Send Invoice</Button>
                </Pane>
            </Pane>
        )
    }
}

export default class AppointmentSideSheet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShown: false,
            tabs: ['Symptoms', 'Invoicing'],
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
                        height="100%"
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