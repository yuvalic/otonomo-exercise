import React, { Component, Fragment } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { addStreamer, toggleStreamer } from '../actions/streamer-actions'
import Input from './Input'
import Button from './Button'
import { createStructuredSelector } from 'reselect'
import { streamersSelector } from '../selectors'
import Checkbox from './Checkbox'
import './StreamersList.scss'

class StreamersList extends Component {
  static defaultProps = {
    streamers: Map(),
  }

  static propTypes = {
    streamers: ImmutablePropTypes.map,
  }

  state = {
    err: '',
  }

  addVin = () => {
    const vin = this.inputVin.value
    if (vin) {
      this.inputVin.value = ''
      this.props.addStreamer(vin)
      if (this.state.err) {
        this.setState({
          err: '',
        })
      }
    } else {
      this.setState({
        err: 'Vin is required',
      })
    }
  }

  onToggleChange = vin => {
    this.props.toggleStreamer(vin)
    this.forceUpdate()
  }

  render() {
    const { err } = this.state
    return (
      <div className="streamers-container">
        <Input
          className="vin-input"
          outerRef={inputVin => (this.inputVin = inputVin)}
          placeholder="Enter Vin"
        />
        <Button className="add-btn" onClick={this.addVin}>
          + Add
        </Button>
        {err && <span className="err-label">{err}</span>}
        <content>
          {this.props.streamers.entrySeq().map(([vin, data]) => {
            const { streamer, color } = data.toJS()
            return (
              <Checkbox
                key={vin}
                onChange={this.onToggleChange.bind(this, vin)}
                style={{ color: color }}
                checked={streamer.isStreaming}>
                {vin}
              </Checkbox>
            )
          })}
        </content>
      </div>
    )
  }
}

export default connect(
  createStructuredSelector({
    streamers: streamersSelector,
  }),
  { addStreamer, toggleStreamer },
)(StreamersList)
