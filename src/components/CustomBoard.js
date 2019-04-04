import React, {Component} from 'react'
import PropType from 'prop-types'
import {Grid,Col, Row} from 'react-styled-flexboxgrid'
import {Wraper, Line, LineWrap} from './styled/Wraper'
// import Col from './styled/Col'
import CustomStone from './CustomStone'
import {initialize, putStone, removeStone} from '../actions/boardActions'
import {connect} from 'react-redux'
class CustomBoard extends Component {
  constructor(props) {
      super(props)
      this.state = {
        undoCount: 0,
        passCount: 0,
        game: 1,
        removeCount: 0
      }
      this.gameAct = this.gameAct.bind(this)
      this.endingAct = this.endingAct.bind(this)
      this.pass = this.pass.bind(this)
      this.onMove = this.onMove.bind(this)
      this.onRemove = this.onRemove.bind(this)
      this.count = this.count.bind(this)
    }
    componentDidMount() {
      this.props.onInitialize(this.props.play)
    }
    // unmounting
    componentWillUnmount() {
      //
    }
    gameAct(name) {
      this.props[`on${name}`]()
      this.setState((p,n) => {
        return name === 'undo' ? {
          undoCount: p.undoCount + 1,
        } : {
          undoCount:
          p.undoCount - 1
        }
      })
    }
    endingAct(name) {
      this.props[`on${name}`]()
      this.setState((p,n) => ({
        removeCount: name === 'undo' ? p.removeCount - 1 : p.removeCount + 1
      }))
    }

    pass() {
      if(this.state.passCount === 2) {
        this.setState((p,n) => ({
          undoCount: p.undoCount - p.undoCount,
          game: p.game - 1
        }))
      }
      this.setState((p,n) => ({
        undoCount: p.undoCount - p.undoCount - 1,
        passCount: p.passCount + 1
      }))
      this.props.onPutStone('pass',this.props.size)
    }
    onMove(coor) {
      this.setState((p,n) => ({
        passCount: p.passCount - p.passCount,
        undoCount: p.undoCount - p.undoCount
      }))
      this.props.onPutStone(coor)
    }
    onRemove(coor) {
      if(this.props.st.points[coor[0]][coor[1]].value === '+') {
        return void 0
      }
      this.setState((p,n) => ({
        removeCount: p.removeCount + 1
      }))
      this.props.onRemove(coor)
    }

    count() {
      const black = this.props.st.capture['black'] + this.props.st.teritory['black']
      const white = this.props.st.capture['white'] + this.props.st.teritory['white']
      const win = black > white ? `hitam menang +${black-white}` : `putih menang +${white-black}`
      return win
    }

  render() {
    console.log(this.state);
    return (
      <LineWrap size={this.props.size}>
      <Wraper size={this.props.size}>
        {
          this.props.st.points.map((row,x,act) => {
          return (
              row.map((col,y) => {
                return (
                  <Line coor={[x,y]} boardId={this.props.boardId} size={this.props.size} className="col" key={`st-${x}${y}`}><CustomStone game={this.state.game} last={this.props.st.last} onRemove={this.onRemove} onMove={this.onMove} {...col} size={this.props.size}/></Line>
                )
              })
            )
          })
        }
      </Wraper>
      <br/>

      <button onClick={() => this.state.game === 0 ? (this.state.removeCount === 0) ? void 0 : this.endingAct('undo') : (this.props.st.count > 0) ? this.gameAct('undo') : void 0 }>undo</button>
        {this.state.game === 1 ? <button onClick={() => this.state.game === 0 ? void 0 : this.pass()}>Pass</button> : null}
        {this.state.game === 1 ? <button onClick={() => this.state.game === 0 ? void 0 : this.state.undoCount > 0 ? this.gameAct('redo') : void 0 }>redo</button>: null}
        {this.state.game === 0 ? <button onClick={() => this.props.st.status === 'end' ? void 0 : this.props.onCountScore([0,0], this.props.size)} >selesai</button> : null}

      </LineWrap>
    )
  }
}

CustomBoard.propType = {
  st: PropType.object,
  size: PropType.number,
  boardId: PropType.string,
}
// const mapStateToProps = (state,props) => {
//
// }
const mapDispatchToProps = (dispatch,props) => {
  return {
    onInitialize: (play) => dispatch(initialize(props.size,play)),
    onPutStone: (coor) => putStone(dispatch,props.st.points, props.st.turns, props.size, props.boardId)(coor),
    onRemove: (coor) => removeStone(dispatch,props.st.points, props.size, props.boardId)(coor),
    onundo: () => dispatch({type: `UNDO${props.boardId}`}),
    onredo: () => dispatch({type: `REDO${props.boardId}`}),
  }
}
// {this.state.game === 1 ? <div className="turns">{this.props.play ? '' : this.props.st.turns === 'black' ? 'Giliran: hitam' : 'Giliran: putih'}</div> : <div>angkat semua batu yang mati</div>}

export default connect(null, mapDispatchToProps)(CustomBoard)
