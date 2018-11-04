import React, { Component } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { List, Map } from 'immutable'
import './Events.scss'
import { createStructuredSelector } from 'reselect'
import { eventsSelector, streamersSelector } from '../selectors'
import EventNotification from '../components/EventNotification'
import Checkbox from '../components/Checkbox'

const FILTER_THRESHOLD = 0.15

class Events extends Component {
  static defaultProps = {
    events: List(),
    streamers: Map(),
  }

  static propTypes = {
    events: ImmutablePropTypes.list,
    streamers: ImmutablePropTypes.map,
  }

  state = {
    isFilterActive: false,
  }

  onFilterChange = e => {
    this.setState({
      isFilterActive: e.target.checked,
    })
  }

  render() {
    const { events, streamers } = this.props
    const { isFilterActive } = this.state
    const eventsFilters = isFilterActive
      ? events.filter(event => event.get('fuel') < FILTER_THRESHOLD)
      : events
    return (
      <div className="events-body">
        <header className="events-header">
          <label className="title">Events List</label>
          <Checkbox className="event-filter" onChange={this.onFilterChange}>
            Fuel under 15%
          </Checkbox>
        </header>
        <div className="event-list">
          {eventsFilters.map((event, key) => {
            const eventObj = event.toJS()
            const color = streamers.getIn([eventObj.vin, 'color'])
            return (
              <EventNotification key={key} carEvent={eventObj} color={color} />
            )
          })}
        </div>
      </div>
    )
  }
}

export default connect(
  createStructuredSelector({
    events: eventsSelector,
    streamers: streamersSelector,
  }),
)(Events)
