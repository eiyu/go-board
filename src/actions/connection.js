import {influence,filterChain, chain, spreadInfluence, spreadChain, clearPrevChain} from './stoneAction'
import {chainLiberty} from '../lib/neighbor'
// tail call optimization
const _color = name => name === "black" ? "silver" : "black"
export const comrades = (dispatch,state,turn,pos,arr =[]) => {
  // create cache here

const [first, ...rest] = arr

// EXTENDING ------------------------------------------------------------------
  // first stone / no neighbor around
  if(first === undefined) {
    // terminate recursive function
    return dispatch(influence(pos, turn, pos))
  }

    // if head extends
    if(!first.tail) {
      dispatch(spreadChain(pos, state[first[`${turn}Influence`]].chain))
      dispatch(clearPrevChain(state[first[`${turn}Influence`]].pos))
      spreadInfluence(dispatch)(state,state[first[`${turn}Influence`]],pos,turn)
      dispatch(filterChain(pos))
    }

    // if tail extends
    if(first.tail) {
    // if(first[`${turn}Influence`] === state[pos][`${turn}Influence`]) {
      dispatch(spreadChain(pos, first.chain))
      dispatch(influence(pos, turn, pos))
      dispatch(clearPrevChain(first.pos))
    // }

      // set first chain member to current chain (aquired member)
      dispatch(spreadChain(pos, state[first[`${turn}Influence`]].chain))
      // remove first chain member that already aquired
      dispatch(clearPrevChain(state[first[`${turn}Influence`]].pos))
      // set direct first influence to pos
      dispatch(influence(first.pos, turn, pos))
      // iterate the aquired member and spread the influence
      spreadInfluence(dispatch)(state,first,pos,turn)
      //  ------------------------------------------------------

    }

      // set influence to self
      dispatch(influence(pos, turn, pos))
      // filter redundant member
      dispatch(filterChain(pos))
      // set influence to rest member
      dispatch(spreadChain(pos, first.chain))
      // spread influence to first
      spreadInfluence(dispatch)(state,first,pos,turn)
      // remove prev chain data from first
      dispatch(clearPrevChain(first.pos))

  return comrades(dispatch,state,turn,pos,rest)
}


// look for opponent state, turnInfluence state when capturing stones

export const enemies = (dispatch, state, turn, pos, arr = []) => {
  const [first, ...rest] = arr
  // terminate rest operration

if(first === undefined) {
return dispatch(filterChain(pos))
}

      dispatch({
        type: `OPPONENT${pos}`,
        opponent: first.pos
      })
      dispatch({
        type:`OPPONENT${first.pos}`,
        opponent: pos
      })
      dispatch({
        type: `LIBERTY${first.pos}`,
        payload: 1
      })

  if (first.liberty === 1) {
    countLiberty(dispatch, state, first, pos, turn)
  }


  return enemies(dispatch, state, turn, pos, rest)
}

export const countLiberty = (dispatch, state, opponent, pos, turn) => {
  const neighbors = (position) => {
    // bottle neck: limited to 3 digit
    const[p,x,y,z] = position
    // indicating nwse (north west south east)
    const nKey = `p${Number(x)-1}${y}`
    const wKey = `p${Number(x)+1}${y}`
    const sKey = `p${x}${Number(y)-1}`
    const eKey = `p${x}${Number(y)+1}`
    return [nKey,wKey,sKey,eKey]
  }

  // get opponent head
    const opponentInfluence = opponent[`${_color(turn)}Influence`]
  // get opponent chain
    const opponentChain = state[opponentInfluence].chain
    // console.log(opponentChain, opponentInfluence);

  // iterate trough chain find outer side
  // what if there is 2 or more stone that has liberty 1 with same end
  // because we are one step behind current state, go to the future
  const isReduceLiberty = (stone, coor) => {
    return neighbors(coor).filter(n => n === stone.pos).length === 1
  }
  const restLiberty = opponentChain.filter(s => {
    return state[s].liberty > 0
  })
  // going to the future
  const opponentLiberty = opponentChain.map(o => {
    return state[o]
  }).map(x => {
    if(isReduceLiberty(x,pos)) {
      return Object.assign({}, x, {...x, liberty: x.liberty - 1})
    } else {
      return x
    }
  })
  .filter(y => y.liberty > 0)
  // .map(g => {
  //   return
  // })

  // console.log('ha? ', opponentLiberty, restLiberty);
// when capturing opponent stones that have no comrades around
// what if there is 2 or more stone that has liberty 1 with same end
  // predicate function

  // WRONG !!!!
  const lastLiberty = (coor, results) => {
    let r = []
    const surroundStone = neighbors(pos)
    surroundStone.forEach(neighbor => {
      results.forEach(opponent => {
        if (neighbor === opponent) {
          r.push(opponent)
        }
      })
    })
    return r.length === 0 && results.length === 0 ? true : false
  }

  if(opponent.length > 0) {
    console.log('what ?');
  }
  // if liberty 0 WARNING: SOMEHOW THIS CODE IS UNRELIABLE
  if(opponentLiberty.length === 0) {
          dispatch({
            type: `REMOVE_INF${pos}`,
            color: _color(turn)
          })
          // console.log('remoed');
      // remove opponent group
      opponentChain.forEach((s,i,act) => {
        if(state[s]) {
      // console.log(state[s]);
        state[s].opponent.forEach(sr => {
          // console.log(sr);
          if(sr) {
              dispatch({
                type: `REMOVE_INF${sr}`,
                color: _color(turn)
              })
          }
          dispatch({
            type: `LIFE${sr}`,
            payload: 1
          })
          // remove self opponent chain
          dispatch({
            type: `REMOVE_OPPONENT${sr}`,
            name: s
          })

          // remove opponent's opponent chain
          dispatch({
            type: `REMOVE_OPPONENT${s}`,
            name: sr
          })

          // remove curent stone opponent data
          dispatch({
            type: `REMOVE_OPPONENT${pos}`,
            name: s
          })
        })
      }

      dispatch({
        type: `REMOVE${s}`
      })
    })

    // ko rule
    if(opponentChain.length === 1) {
      // console.log(opponentChain);
      dispatch({
        type: `KO${opponentChain[0]}`
      })
    }

      // add liberty to pos
      // BEWARE !!!!!! because we will iterate trough opponent.chain and sent life
      dispatch({
        type: `LIFE${pos}`,
        payload: 1
      })

      // iterate trough opponent chain
      // opponent.chain.forEach(st => {
      //   // iterate trough self opponent chain
      //     state[st].opponent.forEach(s => {
      //
      //     dispatch({
      //       type: `LIFE${s}`,
      //       payload: 1
      //     })
      //     // remove self opponent chain
      //     dispatch({
      //       type: `REMOVE_OPPONENT${s}`,
      //       name: st
      //     })
      //
      //     // remove opponent's opponent chain
      //     dispatch({
      //       type: `REMOVE_OPPONENT${st}`,
      //       name: s
      //     })
      //
      //     // remove curent stone opponent data
      //     dispatch({
      //       type: `REMOVE_OPPONENT${pos}`,
      //       name: st
      //     })
      //   })
      // })


  }

}
