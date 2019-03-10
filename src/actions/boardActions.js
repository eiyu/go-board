import {onUpdate} from '../lib/move'
export const initialize = length => ({
  type: 'INIT',
  length
})

export const putStone = (dispatch, state) => (coor, turns) => {
  // check for illegal moves
  // putting stone in same coordinate
  if(state[coor[0]][coor[1]].value !== '+') {
    alert("can't put stone here")
    return void 0
  }
  const nextState = onUpdate(coor, turns, state)
  const nextMove = nextState[coor[0]][coor[1]]

  if(nextState[coor[0]][coor[1]].liberty === 0 && nextMove.suicide && !nextMove.capturing) {
    alert("can't put stone here suicide")
    return void 0
  }
  // ko rules
  console.log('next',nextMove);
  if(state[coor[0]][coor[1]].ko && nextMove.ko) {
    alert("ko!")
    return void 0
  }

  dispatch({
    type: 'MOVE',
    nextState: nextMove.capturing ? nextState : nextState
  })
  dispatch({
    type: 'TURN'
  })
}
