import {onUpdate} from '../lib/move'
import {onRemove} from '../lib/remove'
// import {scoring} from '../lib/scoring'
import {curry, flatten} from 'ramda'
export const initialize = (length, play) => {
  return {
    type: 'INIT',
    length,
    play
  }
}

export const putStone = curry((dispatch, state, turns, size,id, coor) => {
  if(coor === 'pass') {
    return dispatch({
      type: `PASS${size+id}`,
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
    type: `MOVE${size+id}`,
    nextState: nextState,
    lastMove: coor,
    captured: nextMove.captures.length,
    turns
  })
}
)

export const removeStone = curry((dispatch, state, size, id, coor) => {
  if(state[coor[0]][coor[1]].value === '+') {
    return void 0
  }
  const result = onRemove(coor,state)
  return dispatch({
    type: `REMOVE${size+id}`,
    nextState: result.nextState,
    captured: result.deadChain,
    color: state[coor[0]][coor[1]].color === 'white' ? 'black' : 'white'
  })
})

export const undo = (coor, size, id) => {
  return {
    type: `UNDO${size+id}`,
    coor
  }
}
