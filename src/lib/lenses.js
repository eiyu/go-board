import {lensProp, lensIndex, curry, compose} from 'ramda'
import {mapped} from 'ramda-lens'
export const row = (row) => lensIndex(row)
export const col = (col) => lensIndex(col)
export const chain = lensProp('chain')
export const enemiesChain = lensProp('enemiesChain')
export const eyeOwner = lensProp('eyeOwner')
export const head = lensProp('head')
export const chainLiberty = lensProp('chainLiberty')
export const opponent = lensProp('opponent')
export const value = lensProp('value')
export const color = lensProp('color')
export const tail = lensProp('tail')
export const capturing = lensProp('capturing')
export const ko = lensProp('ko')
export const liberty = lensProp('liberty')
export const _influence = turn => lensProp(`${turn}Influence`)
export const influence = turns => _influence(turns)
export const suicide = lensProp('suicide')
export const kos = compose(mapped, mapped, ko)
export const capturings = compose(mapped, mapped, capturing)

// partially composed lenses (lens to coor only)
export const lensCreate = curry((r,c,value) => compose(r,c,value))
export const lensTo = lensCreate(row,col)
export const lensToValue = lensTo(value)
export const lensToInfluence = turn => lensTo(_influence(turn))
export const lensToChain = lensTo(chain)
export const lensToChainLiberty = lensTo(chainLiberty)
export const lensToOpponent = lensTo(opponent)
export const lensToColor = lensTo(color)
export const lensToHead = lensTo(head)
export const lensToCapturing = lensTo(lensProp('capturing'))
export const lensToSuicide = lensTo(lensProp('suicide'))
export const lensToKo = lensTo(ko)
export const lensToTail = lensTo(tail)
export const lensToLiberty = lensTo(liberty)
