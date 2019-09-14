import React, { Component } from 'react';
import Chart from 'react-apexcharts'

window.Apex = {
    stroke: {
      width: 3
    },
    markers: {
      size: 0
    },
    tooltip: {
      fixed: {
        enabled: true,
      }
    }
  };

export default class SparklineWithText extends Component {
    constructor(props) {
        super(props)

        this.state = {
            seriesTopSpark1: [{
                data: this.props.sparkLineData ? this.props.sparkLineData : [0]
            }],
            chartOptionsTopSpark2: {
                chart: {
                  sparkline: {
                    enabled: true
                  },
                  animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 500,
                    animateGradually: {
                        enabled: true,
                        delay: 500
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 300
                    }
                },
                width:"300vw"
                },
                stroke: {
                  curve: 'smooth',
                  linecap: 'butt',
                  width: 2.5
                },
                fill: {
                  opacity: 0.3
                },
                xaxis: {
                  crosshairs: {
                    width: 1
                  },
                },
                tooltip: {
                    x: {
                        show: false
                    },
                    y: {
                        title: {
                          formatter: function (seriesName) {
                            return ''
                          }
                        }
                      },
                      marker: {
                        show: false
                      }
                    
                },
                yaxis: {
                  min: 0
                },
                title: {
                  text: this.props.sparkLineData[this.props.sparkLineData.length-1],
                  offsetX: 3,
                  offsetY: 5,
                  style: {
                    fontSize: '22px',
                    cssClass: 'apexcharts-yaxis-title',
                    fontWeight: 500,
                    fontFamily: "SF UI Display, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol"
                  }
                },
                subtitle: {
                  text: 'Open Appointments',
                  offsetX: 3,
                  offsetY: 33  ,
                  style: {
                    fontSize: '14px',
                    cssClass: 'apexcharts-yaxis-title',
                    fontFamily: 'inherit'
                  }
                }
              }
        }
    }

    render() {
        return (
            <Chart options={this.state.chartOptionsTopSpark2} series={this.state.seriesTopSpark1} type="area" height='100%' width="111.7%" className="overviewcard" />
        )
    }
}