import React, {Component} from 'react'
import PropType from 'prop-types'
import {Grid, Col, Row} from 'react-styled-flexboxgrid'
import {Wraper} from './styled/Wraper'
import CustomStone from './CustomStone'
import {initialize, putStone, removeStone} from '../actions/boardActions'
import {connect} from 'react-redux'
import {ThemeProvider} from 'styled-components'
const theme = {
  flexboxgrid: {
    // Defaults
    gridSize: 2, // columns
    gutterWidth: 0, // rem
    outerMargin: 0, // rem
    mediaQuery: 'only screen',
    container: {
      sm: 46, // rem
      md: 47, // rem
      lg: 70  // rem
    },
    breakpoints: {
      xs: 0,  // em
      sm: 48, // em
      md: 50, // em
      lg: 75  // em
    },
  }
}


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
  onMove(coor,size) {
    this.setState((p,n) => ({
      passCount: p.passCount - p.passCount
    }))
    this.props.onPutStone(coor,size)
  }
  onRemove(coor,size) {
    if(this.props.st.points[coor[0]][coor[1]].value === '+') {
      return void 0
    }
    this.setState((p,n) => ({
      removeCount: p.removeCount + 1
    }))
    this.props.onRemove(coor,size)
  }

  render() {
    return (
      <Wraper size={this.props.size}>
      {this.state.game === 1 ? <div className="turns">{this.props.play ? '' : this.props.st.turns === 'black' ? 'Giliran: hitam' : 'Giliran: putih'}</div> : <div>angkat semua batu yang mati</div>}

      <ThemeProvider theme={theme}>
      <Grid className="board">
        {
          this.props.st.points.map((row,x,act) => {
          return (
            <Row style={{paddingBottom:"-11px"}} key={`rw-${x}`}>
              {row.map((col,y) => {
                return (
                  <Col key={`st-${x}${y}`} lg={true} md={true} sm={true} xs={true}><CustomStone game={this.state.game} last={this.props.st.last} onRemove={this.onRemove} onMove={this.onMove} {...col} size={this.props.size}/></Col>
                )
              })}
            </Row>
            )
          })
        }
        <br/>

        <button onClick={() => this.state.game === 0 ? (this.state.removeCount === 0) ? void 0 : this.endingAct('undo') : (this.props.st.count > 0) ? this.gameAct('undo') : void 0 }>{"<"}</button>
        {this.state.game === 1 ? <button onClick={() => this.state.game === 0 ? void 0 : this.pass()}>Pass</button> : null}
        {this.state.game === 1 ? <button onClick={() => this.state.game === 0 ? void 0 : this.state.undoCount > 0 ? this.gameAct('redo') : void 0 }>{">"}</button>: null}
        {this.state.game === 0 ? <button onClick={() => this.state.game === 0 ? void 0 : 'this.pass()'}>selesai</button> : null}
      </Grid>
      </ThemeProvider>
      </Wraper>
    )
  }
}

CustomBoard.propType = {
  st: PropType.object,
  size: PropType.number,
}
// const mapStateToProps = (state,props) => {
//
// }
const mapDispatchToProps = (dispatch,props) => {
  return {
    onInitialize: (play) => dispatch(initialize(props.size,play)),
    onPutStone: (coor, size) => putStone(dispatch,props.st.points, props.st.turns)(coor, size),
    onRemove: (coor, size) => removeStone(dispatch,props.st.points)(coor, size),
    onundo: () => dispatch({type: `UNDO${props.size}`}),
    onredo: () => dispatch({type: `REDO${props.size}`}),
  }
}

export default connect(null, mapDispatchToProps)(CustomBoard)
