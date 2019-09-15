import React, { Component, Fragment } from 'react';
import {Table, Avatar, Text, SideSheet} from 'evergreen-ui'
import AppointmentSideSheet from './AppointmentSideSheet';

export default class CustomTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            appointments: this.props.appointments,
            sidesheetShown: false,
            sideSheetAppointment: this.props.appointments[0]
        }
    }

    _handleSheetClose = () => {
        this.setState({sidesheetShown: false})
    }

    render() {
        return (
            <Table borderRadius={10}>
                <AppointmentSideSheet appointment={this.state.sideSheetAppointment} setState={this._handleSheetClose} isShown={this.state.sidesheetShown}/>
                <Table.Head height={45} backgroundColor="#1e90ff" borderRadius={4}>
                    {/* <Table.SearchHeaderCell /> */}
                    <Table.TextHeaderCell color="#fff">
                        Patient
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell color="#fff">
                    Date
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell color="#fff">
                    Time
                    </Table.TextHeaderCell>
                </Table.Head>
                <Table.Body>
                    {this.state.appointments.map(appointment => (
                    <Table.Row height={60} key={appointment.Patient + appointment.time} isSelectable onSelect={() => this.setState({sidesheetShown: true, sideSheetAppointment: appointment})}>
                        <Table.Cell display="flex" alignItems="center"><Avatar size={30} name={appointment.Patient}/><Text marginLeft={10} size={300} fontWeight={500}>{appointment.Patient}</Text></Table.Cell>
                        <Table.TextCell>{appointment.date}</Table.TextCell>
                        <Table.TextCell>
                        {appointment.time}
                        </Table.TextCell>
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        )
    }
}