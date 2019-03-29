
// dependencies
import {combineReducers} from 'redux'
import {boardSize} from './boardReducer'
import {undoReducer} from './undoReducer'
// yo, i heard you like higher order reducer so i put higher order reducer inside higher order reducer
// so you can get higher while you high
// bleh not funny
const createBoard = (size, id) => undoReducer(boardSize(size,id), id)
export const allReducer = combineReducers({
  board5: createBoard(5,'id-1'),
  board6: createBoard(6,'id-2'),
  board9: createBoard(9,'id-3'),
  board13: createBoard(13,'id-4'),
  board19: createBoard(19,'id-5'),
})
