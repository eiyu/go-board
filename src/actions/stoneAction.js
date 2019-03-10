import {nwseNeighbor} from '../lib/neighbor'
import {memoize} from 'lodash'

export const chains = (name, chain) => ({
  type: `CHAIN${name}`,
  chain: chain
})
export const spreadChain = (name, chain) => ({
  type: `SPREAD_CHAIN${name}`,
  chain: chain
})
export const clearPrevChain = name => ({
  type: `CLEAR_CHAIN${name}`
})
export const filterChain = name => ({
  type: `FILTER${name}`
})
export const influence = (name, turn, inf) => ({
  type: `INF${name}`,
  turn,
  influence: inf
})
export const liberty = (name, liberty) => ({
  type: `LIBERTY${name}`,
  payload: liberty,
  name: name
})
export const spreadInfluence = dispatch => (state, neighbor, pos, turn) => {

  // neighbors
  // look up  to neighbor influence owner
  const neighborInfluenceOwner = neighbor[`${turn}Influence`]
  const neighborChainMember = state[neighborInfluenceOwner].chain
  // console.log(neighbor, neighborMember, pos);
  // influence(neighbor.pos, turn, pos)
  // if directly attach to own head
  if(!neighbor.tail) {
    neighbor.chain.forEach( mem => {
      // set each prev neigh chain to current pos
      // console.log('mem',mem, pos);
      dispatch(influence(mem, turn, pos))
      // spread influence
      const surroundHeadChainmember = nwseNeighbor(state, mem)
      surroundHeadChainmember.forEach(direction => {
        // console.log('meep');
        if(direction) {
          dispatch(influence(direction.pos, turn, pos))
        }
      })
    })
  }

// when connecting to tail
  else {
    neighborChainMember.forEach(member => {
      const surroundTailChainmember = nwseNeighbor(state, member)
      surroundTailChainmember.forEach(direction => {
        if(direction) {
          // console.log('direc');
          dispatch(influence(direction.pos, turn, pos))
        }
      })
    })
  }
}
