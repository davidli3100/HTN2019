import React, { Component } from 'react'
import { Heading, Spinner } from 'evergreen-ui'
import CustomCard from '../components/Dashboard/Card'
import firebase from 'firebase'
import * as config from '../config'
import { FirestoreDocument } from '@react-firebase/firestore'
import SparklineWithText from '../components/Dashboard/Chart'

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
            this.setState({totalRevenue: totalRevenue, loading: false}, console.log(this.state))
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
            </div>
        )
    }
}