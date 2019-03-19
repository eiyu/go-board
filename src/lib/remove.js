import {lensIndex, curry} from 'ramda'
import {set} from 'ramda-lens'
import {lensCreate, value} from './lenses'

export const onRemove = (coor, state) => {

    const [row,col] = coor
    const ohead = state[row][col].head
    const oChain = state[ohead[0]][ohead[1]].chain
    const removeStones = curry((oChain, nextState) => {
      const [first, ...rest] = oChain
      if(first === undefined) {
        return nextState
      }
      const lensTo = lensCreate(lensIndex(first[0]),lensIndex(first[1]))
      const tobeNextState = set(lensTo(value), '+')(nextState)
      return removeStones(rest, tobeNextState)
    })
     const res = removeStones(oChain,state)
     return res
}
