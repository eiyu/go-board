import {MOVE} from './boardActions'
import {testing, _color} from './testing'
export const PUT = "PUT"
export const TURN = "TURN"
export const ATTACH = "ATTACH"
export const GROUP = "GROUP"
export const CAPTURING = "CAPTURING"
export const REMOVE = "REMOVE"
export const EVALUATE = "EVALUATE"
export const CHECK_GROUPING = 'CHECK_GRUPING'

export const removeStone = name => ({
    type: `${REMOVE}${name}`,
})

export const capturingStones = dispatch => (groupName) => {
  groupName.forEach(stone => {
    dispatch(removeStone(stone.id))
  })
}

export const undo = dispatch => stone => {
  dispatch({
    type: 'TURN'
  })
  dispatch({
    type: `UNDO${stone}`
  })
}

export const lastMove = stone => ({
  type: 'LAST_MOVE',
  stone: stone
})

export const putStone = dispatch => (name, turn, state, stone, allStone, ko) => {
  // check target if therese already stone in target terminate
  // console.log(state);
  if(state[name].value !== '+' ) {
    // console.log('invalid move');
    return void 0
  }

  if(ko) {
    console.log('invalid move ko');
    return void 0
  }
// more invalid move like suicide
  // if()


// clear all ko

// exchange data between stone and neighbor
  return testing(state,dispatch,turn, allStone)(stone)
  // create a condition that will make this only called when there is ko
//     Object.keys(state).forEach(stone => {
//       dispatch({
//         type: `REMOVE_KO${stone}`
//       })
//     })
//
//   // put the stone to the board
//     dispatch({
//       type: `${MOVE}${name}`,
//       turn,
//     })
//
//   // record game
//     dispatch({
//       type: `${ATTACH}${turn}`,
//       payload: name
//     })
//
//   dispatch({
//     type: 'LAST_MOVE',
//     stone: name
//   })
// // switching turn to opponent
//   dispatch({
//     type: TURN,
//   })

}
