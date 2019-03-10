import {range} from 'lodash'
import {onUpdate} from '../lib/move'

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
const prepare = stone => length => {
    const size = range(length)
    return size.map(x => {
      return size.map(y => {
        return Object.assign({}, stone, {coor: [x,y]})
      })
    })
}
const initilizeState = prepare(initialStoneState)

export const boardReducer = (state=[], action) => {
  switch (action.type) {
    case 'INIT':
      return initilizeState(action.length)
    case 'MOVE':
      return action.nextState
    default:
      return state
  }
}
