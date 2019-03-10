import {compose, lensIndex} from 'ramda'
import {set} from 'ramda-lens'
import {value,color,head,liberty,chain, kos, capturings, lensCreate} from './lenses'

const stoneValue = turns => turns === 'white' ? '⚆' : '⚈'
// returns function compose
export const initialUpdate = (coor, turns, initialLiberty) => {
  const lensTo = lensCreate(lensIndex(coor[0]), lensIndex(coor[1]))
  return compose(
    set(lensTo(chain), [coor]),
    set(lensTo(liberty), initialLiberty),
    set(lensTo(head), coor),
    set(lensTo(color), turns),
    set(lensTo(value), stoneValue(turns)),
    set(kos, false),
    set(capturings, false),
  )
}
