import {lensIndex, curry, compose, concat} from 'ramda'
import {set} from 'ramda-lens'
import {lensCreate, liberty, head, ko, color, value, capturing, captures} from './lenses'
import {updateSelfChainLiberties} from './updateSelfChainLiberties'

export const updateEnemiesChainMember = (coor, turns, isKo, oppChain, nextState) => {
  if(oppChain.length === 0) {
    return nextState
  }
  const [f, ...r] = oppChain
  const lensTo = lensCreate(lensIndex(f[0].coor[0]),lensIndex(f[0].coor[1]))
  const lensToKo = lensCreate(lensIndex(coor[0]),lensIndex(coor[1]), ko)
  const lensToCapturing = lensCreate(lensIndex(coor[0]), lensIndex(coor[1]), capturing)
  const lensToCaptures = lensCreate(lensIndex(coor[0]), lensIndex(coor[1]), captures)
  const concatNext = concat(nextState[coor[0]][coor[1]].captures)
  const updated = compose(
    set(lensToCaptures, concatNext([f[0].coor])),
    set(lensToCapturing, true),
    (state => isKo ? compose(set(lensTo(ko), true), set(lensToKo, true))(state) : state),
    // set(lensTo(captureOnce), true),
    set(lensTo(head), null),
    set(lensTo(liberty), 4),
    set(lensTo(color), 'brown'),
    set(lensTo(value), '+'),
    // update self chain liberties from opponentschain
    updateSelfChainLiberties(turns, f)
  )(nextState)
  return updateEnemiesChainMember(coor, turns, isKo, r,updated)
}
// capturingOpponent
export const updateEnemiesChain = curry((coor, turns, opponents, currentState) => {
  // always get data from opponents head
  if(opponents.length === 0) {
    return currentState
  }
  const [first, ...rest] = opponents
  const headChain = currentState[first.head[0]][first.head[1]].chain
  const headChainCoor = headChain.map(x => [{coor:x}])
  const isKo = headChain.length === 1
  const chainHasLiberty = headChain.filter(x => {
    return currentState[x[0]][x[1]].liberty > 0
  })
  const headChainNextState = (
    (st) => chainHasLiberty.length === 0 ? updateEnemiesChainMember(coor, turns, isKo, headChainCoor,currentState) : currentState
  )(currentState)
  return updateEnemiesChain(coor, turns, rest, headChainNextState)
})
