import {lensIndex, curry, compose} from 'ramda'
import {set} from 'ramda-lens'
import {lensCreate, chain, head, tail} from './lenses'
import {updateInfluence} from './updateSubordinate'

const _updatePartnerChainMember = (coor, turns, partnerStone, currentState) => {
  if(partnerStone === undefined || partnerStone.length === 0) {
    return currentState
  }
  const [first, ...rest] = partnerStone
  const updatedState = compose(
    updateInfluence(first.coor, coor, turns),
    set(lensCreate(lensIndex(first.coor[0]),lensIndex(first.coor[1]),chain),[]),
    set(lensCreate(lensIndex(first.coor[0]),lensIndex(first.coor[1]),tail),1),
    set(lensCreate(lensIndex(first.coor[0]),lensIndex(first.coor[1]),head),coor)
  )(currentState)
  return _updatePartnerChainMember(coor,turns, rest, updatedState)//updateSubordinate(coor, turns, rest, currentState)
}
// headUpdateSubordinates
export const updateChainMembers = curry((coor, turns, partnerStone, prevState, currentState) => {
  if(partnerStone.length === 0) {
    return currentState
  }
  const [first, ...rest] = partnerStone

  const partnerChain = prevState[first.head[0]][first.head[1]].chain.map(x => [{coor: x}])

  const updateChainMember = (co, turns, chainMember, nextState) => {
    if(chainMember === undefined || chainMember.length === 0) {
      return nextState
    }
    const [f, ...r] = chainMember
    const updatedChainMember = (
      (st) => _updatePartnerChainMember(co,turns, f, st)
    )(nextState)
    return updateChainMember(co, turns, r, updatedChainMember)
  }

  const chainMemberNextState = updateChainMember(coor, turns, partnerChain, currentState)
  // return currentState
  return updateChainMembers(coor, turns, rest, prevState, chainMemberNextState)
})
