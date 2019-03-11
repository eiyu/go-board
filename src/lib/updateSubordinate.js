import {subtract, lensIndex, curry, compose} from 'ramda'
import {set} from 'ramda-lens'
import {lensCreate, liberty, chain, head, tail} from './lenses'
import {surround} from './neighbor'
import {updateEmptySpaceInfluence} from './updateEmptySpaceInfluence'


export const updateInfluence = curry((xy, nextCoor, turns, st) => {
  const empSpc = surround(xy).map(x => {
    // fix it
    const boardSize = st.length
    //  still any bug when big chain goes top to bottom chain or left to right
    console.log(boardSize, x);
    return (x[0] < 0 || x[0] > boardSize - 1 || x[1] > boardSize - 1) ? undefined : st[x[0]][x[1]]
  }).filter(x => x !== undefined && x.value === '+')

  return updateEmptySpaceInfluence(nextCoor, turns, empSpc, st)
})

export const updateSubordinate = curry((coor, turns, partnerStone, currentState) => {
  if(partnerStone.length === 0) {
    return currentState
  }
  const [first, ...rest] = partnerStone

  const lensTo = lensCreate(lensIndex(first.coor[0]), lensIndex(first.coor[1]))
  const updatedState = compose(
    // redundant
    updateInfluence(first.coor, coor, turns),
    set(lensTo(liberty),subtract(first.liberty,1)),
    set(lensTo(chain),[]),
    set(lensTo(tail),1),
    set(lensTo(head),coor),
  )(currentState)

  return updateSubordinate(coor, turns, rest, updatedState)
})
