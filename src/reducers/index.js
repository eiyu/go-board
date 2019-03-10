
// dependencies
import {combineReducers} from 'redux'
// import undoable, {groupByActionTypes} from 'redux-undo'
import {stoneReducer, stones} from './stoneReducer'
import {gameReducer} from './gameReducer'
import {boardReducer} from './boardReducer'
import {player} from './playerReducer'
import {putStone} from '../actions/playerActions'
// const points = Object.keys(stones).reduce((prev,next) => {
//   return Object.assign(prev, {[next]: undoable(stoneReducer(next,stones[next]))})
// },{})

export const allReducer = combineReducers({
  // ...points,
  game: gameReducer,
  // silver: player('silver'),
  // black: player('black'),
  board: boardReducer
})
