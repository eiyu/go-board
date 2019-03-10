
const initialState = {
  group: [],
  merge: (...group) => {
    return Object.keys(group).reduce((prev,next) => {
      return Object.assign({}, prev, ...group[next])
    }, {})
  }
}

export const groupReducer = name => (state=initialState, action) => {
  switch (action.type) {
    case `CREATE_GROUP${name}`:
      return Object.assign({}, ...state, {group: action.group})

    default:
      return state
  }
}
