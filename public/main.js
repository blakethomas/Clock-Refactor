import React from 'react'
import { render } from 'react-dom'

const times = areas =>
  areas.map(({ zone }) => ({
    zone: zone.split('/')[1].replace('_', ' '),
    time: moment()
      .tz(zone)
      .format('hh:mm:ss a')
  }))

const timezones = () => {
  return fetch('http://localhost:3000/timezones').then(res => res.json())
}

class Clocks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timeZones: [{ zone: 'America/Los_Angeles' }]
    }
  }

  tick() {
    this.setState({
      time: new Date()
    })
  }

  componentWillMount() {
    timezones().then(locations => {
      this.setState({ timeZones: locations })
    })
  }

  componentDidMount() {
    setInterval(() => this.tick(), 16)
  }

  render() {
    return (
      <div>
        {this.state.timeZones.map(({ zone }, index) => (
          <div key={index} className="time">
            <div key={index} className="value">
              {zone.split('/').join(' ')} {moment.tz(zone).format('hh:mm:ss A')}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

render(<Clocks />, document.querySelector('#app'))
/*
class Clock extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      time: new Date(),
      timeZone: 'LosAngeles'
      }
    }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
  }

  tick() {
    this.setState({
      time: new Date()
    })
  }

  render() {
    return <div><h1>{this.state.time.toLocaleTimeString()}.</h1></div>
  }
}

render(<Clock zone/>, document.querySelector('#app'))
*/
