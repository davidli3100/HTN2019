import React, { Component, Fragment } from 'react'
import * as Space from 'react-spaces'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Dashboard from '../Views/Dashboard'
import Appointments from '../Views/Appointments'
import Patients from '../Views/Patients'
import firebase from 'firebase';
import Header from '../components/Header/Header'
import { Pane } from 'evergreen-ui'


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
                    <Space.Left size="15%" scrollable={true}>
                        <div className="nav">
                            <Space.Top size="10%">
                                <Pane display="flex" height="100%" alignItems="center" justifyContent="center">
                                    <div className="brand">Pintox</div>
                                </Pane>
                            </Space.Top>
                            <Space.Fill>
                                Nav
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