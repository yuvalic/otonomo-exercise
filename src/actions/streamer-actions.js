import createCarStreamer from '../api/car-data-streamer'
import { getRandomColor } from '../utils'

export const addStreamer = vin => dispatch => {
  const streamer = createCarStreamer(vin)
  streamer.subscribe(carData => {
    dispatch(addEvent(carData))
  })
  streamer.start()
  dispatch({
    type: 'ADD_STREAMER',
    payload: { vin, streamer, color: getRandomColor() },
  })
}

export const toggleStreamer = vin => dispatch => {
  dispatch({
    type: 'TOGGLE_STREAMER',
    payload: { vin },
  })
}

export const addEvent = carData => dispatch => {
  dispatch({
    type: 'ADD_EVENT',
    payload: { carData },
  })
}
