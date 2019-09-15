import React, { Component } from 'react'
import { Heading, Spinner, Button, Card } from 'evergreen-ui'
import CustomCard from '../components/Dashboard/Card'
import firebase from 'firebase'
import * as config from '../config'
import { FirestoreDocument } from '@react-firebase/firestore'
import SparklineWithText from '../components/Dashboard/Chart'
import CustomTable from '../components/Dashboard/Table'

if(!firebase.apps.length) {
    firebase.initializeApp({
        ...config.config
    })
}

const db = firebase.firestore()


export default class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: true
        }
    }

    _parseTime( ms ) {
        //convert ms to date
        var d = new Date(ms);
        var ap;
        var minutes;
        d.getMinutes() < 10 ? minutes = '0' + d.getMinutes() : minutes = d.getMinutes()
        if(d.getHours() > 12) {
            return d.getHours()-12 + ':'+ minutes + ' PM'
        } else if (d.getHours() === 12) {
            return d.getHours() + ':' + minutes + ' PM'
        } else {
            return d.getHours() + ':' + minutes + ' AM'
        }
    }

    _parseDate(ms) {
        var d = new Date(ms);
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
        var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        var month = months[d.getMonth()];
        var day = days[d.getDay()];

        return day + ', ' + month + ' ' + d.getDate()
    }
    

    _appointmentParser = (appointment) => {
        var tempAppointment = {
            date: this._parseDate(appointment.startTime.seconds*1000),
            time: this._parseTime(appointment.startTime.seconds*1000) + '-' + this._parseTime(appointment.endTime.seconds*1000),
            Patient: appointment.Patient,
            phoneNumber: appointment.phoneNumber,
            Symptoms: appointment.Symptoms
        }
        return tempAppointment
    }

    componentDidMount() {

        db.collection("statistics").doc('appointments').collection('allAppointments').orderBy("timestamp", "asc")
        .onSnapshot((res) => {
            var numAppointments= [];
            res.forEach((doc) => {
                numAppointments.push(doc.data().totalAppointments)
            })
            this.setState({numAppointmentsAccumulated: numAppointments}, console.log(this.state))
        }, (err) => {
            console.log(err)
        })

        db.collection("statistics").doc('appointments').collection('completedAppointments').orderBy("timestamp", "asc")
        .onSnapshot((res) => {
            var completedAppointments= [];
            res.forEach((doc) => {
                completedAppointments.push(doc.data().totalCompleted)
            })
            this.setState({completedAppointments: completedAppointments}, console.log(this.state))
        }, (err) => {
            console.log(err)
        })
        
        db.collection("statistics").doc('appointments').collection('totalRevenue').orderBy("timestamp", "asc")
        .onSnapshot((res) => {
            var totalRevenue= [];
            res.forEach((doc) => {
                totalRevenue.push(doc.data().totalRevenue)
            })
            this.setState({totalRevenue: totalRevenue}, console.log(this.state))
        }, (err) => {
            console.log(err)
        })

        db.collection("appointments").where("startTime", ">=", firebase.firestore.Timestamp.now()).orderBy("startTime", "asc")
        .onSnapshot((res) => {
            var allAppointments= [];
            res.forEach((doc) => {
                allAppointments.push(this._appointmentParser(doc.data()))
            })
            this.setState({allAppointments: allAppointments, loading: false}, console.log(this.state))
        }, (err) => {
            console.log(err)
        })
    }

    render() {
        return (
            this.state.loading ? <div className="spinner"><Spinner size={45}/><Heading paddingTop={12} size={400} className="loading-text">Loading...</Heading></div>
            :
            <div className="dashboard-container">
                <Heading size={700}>Overview</Heading>
                <div className="dashboard-content">
                    {/* <FirestoreDocument path="statistics/appointments">
                        {data => {
                            const { value } = data;
                            console.log(JSON.stringify(value))
                        }}
                    </FirestoreDocument> */}
                    <CustomCard><SparklineWithText title="Open Appointments" sparkLineData={this.state.numAppointmentsAccumulated} /></CustomCard>
                    <CustomCard><SparklineWithText title="Completed Appointments" sparkLineData={this.state.completedAppointments} /></CustomCard>
                    <CustomCard><SparklineWithText title="Daily Revenue" money={true} sparkLineData={this.state.totalRevenue} /></CustomCard>
                </div>
                <div className="appointments-overview-table">
                    <div className="appointments-header-container">
                        <Heading className="appointments-header" size={600}>Appointments</Heading>
                        <Button appearance="primary" onClick={() => {window.location = "/appointments"}} intent="success">View all</Button>  
                    </div>
                    <Card elevation={1} backgroundColor="white" borderRadius={4} >
                        <CustomTable appointments={this.state.allAppointments}/>
                    </Card>
                </div>
            </div>
        )
    }
}