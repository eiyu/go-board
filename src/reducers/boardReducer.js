import {range} from 'lodash'
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
// for capturing tutorial
const prepare = stone => (length, play=false) => {
    const size = range(length)
    return play ? size.map(x => {
      return size.map(y => {
        if((x===2 && y ===1) || (x===1 && y ===2) || (x===3 && y ===2) || (x===2 && y ===3)) {
          return Object.assign({}, stone, {coor: [x,y], color: 'black'})
        }
        else {
          return Object.assign({}, stone, {coor: [x,y]})
        }
      })
    }) : size.map(x => {
      return size.map(y => {
        return Object.assign({}, stone, {coor: [x,y]})
      })
    })
}
const initializeState = prepare(initialStoneState)

export const boardSize = (size=19) => function boardReducer(state=initializeState(size), action) {
  switch (action.type) {
    case `MOVE${size}`:
      return action.nextState
    default:
      return state
  }
}



// higher order reducer
// export const task = (name="") => {
//   return function togglesReducer(state=initialState, action) {
//     switch (action.type) {
//       case `${SHOW_TASK_DETAILS}${name}`:
//         return Object.assign({}, state, {
//           show: state.show === false ? true : false,
//           card: state.show === false ? action.card : {},
//           id: state.show === false ? action.id : void 0,
//           status: state.show === false ? name : void 0
//         })
//
//       default:
//         return state
//     }
//   }
// }
