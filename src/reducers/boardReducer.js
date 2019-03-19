import {range, add} from 'ramda'
const initialStoneState = {
  captureOnce: false,
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
  captures:[],
  enemiesChain: [],
  suicide: false,
}
// fix state!!!
const prepare = stone => (length) => {
    const size = range(0,length)
    return {
      last : [],
      turns: 'black',
      count:0,
      captured: {
        black:0,
        white:0,
      } ,
      points: size.map(x => {
      return size.map(y => {
        return Object.assign({}, stone, {coor: [x,y]})
      })
    })}
}
const initializeState = prepare(initialStoneState)

export const boardSize = (size=19) => function boardReducer(state=initializeState(size), action) {
  switch (action.type) {
    case `MOVE${size}`:
      return Object.assign({},
        state,
        {
          captured: Object.assign({}, state.captured, {
            [action.turns]: add(state.captured[action.turns],action.captured)
          }),
          last: action.lastMove,
          turns: state.turns === 'black' ? 'white' : 'black',
          count: state.count + 1, points: action.nextState
        })
    case `REMOVE${size}` : return Object.assign({},state,{points: action.nextState})
    case `PASS${size}`:
      return Object.assign({}, state, {...state, last: 'pass', turns: state.turns === 'black' ? 'white' : 'black', count: state.count + 1})
    default:
      return state
  }
}
