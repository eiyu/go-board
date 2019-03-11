
// dependencies
import {combineReducers} from 'redux'
import {gameReducer} from './gameReducer'
import {boardSize} from './boardReducer'

export const allReducer = combineReducers({
  game5: gameReducer(5),
  game6: gameReducer(6),
  game13: gameReducer(13),
  game19: gameReducer(19),
  board5: boardSize(5, 1),
  board6: boardSize(6),
  board13: boardSize(13),
  board19: boardSize(19),
})


// const allReducers = combineReducers({
//   containers: boardContainerReducer,
//   ...boards,
//   toggles: togglesReducer,
//   backlogTask: task('Back-Log'),
//   todoTask: task('To-Do'),
//   doingTask: task('Doing'),
//   doneTask: task('Done'),
//   weather: weather,
// })
