import React, {Component} from 'react'
import PropType from 'prop-types'
import {Grid, Col, Row} from 'react-styled-flexboxgrid'
import {Wraper} from './styled/Wraper'
import CustomStone from './CustomStone'
import {initialize, putStone} from '../actions/boardActions'
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

// actually we just need one props which is size
// for the game and board reducer we need another parameter (unique index)
class CustomBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      undoCount: 0,
    }
    this.count = this.count.bind(this)
    this.pass = this.pass.bind(this)
  }
  componentDidMount() {
    this.props.onInitialize(this.props.play)
  }
  // unmounting
  componentWillUnmount() {
    //
  }
  count(name) {
    this.props[`on${name}`]()
    this.setState((p,n) => {
      return name === 'undo' ? {undoCount: p.undoCount + 1} : {undoCount: p.undoCount - 1}
    })
  }

  pass() {
    this.setState((p,n) => ({
      undoCount: p.undoCount - p.undoCount - 1
    }))
    this.props.onPutStone('pass',null,this.props.size,null)
  }

  render() {
    return (
      <Wraper size={this.props.size}>
      <div className="turns">{this.props.play ? '' : this.props.st.turns === 'black' ? 'Giliran: hitam' : 'Giliran: putih'}</div>

      <ThemeProvider theme={theme}>
      <Grid className="board">
        {
          this.props.st.points.map((row,x,act) => {
          return (
            <Row style={{paddingBottom:"-11px"}} key={`rw-${x}`}>
              {row.map((col,y) => {
                return (
                  <Col key={`st-${x}${y}`} lg={true} md={true} sm={true} xs={true}><CustomStone switching={this.props.switching} last={this.props.st.last} onMove={this.props.onPutStone} turns={this.props.st.turns} {...col} size={this.props.size}/></Col>
                )
              })}
            </Row>
            )
          })
        }
        <br/>
                          {/* refactor this double call with the lib*/}
        <button onClick={() => this.props.st.count > 0 ? this.count('undo') : void 0 }>{"<"}</button>
        <button onClick={() => this.pass()}>Pass</button>
        <button onClick={() => this.state.undoCount > 0 ? this.count('redo') : void 0 }>{">"}</button>
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

const mapDispatchToProps = (dispatch,props) => {
  return {
    onInitialize: (play) => dispatch(initialize(props.size,play)),
    onPutStone: (coor,turns, size, switching) => putStone(dispatch,props.st.points)(coor,turns, size, switching),
    onundo: () => dispatch({type: `UNDO${props.size}`}),
    onredo: () => dispatch({type: `REDO${props.size}`}),
  }
}

export default connect(null, mapDispatchToProps)(CustomBoard)
