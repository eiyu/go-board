
// dependencies
import {combineReducers} from 'redux'
import {boardSize} from './boardReducer'
import {undoReducer} from './undoReducer'
export const allReducer = combineReducers({
  board5: undoReducer(boardSize(5),5),
  board6: undoReducer(boardSize(6),6),
  board13: undoReducer(boardSize(13),13),
  undo19: undoReducer(boardSize(19),19),
})
