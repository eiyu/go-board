
// define 9 x 9 board initial state and in ui variable length = 9
import {MOVE} from '../actions/boardActions'

export const stone = {
  color: 'brown',
  liberty: 4,
  groupLiberty: 4,
  chainLiberty: [],
  chain: [],
  tail: false,
  ko: false,
  eye: false,
  eyeOwner: '',
  silverInfluence: '',
  blackInfluence: '',
  opponent: [],
  value: '+',
}

const board = (length,state) => {
  const col = []
  for (let x = 1; x <= length; x++) {
    const row = []
    for (var y = 1; y <= length; y++) {
      row.concat({[`p${x}${y}`]: Object.assign({},state,{pos: `p${x}${y}`})}) //Object.assign(res,{[`p${x}${y}`]: Object.assign({},state,{pos: `p${x}${y}`})})
    }
    col.concat(row)
  }
  console.log(col);
  return col
}



export const stoneReducer = (name, initial) => (state = initial, action) => {
  switch (action.type) {
    case `MOVE${name}`:
      return Object.assign({},state,{...state, color:action.turn, value:'⚈', pos:name})
    case `REMOVE${name}`:
      return Object.assign({},state,{...stone})
    case `CHAIN${name}` :
      return Object.assign({},state,{...state, chain:[...state.chain, action.chain]})
    case `SPREAD_CHAIN${name}` :
      return Object.assign({},state,{...state, chain:[...state.chain, ...action.chain]})
    case `CLEAR_CHAIN${name}` :
      return Object.assign({},state,{...state, tail:true ,chain:[]})
    case `CHAIN_LIBERTY${name}` :
      return Object.assign({},state,{...state, chainLiberty: state.chain.filter(s => s === action.chain)})
    case `FILTER${name}` :
      return Object.assign({},state,{...state, chain: state.chain.reduce(function(a,b){
          if (a.indexOf(b) < 0 ) a.push(b);
          return a;
        },[])})
    case `INF${name}` :
      return action.turn === 'black' ?
      Object.assign({},state, {...state, blackInfluence:action.influence}) :
      Object.assign({},state, {...state, silverInfluence:action.influence})
    case `REMOVE_INF${name}` :
      return action.color === 'black' ?
      Object.assign({},state, {...state, blackInfluence:''}) :
      Object.assign({},state, {...state, silverInfluence:''})
    case `OPPONENT${name}` :
      return Object.assign({},state,{...state, opponent:[...state.opponent, action.opponent]})
    case `REMOVE_OPPONENT${name}` :
    console.log('remove opponent for', name, 'op: ', action.name);
      return Object.assign({},state,{...state, opponent:state.opponent.filter(x => x !== action.name)})
    case `LIBERTY${name}` :
      return Object.assign({},state,{...state, liberty: state.liberty - action.payload})
    case `LIFE${name}` :
      return Object.assign({},state,{...state, liberty: state.liberty + action.payload})
    case `UNDO${name}` :
      return Object.assign({},state,{...state, value: '+'})
    case `KO${name}` :
      return Object.assign({},state,{...state, ko: true})
    case `REMOVE_KO${name}` :
      return Object.assign({},state,{...state, ko: false})
    default:
      return state
  }
}


const stoneState = board(9, stone)
export const stones = stoneState
