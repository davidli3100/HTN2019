import React, { Component, Fragment } from 'react'
import * as Space from 'react-spaces'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Dashboard from '../Views/Dashboard'
import Appointments from '../Views/Appointments'
import Patients from '../Views/Patients'
import firebase from 'firebase';
import Header from '../components/Header/Header'
import { Pane } from 'evergreen-ui'
import SideNav from '../components/SideNav'


export default class LoggedIn extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user
        }
    }

    handleLogOut = () => {
        firebase.auth().signOut()
    }

    render() {
        return (
            <Router>
                <Space.ViewPort>
                    <Space.Left size="16%" scrollable={true}>
                        <div className="nav">
                            <Space.Fill>
                                <SideNav numAppointments={10}/>
                            </Space.Fill>
                        </div>
                    </Space.Left>
                    <Space.Fill>
                        <Space.Top size="10%">
                            <Header user={this.props.user} handleLogout={this.handleLogOut}/>
                        </Space.Top>
                        <Space.Fill scrollable={true}>
                            <Fragment>
                                <Route exact path="/" component={Dashboard}/>
                                <Route path="/dashboard" component={Dashboard}/>
                                <Route path="/appointments" component={Appointments}/>
                                <Route path="/patients" component={Patients}/>
                            </Fragment>                    
                        </Space.Fill>
                    </Space.Fill>
                </Space.ViewPort>
            </Router>
        )
    }
}