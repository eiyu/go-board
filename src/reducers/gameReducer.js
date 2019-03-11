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
  sizes: [6,9,13,19],
  oppLiberty: 4,
}
export const gameReducer = (size=19) => (state=initialState, action) => {
  switch (action.type) {
    case `TURN${size}`:
      return state.turns === 'black' ? Object.assign({}, state, {turns: 'white'}) : Object.assign({}, state, {turns: 'black'})
      // case `CAPTURING${size}` :
      // return Object.assign({}, state, {...state, oppLiberty: state.oppLiberty === 1 ? 4 : state.oppLiberty - 1})
    default:
      return state
  }
}
