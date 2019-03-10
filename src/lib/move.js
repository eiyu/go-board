import {lensIndex, pipe, uniq} from 'ramda'
import {initialUpdate} from './initialUpdate'
import {updateEmptySpaceInfluence} from './updateEmptySpaceInfluence'
import {preventSuicide} from './preventSuicide'
import {updateSubordinate} from './updateSubordinate'
import {updateOpponent} from './updateOpponent'
import {updateChainMembers} from './updateChainMembers'
import {subordinatesUpdateHead} from './subordinatesUpdateHead'
import {updateEnemiesChain} from './updateEnemiesChainMember'
import {lensCreate, chain} from './lenses'
import {over} from 'ramda-lens'
import {neighbor,surround, initialLiberty, opps, subs, edge, emptySpace} from './neighbor'


export const onUpdate = (coor, turns, state) => {

    const [col,row] = coor
    // neighbors
    const neighbors = neighbor(surround, coor, state)
    const subordinates = subs(turns, neighbors)
    const opponents = opps(turns, neighbors)
    const edges = edge(neighbors)
    const emptySpaces = emptySpace(neighbors)
    const lensTo = lensCreate(lensIndex(col),lensIndex(row))
    const lensToChain = lensTo(chain)

    return pipe(
      initialUpdate(coor, turns, initialLiberty(opponents,subordinates,edges)),
      updateEmptySpaceInfluence(coor,turns, emptySpaces),
      updateSubordinate(coor, turns, subordinates),
      updateOpponent(coor, turns, opponents),
      subordinatesUpdateHead(coor, subordinates, state),
      updateChainMembers(coor, turns, subordinates, state),
      over(lensToChain, uniq),
      updateEnemiesChain(coor, turns, opponents),
      preventSuicide(coor, subordinates)
    )(state)
}
