// import {set} from 'ramda-lens'
// import {concat} from 'ramda'
// import {lensToChain} from './lenses'

// const partnerHeadChainUpdateCurrent = (coor, prevState, partnerStone, nextState) => {
//   if(partnerStone.length === 0) {
//     return nextState
//   }
//   const [first, ...rest] = partnerStone
//
//   const currentChain = nextState[coor[0]][coor[1]].chain
//   const partnerChain = prevState[first.head[0]][first.head[1]].chain
//   const updatedState = set(lensToChain, concat(currentChain,partnerChain))(nextState)
//
//   return partnerHeadChainUpdateCurrent(coor, prevState, rest, updatedState)
// }


import {set} from 'ramda-lens'
import {lensIndex, curry, concat} from 'ramda'
import {lensCreate, chain} from './lenses'

// iterate -> return next state
export const subordinatesUpdateHead = curry((coor, partnerStone, prevState, currentState) => {
  if(partnerStone.length === 0) {
    return currentState
  }
  const [first, ...rest] = partnerStone
  const lensToChain = lensCreate(lensIndex(coor[0]), lensIndex(coor[1]), chain)
  const currentChain = currentState[coor[0]][coor[1]].chain
  const partnerChain = prevState[first.head[0]][first.head[1]].chain
  const updatedState = set(lensToChain, concat(currentChain,partnerChain))(currentState)

  return subordinatesUpdateHead(coor, rest, prevState, updatedState)
})
