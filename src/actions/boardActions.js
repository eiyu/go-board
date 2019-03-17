import {onUpdate} from '../lib/move'
export const initialize = (length, play) => {
  return {
    type: 'INIT',
    length,
    play
  }
}

export const putStone = (dispatch, state) => (coor, turns, size, switching) => {
  if(coor === 'pass') {
    return dispatch({
      type: `PASS${size}`,
    })
  }
  // check for illegal moves
  // putting stone in same coordinate
  if(state[coor[0]][coor[1]].value !== '+') {
    // alert("can't put stone here")
    return void 0
  }
  const nextState = onUpdate(coor, turns, state)
  const nextMove = nextState[coor[0]][coor[1]]

  if(nextState[coor[0]][coor[1]].liberty === 0 && nextMove.suicide && !nextMove.capturing) {
    alert("Langkah Terlarang! \n Bunuh diri")
    return void 0
  }
  // ko rules
  if(state[coor[0]][coor[1]].ko && nextMove.ko) {
    alert("Peraturan Ko! \n Pemain tidak dapat meletakan batu dititik ini. Langkah ini bisa dijalankan setelah membuang langkah di titik lain")
    return void 0
  }

  return dispatch({
    type: `MOVE${size}`,
    nextState: nextMove.capturing ? nextState : nextState,
    lastMove: coor
  })
}


export const undo = (coor, size) => {
  return {
    type: `UNDO${size}`,
    coor
  }
}
