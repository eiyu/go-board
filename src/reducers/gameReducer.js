// actions constants management must be well defined and reasonable
// import {TURN, EVALUATE} from '../actions/playerActions'

const initialState = {
  evaluate: false,
  turns:'black',
  lastMove: '',
  whitePoints: 0,
  blackPoints: 0,
  blackGroups: {},
  silverGroups: {},
  sizes: [6,9,13,19]
}
export const gameReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'TURN':
      return state.turns === 'black' ? Object.assign({}, state, {turns: 'white'}) : Object.assign({}, state, {turns: 'black'})
    case 'EVALUATE':
      return state.evaluate === true ? Object.assign({}, state, {evaluate: false}) : Object.assign({}, state, {evaluate: true})
    case 'LAST_MOVE' :
      return Object.assign({}, state, {...state, lastMove: action.stone})
    default:
      return state
  }
}
