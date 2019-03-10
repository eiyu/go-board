// TODO: Refactor all code

import {influence, chains, spreadInfluence, spreadChain, clearPrevChain, filterChain} from './stoneAction'
import {comrades, enemies, countLiberty} from './connection'

// nwse function
// one arg array of objects
export const testing = (state,dispatch, turn, allStone) => ({pos, color, chain, opponent,group, blackInfluence, silverInfluence}) => {

  const neighbors = (state, position) => {
    // bottle neck: limited to 3 digit
    const[p,x,y,z] = position
    // indicating nwse (north west south east)
    const nKey = `p${Number(x)-1}${y}`
    const wKey = `p${Number(x)+1}${y}`
    const sKey = `p${x}${Number(y)-1}`
    const eKey = `p${x}${Number(y)+1}`
    const n = state[nKey]
    const w = state[wKey]
    const s = state[sKey]
    const e = state[eKey]
    return [n,w,s,e]
  }

// detect neighbor
  const edge = neighbors(state,pos).filter((val) => {
    return val === undefined
  })
  const partnerNeighbor = neighbors(state,pos).filter((neighbor) => {
    if(neighbor === undefined) {return false}
    if(neighbor.color === turn) {return true}
  })
  // opponent
  const opponentNeighbor = neighbors(state,pos).filter((neighbor) => {
    if(neighbor === undefined) {return false}
    if(neighbor.color !== turn && neighbor.color !== 'brown') {return true}
  })
  const emptySpace = neighbors(state,pos).filter((neighbor) => {
    if(neighbor === undefined) {return false}
    if(neighbor.color === 'brown') {return true}
  })

  const isReduceLiberty = (stone, coor) => {
    return neighbors(state,coor).map(x =>{if(x){return x.pos}}).filter(n => n === stone.pos).length === 1
  }



  const lib = g => g.chain.map(o => {
    return state[o]
  }).map(x => {
    if(isReduceLiberty(x,pos)) {
      return Object.assign({}, x, {...x, liberty: x.liberty - 1})
    } else {
      return x
    }
  })
  .filter(y => y.liberty > 0)

  const test = (con, ded) => {
      Object.keys(state).forEach(stone => {
        dispatch({
          type: `REMOVE_KO${stone}`
        })
      })

    // put the stone to the board
      dispatch({
        type: `MOVE${pos}`,
        turn,
      })

    // record game
      dispatch({
        type: `ATTACH${turn}`,
        payload: pos
      })

    dispatch({
      type: 'LAST_MOVE',
      stone: pos
    })
    // switching turn to opponent
    dispatch({
      type: 'TURN',
    })


    // set influence to surrond area
      neighbors(state, pos).forEach(neighbor => {
        if(neighbor) {
          dispatch(influence(neighbor.pos, turn, pos))
        }
      })

    // set influence to self - moved to recursive
      // dispatch(influence(pos, turn, pos))
    // send own pos to chain
      dispatch({
        type: `LIBERTY${pos}`,
        payload: edge.length + opponentNeighbor.length + partnerNeighbor.length
      })
      dispatch(chains(pos,pos))

    //---------------------------------------------
        // update self chain and opponent when connecting
        comrades(dispatch,state,turn,pos,partnerNeighbor)

        // when connecting to enemies (capturing enemies stone's)
        enemies(dispatch,state,turn,pos,opponentNeighbor)

        partnerNeighbor.forEach(st => {
          dispatch({
            type: `LIBERTY${st.pos}`,
            payload: 1
          })
        })

      dispatch(filterChain(pos))
  }
  //---------------------------------------------
  // find out if opponent and self neighbor is having more than one head



  // handle capturing ko probability
  // // find opponentChain liberty that nearly dead
  const nearlyDeadOpponent = neig => neig.map(x => {
    return state[x[`${_color(turn)}Influence`]].chain
  })
  .map(z => {
    return z.map(y => {
      if(isReduceLiberty(state[y],pos)) {
        return Object.assign({}, state[y], {...state[y], liberty: state[y].liberty - 1})
      } else {
        return state[y]
      }
    })
  })

  const nearlyDeadPartner = neig => neig.map(x => {
    return state[x[`${turn}Influence`]].chain
  })
  .map(z => {
    return z.map(y => {
      if(isReduceLiberty(state[y],pos)) {
        return Object.assign({}, state[y], {...state[y], liberty: state[y].liberty - 1})
      } else {
        return state[y]
      }
    })
  })

  // create a predicate function to find out if the chain is sicide
  // const partnerNeighborHasLiberties = partNeigh => {
  //   const hasOneLiberty = nearlyDeadOpponent(partNeigh)
  //
  // }

  const hasNoLiberty = s => s.liberty === 0

  // wrong logic ?
  const isSuicide = pos => state[pos].liberty - opponentNeighbor.length - edge.length === 0

  //  -----------
  const isChainSuicide = pos => {
    // find partners that have more than one liberty
    const partnerState = nearlyDeadPartner(partnerNeighbor)
    const dead = partnerState.reduce((prev,next) => {
      const tr = next.filter(y => y.liberty > 0)
      console.log(tr);
      if(tr.length > 0) {
        prev.push(next)
      }
      return prev
    }, []).length === 0
    // console.log('ps',dead);
    return state[pos].liberty - partnerNeighbor.length - edge.length - opponentNeighbor.length === 0 && dead
  }

  const isEating = (oppNeigh) => {
    const hasOneLiberty = nearlyDeadOpponent(oppNeigh)
    // if part of neighbor chain dead
    // console.log('ressss', hasOneLiberty);
    return hasOneLiberty.reduce((prev,next) => {
      const tr = next.filter(y => y.liberty < 1)
      // console.log(tr);
      if(tr.length > 0) {
        prev.push(next)
      }
      return prev
    }, [])

  }
  const isEatingCh = (oppNeigh) => {

    return oppNeigh.reduce(x => {
      const hasOneLiberty = nearlyDeadOpponent(oppNeigh)
      // if part of neighbor chain dead
      const zeroLib = hasOneLiberty.reduce((prev,next) => {
        const tr = next.filter(y => y.liberty === 0)
        // console.log(tr);
        if(tr.length > 0) {
          prev.push(tr)
        }
        return prev
      }, [])

      // console.log('ressss', zeroLib, hasOneLiberty);
      const deadLength = zeroL => zeroLib[0] ? zeroLib[0].length : 0
      const test = deadLength(zeroLib) === hasOneLiberty[0].length
      // console.log('foook',test);
      return test
    })

  }
  // const isChainSuicide = partNeigh =>
  // handle suicide attempt (put stone in enemies eye) and kill at last eye
  if(isSuicide(pos)) {
    console.log('why is eating true? ',isEating(opponentNeighbor));
    return (isEatingCh(opponentNeighbor)) ? test() : void 0
  }
  console.log('cs', isChainSuicide(pos));
  if(isChainSuicide(pos)) {
    console.log('partner neighbor dont have liberties', isEatingCh(opponentNeighbor));
    return (isEatingCh(opponentNeighbor)) ? test() : void 0
  }

  else {
    console.log('elsy when condition up ');
    return test()
  }

}



export const _color = name => name === "black" ? "silver" : "black"
