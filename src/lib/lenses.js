import {lensProp, curry, compose} from 'ramda'
import {mapped} from 'ramda-lens'

export const chain = lensProp('chain')
export const head = lensProp('head')
export const value = lensProp('value')
export const color = lensProp('color')
export const tail = lensProp('tail')
export const capturing = lensProp('capturing')
export const captures = lensProp('captures')
export const ko = lensProp('ko')
export const liberty = lensProp('liberty')
export const _influence = turn => lensProp(`${turn}Influence`)
export const influence = turns => _influence(turns)
export const suicide = lensProp('suicide')
export const kos = compose(mapped, mapped, ko)
export const capturings = compose(mapped, mapped, capturing)
//
// // partially composed lenses (lens to coor only)
export const lensCreate = curry((r,c,value) => compose(r,c,value))
