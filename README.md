# go-board
### A simple component based go board
Go board is a boilerplate created with reactjs and Redux as a state management to create a blog or web site, equipped with Goban components.

## Creating a board

Prerequisite
* understand higher order function concept

First of all we'll define our reducer
```javascript
// ./reducer/index.js

import {combineReducers} from 'redux'
import {boardSize} from './boardReducer'
import {undoReducer} from './undoReducer'
// the id must be unique for each reducer!  there will be shared state if the reducer has same id
const createBoard = (size, id) => undoReducer(boardSize(size), id)
export const allReducer = combineReducers({
  board9: createBoard(9,'id-3'),
  board13: createBoard(13,'id-4'),
  board19: createBoard(19,'id-5'),
  board9_6: createBoard(9,'id-6'),
  board9_7: createBoard(9,'id-7'),
})

```

And then create the component
```javascript
// MyPage.js

// CustomBoard need 3 props
// - st type object (contain most of game state)
// - size type number (board size)
// - id type string (board id)

import React, {Component} from 'react';
import {connect} from 'react-redux';
// import CustomBoard from your directory
import CustomBoard from './CustomBoard'

class MyPage extends Component {
  render() {
    return (
      <div style={{float: 'left', display:"flex"}}>
        <CustomBoard st={this.props.board19} size={19} boardId='id-5'/>
        <CustomBoard st={this.props.board13} size={13} boardId='id-4'/>
        <CustomBoard st={this.props.board9} size={9} boardId='id-3'/>
        <CustomBoard st={this.props.board9_6} size={9} boardId='id-6'/>
        <CustomBoard st={this.props.board9_7} size={9} boardId='id-7'/>
      </div>
    )
  }
}

// map state to props
const stateToProps = (state, props) => {
  return {
    // because we use undo reducer we must declare every props with .present
    board19: state.board19.present,
    board13: state.board13.present,
    board9: state.board9.present,
    board9_6: state.board9_6.present,
    board9_7: state.board9_7.present,
  }
}

export default connect(stateToProps, null)(MyPage)

```

## Demo

You can check the demo [here](https://papan-igo.firebaseapp.com).
The demo has scoring feature, but when there is an eye inside seki that eye is counted as point.

## Contributor

-

## Installation
* copy the repository
* cd go-board
* npm install / yarn install
* try different node version if doesn't work

## Having Installation Problem?
* Copy components, actions and reducers to your existing react project
* Happy Hacking.

## Authors

* **Yuli** - *fullstack developer* - [Tuguta Holiday](https://tugutaholiday.com)
## License

This project is licensed under the MIT License.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
