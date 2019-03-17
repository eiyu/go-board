import {range, lensIndex} from 'ramda'
import {set} from 'ramda-lens'
import {lensCreate} from '../lib/lenses'
const initialStoneState = {
  color: 'brown',
  liberty: 4,
  head: null,
  chain: [],
  tail: 0,
  ko: false,
  whiteInfluence: '',
  blackInfluence: '',
  value: '+',
  capturing: false,
  enemiesChain: [],
  suicide: false,
}
// fix state!!!
const prepare = stone => (length) => {
    const size = range(0,length)
    return {last : [], turns: 'black', count:0, points: size.map(x => {
      return size.map(y => {
        return Object.assign({}, stone, {coor: [x,y]})
      })
    })}
}
const initializeState = prepare(initialStoneState)

export const boardSize = (size=19) => function boardReducer(state=initializeState(size), action) {
  switch (action.type) {
    case `MOVE${size}`:
      return Object.assign({}, state, {last: action.lastMove, turns: state.turns === 'black' ? 'white' : 'black', count: state.count + 1, points: action.nextState})
    case `PASS${size}`:
      return Object.assign({}, state, {...state, last: 'pass', turns: state.turns === 'black' ? 'white' : 'black', count: state.count + 1})
    default:
      return state
  }
}
