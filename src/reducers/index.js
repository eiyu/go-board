
// dependencies
import {combineReducers} from 'redux'
import {boardSize} from './boardReducer'
import {undoReducer} from './undoReducer'
// yo, i heard you like higher order reducer so i put higher order reducer inside higher order reducer
// so you can get higher while you high
// bleh not funny
export const allReducer = combineReducers({
  board5: undoReducer(boardSize(5),5),
  board6: undoReducer(boardSize(6),6),
  board13: undoReducer(boardSize(13),13),
  undo19: undoReducer(boardSize(19),19),
})
