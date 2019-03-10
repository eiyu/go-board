// game actions is actions that dispatched by react life cycle
import {map,compose, filter, reduce} from 'lodash/fp'
import {testing, _color} from './testing'
export const EVALUATE = 'EVALUATE'

export const evaluateGame = dispatch => (stone, evaluated) => {

  if(evaluated) {
    // terminate evalute
    return void 0
  } else {
    console.log(stone,evaluated);
    dispatch({
      type: EVALUATE
    })

// when undoing all state must be updated as well
// not only the last move state
    dispatch({
      type: `UNDO${stone.pos}`,
    })
  }
}
