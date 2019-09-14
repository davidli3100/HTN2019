import React, { Component, Fragment } from 'react';
import { Menu, Icon, Heading, Pill} from 'evergreen-ui';
import {NavLink} from 'react-router-dom'
export default class SideNav extends Component {

    constructor() {
        super()
        this.state = {
            selected: ''
        }
    }

    handleActiveTab = () => {
        var selected = this.state.selected;
        var all = document.querySelectorAll('.sidenav__list-item')
        for(var el in all) {
           try {
           all[el].style.backgroundColor="";
           all[el].style.border="";
           all[el].style.paddingLeft="40px"
           } catch(e) {
               console.log(e)
           }
        }
        try {
        document.querySelector(`#${CSS.escape(selected)}-link`).style = "background-color: rgba(242, 243, 249, 0.9); border-left: 5px solid #008ffb; padding-left: 35px"
        } catch(e) {
            console.log(e)
        }
    }

    componentDidMount() {
        if(window.location.pathname === "/") {
            this.setState({
                selected: 'dashboard'
            })
        } else {
            this.setState({
                selected: window.location.pathname.replace('/', '')
            })
        }

        this.handleActiveTab()
    }

    componentDidUpdate() {
        this.handleActiveTab()
    }

    render() {
        return(
        <Fragment>

            <Menu>
            <Heading className="brand" size={600}>
                Pintox
            </Heading>
                <Menu.Group>
                    <Menu.Item icon="home" id="dashboard-link" className="sidenav__list-item" onSelect={() => {
                        this.setState({selected: 'dashboard'})
                        window.location = "/dashboard"
                    }}
                    >
                        <NavLink className="sidenav-link" exact activeClassName="active-link dashboard--active--link" to="/dashboard" >
                        <Heading size={400}>Dashboard</Heading>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item id="appointments-link" icon="box" className="sidenav__list-item"
                     onSelect={() => {
                        this.setState({selected: 'appointments'})
                        window.location="/appointments"
                    }}
                    >
                        <NavLink className="sidenav-link" exact activeClassName="active-link announcements--active--link" to="/announcements">
                        <Heading size={400}>Appointments
                        {/* <Pill display="inline-flex" color="green" margin={10} isSolid>{this.props.numAppointments}</Pill> */}
                        </Heading>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item id="patients-link" icon="people" className="sidenav__list-item"
                     onSelect={() => {
                        this.setState({selected: 'patients'})
                        window.location = "/patients"
                    }}
                    >
                        <NavLink className="sidenav-link" exact activeClassName="active-link patients--active--link" to="/patients">
                        <Heading size={400}>Patients</Heading>
                        </NavLink>
                    </Menu.Item>
                </Menu.Group>
            </Menu>
            </Fragment>
        )
    }
}