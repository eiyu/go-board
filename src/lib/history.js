import {__,map, compose,sort, lensProp, lensIndex, curry, subtract, flatten, splitEvery, dropRepeats, concat, pipe, uniq, add} from 'ramda'
import {initialUpdate} from './initialUpdate'
import {updateEmptySpaceInfluence} from './updateEmptySpaceInfluence'
import {capturingOpponent} from './capturingOpponent'
import {headUpdateSubordinates} from './headUpdateSubordinates'
import {updateSubordinate} from './updateSubordinate'
import {updateOpponent} from './updateOpponent'
import {updateChainMembers} from './updateChainMembers'
import {subordinatesUpdateHead} from './subordinatesUpdateHead'
import {lenses} from './lenses'
import {set, mapped, over} from 'ramda-lens'
import {neighbor,surround, initialLiberty, opps, subs, edge, emptySpace} from './neighbor'


export const onUpdate = (coor, turns, state) => {

    const [_first,_second] = coor
    // neighbors
    const neighbors = neighbor(surround, coor, state)
    const subordinates = subs(turns, neighbors)
    const opponents = opps(turns, neighbors)
    const edges = edge(neighbors)
    const emptySpaces = emptySpace(neighbors)
    // const opponents = neighbors.filter(x => x ? (x.color !== turns && x.value !== '+'): false)
    // const partners = neighbors.filter(x => x ? (x.color === turns && x.value !== '+'): false)
    // const emptySpace = neighbors.filter(x => x !== undefined && x.value === '+')
    // const edge = neighbors.filter(x => x === undefined)
    // const initialLiberty = subtract(state[_first][_second].liberty, (opponents.length + partners.length + edge.length))
    // const allPartnerChain = partners.map(x => {return flatten(x.chain)})
    // console.log(initialLiberty);
  // decalre lenses
    const row = lensIndex(_first)
    const col = lensIndex(_second)
    const chain = lensProp('chain')
    const enemiesChain = lensProp('enemiesChain')
    const eyeOwner = lensProp('eyeOwner')
    const head = lensProp('head')
    const chainLiberty = lensProp('chainLiberty')
    const opponent = lensProp('opponent')
    const value = lensProp('value')
    const color = lensProp('color')
    const tail = lensProp('tail')
    const capturing = lensProp('capturing')
    const ko = lensProp('ko')
    const liberty = lensProp('liberty')
    const _influence = turn => lensProp(`${turn}Influence`)
    const influence = _influence(turns)
    const kos = compose(mapped, mapped, ko)
    const capturings = compose(mapped, mapped, capturing)

  // partially composed lenses (lens to coor only)
    const lensCreate = curry((row,col,value) => compose(row,col,value))
    const lensTo = lensCreate(row,col)
    const lensToValue = lensTo(value)
    const lensToInfluence = turn => lensTo(_influence(turn))
    const lensToChain = lensTo(chain)
    const lensToChainLiberty = lensTo(chainLiberty)
    const lensToOpponent = lensTo(opponent)
    const lensToColor = lensTo(color)
    const lensToHead = lensTo(head)
    const lensToCapturing = lensTo(lensProp('capturing'))
    const lensToSuicide = lensTo(lensProp('suicide'))
    const lensToKo = lensTo(ko)
    const lensToTail = lensTo(tail)
    const lensToLiberty = lensTo(liberty)

    // current update init
    // const initialUpdate = compose(
    //   set(lensToChain, [coor]),
    //   set(lensToLiberty, initialLiberty),
    //   set(lensToHead, coor),
    //   set(lensToColor, turns),
    //   set(lensToValue, stoneValue(turns)),
    //   set(kos, false),
    //   set(capturings, false),
    // )//(state)


  // update influence
    // const updateEmptySpaceInfluence = curry((emptySpace, currentState) => {
    //   if(emptySpace.length === 0) {
    //     return currentState
    //   }
    //   const [first, ...rest] = emptySpace
    //   const updatedState = set(lensCreate(lensIndex(first.coor[0]),lensIndex(first.coor[1]),influence),coor)(currentState)
    //
    //   return updateEmptySpaceInfluence(rest, updatedState)
    // })
    // const influenceUpdated = updateEmptySpaceInfluence(emptySpace, initialUpdate)
    // -----------


    // const updateInfluence = xy => (st) => {
    //   const empSpc = neighbor(xy).map(x => {
    //     return state[x[0]] ? state[x[0]][x[1]] : undefined
    //   }).filter(x => x !== undefined && x.value === '+')
    //   return updateEmptySpaceInfluence(empSpc, st)
    // }
    // //
    // const updatePartner = curry((partnerStone, currentState) => {
    //   if(partnerStone.length === 0) {
    //     return currentState
    //   }
    //   const [first, ...rest] = partnerStone
    //   const updatedState = compose(
    //     updateInfluence(first.coor),
    //     set(lensCreate(lensIndex(first.coor[0]),lensIndex(first.coor[1]),liberty),subtract(first.liberty,1)),
    //     set(lensCreate(lensIndex(first.coor[0]),lensIndex(first.coor[1]),chain),[]),
    //     set(lensCreate(lensIndex(first.coor[0]),lensIndex(first.coor[1]),tail),1),
    //     set(lensCreate(lensIndex(first.coor[0]),lensIndex(first.coor[1]),head),coor),
    //   )(currentState)
    //
    //   return updatePartner(rest, updatedState)
    // })
    // // const partnerUpdated = updatePartner(partners, influenceUpdated)
    //
    //
    //
    // // -----------
    // const updateEnemy = curry((enemyStone, currentState) => {
    //   if(enemyStone.length === 0) {
    //     return currentState
    //   }
    //   const [first, ...rest] = enemyStone
    //   const updatedState = set(lensCreate(lensIndex(first.coor[0]),lensIndex(first.coor[1]),liberty),subtract(first.liberty,1))(currentState)
    //
    //   return updateEnemy(rest, updatedState)
    // })
    //
    // // const enemyUpdated = updateEnemy(opponents, partnerUpdated)
    // // ----------- subordinatesUpdateHead
    // const partnerHeadChainUpdateCurrent = curry((partnerStone, currentState) => {
    //   if(partnerStone.length === 0) {
    //     return currentState
    //   }
    //   const [first, ...rest] = partnerStone
    //
    //   const currentChain = currentState[coor[0]][coor[1]].chain
    //   const partnerChain = state[first.head[0]][first.head[1]].chain
    //   const updatedState = set(lensToChain, concat(currentChain,partnerChain))(currentState)
    //
    //   return partnerHeadChainUpdateCurrent(rest, updatedState)
    // })
    // // const currentUpdated = partnerHeadChainUpdateCurrent(partners, enemyUpdated)
    //
    // // helper function
    // const _updatePartnerChainMember = (partnerStone, currentState) => {
    //   if(partnerStone.length === 0) {
    //     return currentState
    //   }
    //   const [first, ...rest] = partnerStone
    //   console.log('first', first);
    //   const updatedState = compose(
    //     updateInfluence(first.coor),
    //     set(lensCreate(lensIndex(first.coor[0]),lensIndex(first.coor[1]),chain),[]),
    //     set(lensCreate(lensIndex(first.coor[0]),lensIndex(first.coor[1]),tail),1),
    //     set(lensCreate(lensIndex(first.coor[0]),lensIndex(first.coor[1]),head),coor)
    //   )(currentState)
    //   console.log('updated', updatedState(currentState));
    //   return updatePartner(rest, updatedState)
    // }
    // // headUpdateSubordinates
    // const currentUpdatePartnerHeadChainMember = curry((partnerStone, currentState) => {
    //   if(partnerStone.length === 0) {
    //     return currentState
    //   }
    //   const [first, ...rest] = partnerStone
    //   const partnerChain = state[first.head[0]][first.head[1]].chain.map(x => [{coor: x}])
    //   const updateChainMember = (chainMember, nextState) => {
    //     if(chainMember.length === 0) {
    //       return nextState
    //     }
    //     const [f, ...r] = chainMember
    //     console.log('f', f);
    //     const updatedChainMember = (
    //       (st) => _updatePartnerChainMember(f, st)
    //     )(nextState)
    //     return updateChainMember(r, updatedChainMember)
    //   }
    //   const chainMemberNextState = updateChainMember(partnerChain, currentState)
    //   return currentUpdatePartnerHeadChainMember(rest, chainMemberNextState)
    // })
    //
    // // const partnerHeadChainMemberUpdated = currentUpdatePartnerHeadChainMember(partners, currentUpdated)
    // // const curr = uniq(partnerHeadChainMemberUpdated[_first][_second].chain)
    //
    // // const filterChainMemeber = set(lensToChain, curr)(partnerHeadChainMemberUpdated)
    //
    //
    const updateSelfChainLiberties = (oppChain, st) => {
      if(oppChain.length === 0) {
        return st
      }
      const [f,...r] = oppChain
      // find opp neighbor of f
      const neigh = surround(f.coor)
      const toBeAddedLib = neigh.map(x => {return st[x[0]] ? st[x[0]][x[1]] : undefined})
      .filter(y => y !== undefined && y.color === turns)
      .map(x => x.coor)
      const addLib = (tba, nextState) => {
        if(tba.length === 0) {
          return nextState
        }
        const [first, ...rest] = tba
        const currLib = nextState[first[0]][first[1]].liberty
        const result = set(lensCreate(lensIndex(first[0]),lensIndex(first[1]),liberty), add(currLib,1))(nextState)
        return addLib(rest, result)
      }
      const libAdded = addLib(toBeAddedLib, st)
      return updateSelfChainLiberties(r, libAdded)
    }
    //
    const updateEnemiesChainMember = (isKo, oppChain, nextState) => {
      if(oppChain.length === 0) {
        return nextState
      }
      const [f, ...r] = oppChain
      const updated = compose(
        set(lensToCapturing, true),
        (state => isKo ? set(lensCreate(lensIndex(f[0].coor[0]),lensIndex(f[0].coor[1]),ko), true)(state) : state),
        set(lensCreate(lensIndex(f[0].coor[0]),lensIndex(f[0].coor[1]),head), null),
        set(lensCreate(lensIndex(f[0].coor[0]),lensIndex(f[0].coor[1]),liberty), 4),
        set(lensCreate(lensIndex(f[0].coor[0]),lensIndex(f[0].coor[1]),color), 'brown'),
        set(lensCreate(lensIndex(f[0].coor[0]),lensIndex(f[0].coor[1]),value), '+'),
        // update self chain liberties from opponentschain
        (state => updateSelfChainLiberties(f,state))
      )(nextState)

      return updateEnemiesChainMember(isKo, r,updated)
    }
// capturingOpponent
    const opponentsNextState = curry((opponents, currentState) => {
      // always get data from opponents head
      if(opponents.length === 0) {
        return currentState
      }
      const [first, ...rest] = opponents
      const headChain = currentState[first.head[0]][first.head[1]].chain
      const headChainCoor = headChain.map(x => [{coor:x}])
      const isKo = headChainCoor.length === 1
      const chainIsDead = (headChain.filter(x => {
        return currentState[x[0]][x[1]].liberty > 0
      }).length === 0)
      const headChainNextState = (
        (st) => chainIsDead ? updateEnemiesChainMember(isKo, headChainCoor,currentState) : currentState
      )(currentState)
      return opponentsNextState(rest, headChainNextState)
    })
    // const checkEnemiesState = opponentsNextState(opponents, filterChainMemeber)


    // --------------------- Need to inspect more !!! -----------
    const updatePartnersChainMember = (oppChain, nextState) => {
      if(oppChain.length === 0) {
        return nextState
      }
      const [f, ...r] = oppChain
      const updated = compose(
        set(lensToCapturing, true),
        // update self chain liberties from opponentschain
        (state => updateSelfChainLiberties(f,state))
      )(nextState)

      return updatePartnersChainMember(r,updated)
    }
    const partnersNextState = curry((coor, partners, currentState) => {
      // always get data from opponents head

      const self = currentState[coor[0]][coor[1]]
      const capturing = self.capturing
      const groupIsDead = (self.chain.filter(x => {
        return currentState[x[0]][x[1]].liberty > 0
      }).length === 0)
      if(self.liberty === 0 && !capturing && groupIsDead) {
        return set(lensToSuicide, true)(currentState)
      }
      if(partners.length === 0) {
        return currentState
      }
      const [first, ...rest] = partners
      const headChain = currentState[first.head[0]][first.head[1]].chain
      const headChainCoor = headChain.map(x => [{coor:x}])
      const chainIsDead = (headChain.filter(x => {
        return currentState[x[0]][x[1]].liberty > 0
      }).length === 0)
      const headChainNextState = (
        (st) => chainIsDead ? updatePartnersChainMember(headChainCoor,currentState) : currentState
      )(currentState)
      return partnersNextState(coor,rest, headChainNextState)
    })
    // const checkPartnersState = partnersNextState(coor, partners, /* which state should i use*/ checkEnemiesState)
    // ---------------------
    const finState = pipe(
      initialUpdate(coor, turns, initialLiberty(opponents,subordinates,edges)),
      updateEmptySpaceInfluence(coor,turns, emptySpaces),
      updateSubordinate(coor, turns, subordinates),
      updateOpponent(coor, turns, opponents),
      subordinatesUpdateHead(coor, subordinates, state),
      updateChainMembers(coor, turns, subordinates, state),
      over(lensToChain, uniq),
      opponentsNextState(opponents),
      partnersNextState(coor, subordinates)
    )(state)

    return finState
}
