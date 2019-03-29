import {range, add} from 'ramda'
const initialStoneState = {
  blackPoint: 0,
  whitePoint: 0,
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
  visited: false,
}
// fix state!!!
const prepare = stone => (length) => {
    const size = range(0,length)
    return {
      status: "",
      last : [],
      turns: 'black',
      count:0,
      capture: {
        black: 0,
        white: 0,
      },
      teritory: {
        black:0,
        white:6.5,
      } ,
      points: size.map(x => {
      return size.map(y => {
        return Object.assign({}, stone, {coor: [x,y]})
      })
    })}
}
const initializeState = prepare(initialStoneState)

export const boardSize = (size=19,id) => function boardReducer(state=initializeState(size), action) {
  switch (action.type) {
    case `MOVE${size+id}`:
      return Object.assign({},
        state,
        {
          capture: Object.assign({}, state.capture, {
            [action.turns]: add(state.capture[action.turns],action.captured)
          }),
          last: action.lastMove,
          turns: state.turns === 'black' ? 'white' : 'black',
          count: state.count + 1, points: action.nextState
        })
    case `REMOVE${size+id}` :
      return Object.assign({},
      state,
      {
        points: action.nextState,
        capture: Object.assign({}, state.capture, {
          [action.color]: add(state.capture[action.color],action.captured)
        }),
      })

    case `END${size+id}` :
      return Object.assign({},
      state,
      {
        points: action.nextState,
        status: "end",
        teritory: Object.assign({}, state.score, {
          white: add(state.teritory['white'],action.whiteScore),
          black: add(state.teritory['black'],action.blackScore)
        }),
      })

    case `PASS${size+id}`:
      return Object.assign({}, state, {...state, last: 'pass', turns: state.turns === 'black' ? 'white' : 'black', count: state.count + 1})
    default:
      return state
  }
}
