import {curry, flatten, subtract} from 'ramda'
// the n(north), w(west), s(south), e (east) is bit off 
export const surround = (coor) => {
  const[row,col] = coor
  const n = [row-1, col]
  const w = [row+1, col]
  const s = [row, col-1]
  const e = [row, col+1]
  return [n,w,s,e]
}
export const nwseNeighbor = (state, coor) => {
  const[row,col] = coor
  const n = [row-1, col]
  const w = [row+1, col]
  const s = [row, col-1]
  const e = [row, col+1]
  return [n,w,s,e]
}


// neighbor
export const neighbor = curry((surround, coor, state) => surround(coor).map(x => {
  return state[x[0]] ? state[x[0]][x[1]] : undefined
}))
export const allNeighbors = neighbor => neighbor.filter(x => x !== undefined)
export const opps = (turns, neigh) => neigh.filter(x => x ? (x.color !== turns && x.value !== '+'): false)
export const subs = (turns, neigh) => neigh.filter(x => x ? (x.color === turns && x.value !== '+'): false)
export const emptySpace = neighbor => neighbor.filter(x => x !== undefined && x.value === '+')
export const edge = neighbor => neighbor.filter(x => x === undefined)

export const initialLiberty = (opponents, subs, edge) => subtract(4, (opponents.length + subs.length + edge.length))
export const allSubordinateChain = subs => subs.map(x => {return flatten(x.chain)})
