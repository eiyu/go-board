
import {set} from 'ramda-lens'
import {lensIndex, curry, subtract} from 'ramda'
import {lensCreate, influence, liberty} from './lenses'

// iterate -> return next state
export const updateOpponent = curry((coor,turns, oppStone, nextState) => {
  // named function
  const recursiveUpdate = (opp,next) => {
      const [first, ...rest] = opp
        if(first === undefined) {
          return next
        }
      const lensTo = lensCreate(lensIndex(first.coor[0]), lensIndex(first.coor[1]))
      const nextSt = set(lensTo(liberty),subtract(first.liberty,1))(next)
      return recursiveUpdate(rest,nextSt)
    }
    return recursiveUpdate(oppStone, nextState)
  })
