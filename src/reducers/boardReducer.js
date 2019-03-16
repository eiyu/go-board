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
const prepare = stone => (length, play=false) => {
    const size = range(0,length)
    return play ? {turns: 'black', points: size.map(x => {
      return size.map(y => {
        if((x===2 && y ===1) || (x===1 && y ===2) || (x===3 && y ===2) || (x===2 && y ===3)) {
          return Object.assign({}, stone, {coor: [x,y], color: 'black'})
        }
        else {
          return Object.assign({}, stone, {coor: [x,y]})
        }
      })
    })} : {turns: 'black', points: size.map(x => {
      return size.map(y => {
        return Object.assign({}, stone, {coor: [x,y]})
      })
    })}
}
const initializeState = prepare(initialStoneState)

export const boardSize = (size=19) => function boardReducer(state=initializeState(size), action) {
  switch (action.type) {
    case `MOVE${size}`:
      return Object.assign({}, state, {points: action.nextState})
    case `TURN${size}`:
      return state.turns === 'black' ? Object.assign({}, state, {turns: 'white'}) : Object.assign({}, state, {turns: 'black'})
    default:
      return state
  }
}
