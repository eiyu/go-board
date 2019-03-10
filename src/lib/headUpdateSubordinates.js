// helper function

import {set} from 'ramda-lens'
import {compose, lensIndex, uniq, curry} from 'ramda'
import {lensCreate, chain, tail, head,} from './lenses'
import {neighbor} from './neighbor'
import {updateSubordinate} from './updateSubordinate'
import {updateEmptySpaceInfluence} from './updateEmptySpaceInfluence'
const updateInfluence = curry((xy,prevState,nextState) => {
      const empSpc = neighbor(xy).map(x => {
        return prevState[x[0]] ? prevState[x[0]][x[1]] : undefined
      }).filter(x => x !== undefined && x.value === '+')
      return updateEmptySpaceInfluence(empSpc, nextState)
    })
const _updatePartnerChainMember = (coor, partnerStone, currentState) => {
  if(partnerStone.length === 0) {
    return currentState
  }
  const [first, ...rest] = partnerStone
  const updatedState = compose(
    updateInfluence(first.coor),
    set(lensCreate(lensIndex(first.coor[0]),lensIndex(first.coor[1]),chain),[]),
    set(lensCreate(lensIndex(first.coor[0]),lensIndex(first.coor[1]),tail),1),
    set(lensCreate(lensIndex(first.coor[0]),lensIndex(first.coor[1]),head),coor)
  )(currentState)

  return updateSubordinate(coor, rest, updatedState)
}

// iterator
export const headUpdateSubordinates = (coor, prevState, partnerStone) => nextState => {
  if(partnerStone.length === 0) {
    return nextState
  }
  const [first, ...rest] = partnerStone
  const partnerChain = prevState[first.head[0]][first.head[1]].chain.map(x => [{coor: x}])
  const updateChainMember = (chainMember, nextState) => {
    if(chainMember.length === 0) {
      return nextState
    }
    const [f, ...r] = chainMember
    // for Each chain member call _updatePartnerChainMember
    const updatedChainMember = (
      (st) => _updatePartnerChainMember(coor, f, st)
    )(nextState)
    return updateChainMember(coor, r, updatedChainMember)
  }
  const chainMemberNextState = updateChainMember(partnerChain, nextState)
  return headUpdateSubordinates(coor, prevState, rest)(chainMemberNextState)
}



// warning
// const partnerHeadChainMemberUpdated = headUpdateSubordinates(coor, prevState, partners, currentUpdated)
// const curr = uniq(partnerHeadChainMemberUpdated[_first][_second].chain)
//
// const filterChainMemeber = set(lensToChain, curr)(partnerHeadChainMemberUpdated)
