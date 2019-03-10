
// dependencies
import {combineReducers} from 'redux'
import {gameReducer} from './gameReducer'
import {boardReducer} from './boardReducer'

export const allReducer = combineReducers({
  game: gameReducer,
  board: boardReducer
})
