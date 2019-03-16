// actions constants management must be well defined and reasonable
import {concat} from 'ramda'

const initialState = {
  turns:'black',
  sequences: [],
}
export const gameReducer = (size=19) => (state=initialState, action) => {
  switch (action.type) {
    case `TURN${size}`:
      return state.turns === 'black' ? Object.assign({}, state, {turns: 'white'}) : Object.assign({}, state, {turns: 'black'})
    case `SEQUENCES${size}` :
      return Object.assign({}, state, {sequences: concat(state.sequences,[action.coor])})
    default:
    return state
  }
}
