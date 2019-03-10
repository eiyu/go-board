// update influence
import {set} from 'ramda-lens'
import {lensIndex, curry, compose} from 'ramda'
import {lensCreate, influence} from './lenses'

export const updateEmptySpaceInfluence = curry((coor,turns, emptySpace, currentState) => {
    if(emptySpace.length === 0 || emptySpace === undefined) {
      return currentState
    }
    const [first, ...rest] = emptySpace
    const lensTo = lensCreate(lensIndex(first.coor[0]), lensIndex(first.coor[1]))
    const updatedState = set(lensTo(influence(turns)),coor)(currentState)

    return updateEmptySpaceInfluence(coor, turns, rest, updatedState)
  })
