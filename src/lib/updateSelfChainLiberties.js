import {set} from 'ramda-lens'
import {add, lensIndex, curry} from 'ramda'
import {surround} from './neighbor'
import {lensCreate, liberty} from './lenses'

export const updateSelfChainLiberties = curry((turns, oppChain, st) => {
  if(oppChain === undefined || oppChain.length === 0) {
    return st
  }
  const [f,...r] = oppChain
  // find opp neighbor of f
  const neigh = surround(f.coor)
  // fix it
  const boardSize = st.length
  //  still any bug when big chain goes top to bottom chain or left to right
  const toBeAddedLib = neigh.map(x => {return (x[0] >= 0 && x[0] <= boardSize - 1) ? st[x[0]][x[1]] : undefined})
  .filter(y => y !== undefined && y.color === turns)
  .map(x => x.coor)
  const addLib = (tba, nextState) => {
    if(tba.length === 0) {
      return nextState
    }
    const [first, ...rest] = tba
    const currLib = nextState[first[0]][first[1]].liberty
    const result = set(lensCreate(lensIndex(first[0]),lensIndex(first[1]),liberty), add(currLib,1))(nextState)
    return addLib(rest, result)
  }
  const libAdded = addLib(toBeAddedLib, st)
  return updateSelfChainLiberties(turns, r, libAdded)
})
