import {compose, curry, lensIndex, flatten, add} from 'ramda'
import {lensCreate, point} from './lenses'
import {set} from 'ramda-lens'
import {surround} from './neighbor'

export const scoring = (state) => {
  const unres = flatten(state).filter(x => x.value === '+')

  const stoneDetected = (coor, stone, nextState) => {
    const [first, ...rest] = stone

    if(first === undefined) {
      return nextState
    }

    // const [x,y] = first.coor
    const lensTo = lensCreate(lensIndex(coor[0]), lensIndex(coor[1]))
    const next = set(lensTo(point(first.color)), add(nextState[coor[0]][coor[1]][`${first.color}Point`], 1))(nextState)
    return stoneDetected(coor, rest, next)
  }

  const directions = ([x,y], dir, state) => {

    if(state[x] === undefined) {
      return 'edge'
    }
    if(state[x][y] === undefined) {
      return 'edge'
    }

    if(state[x][y].color !== 'brown') {
      return state[x][y].color
    }
    // it looks like flood and fill algorithm
    // but actually its not !
    const nextCoor = dir === 'r' ? [x, y+1] :
                     dir === 'l' ? [x, y-1] :
                     dir === 'u' ? [x-1, y] :
                     [x+1, y]
    return directions(nextCoor, dir, state)

  }

  const updatePoint = curry((coor ,nextState) => {
    const pointStack = ['r','l','u','b'].map(x => {
      return directions(coor, x, nextState)
    })
    const lensTo = lensCreate(lensIndex(coor[0]), lensIndex(coor[1]))
    const whiteLength = pointStack.filter(x => x==='white').length
    const blackLength = pointStack.filter(x => x==='black').length
    const edgeLength = pointStack.filter(x => x==='edge').length
    return compose(
      set(lensTo(point('white')), edgeLength+whiteLength),
      set(lensTo(point('black')), edgeLength+blackLength)
    )(nextState)
  })

  const updateVisit = curry((node,edge,stone,visit,st) => {
    const update = compose(
      // because stone is array
      updatePoint(node.coor),
      // need to make up with nwse coordinate
      // set(lensTo(visited), true)
    )(st)
    return update
  })

  const setOwner = (node, st) => {
    const neighbors = surround(node.coor)
    const edge = neighbors.map(x => st[x[0]] ? st[x[0]][x[1]] : undefined ).filter(y => y === undefined)
    const stone = neighbors.map(x => st[x[0]] ? st[x[0]][x[1]] : undefined ).filter(y => y!== undefined && y.color !== 'brown')
    const visit = neighbors.map(x => st[x[0]] ? st[x[0]][x[1]] : undefined ).filter(y => y!== undefined && y.visited)

    return updateVisit(node, edge, stone, visit, st)
    // return update
  }

  const result = (unresolved, state) => {
    const [first, ...rest] = unresolved

    if(first === undefined) {
      return state
    }
    const nextState = setOwner(first, state)
    return result(rest, nextState)
  }
  // disable undo after this
  // and end game
  return result(unres, state)
}
