
import {ATTACH, GROUP} from '../actions/playerActions'

const initialState = {
  attaches: [],
  points:0
}

export const player = (name) => (state=initialState, action) => {
  switch (action.type) {
    case `${ATTACH}${name}`:
      return Object.assign({}, state, {attaches : [...state.attaches, action.payload]})
    default:
      return state
  }
}
