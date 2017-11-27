import React from 'react'
import { render } from 'react-dom'

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
