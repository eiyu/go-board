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
  componentDidMount() {
    this.props.onInitialize(this.props.play)
  }
  // unmounting
  componentWillUnmount() {
    //
  }

  render() {
    console.log(this.props);
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
                  <Col key={`st-${x}${y}`} lg={true} md={true} sm={true} xs={true}><CustomStone switching={this.props.switching} play={this.props.play} onMove={this.props.onPutStone} turns={this.props.st.turns} {...col} size={this.props.size}/></Col>
                )
              })}
            </Row>
            )
          })
        }
                          {/* refactor this double call with the lib*/}
        <button onClick={() => {this.props.onUndo(); this.props.onUndo()}}>{"<"}</button>
        <button onClick={() => {this.props.onRedo();this.props.onRedo();}}>{">"}</button>
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
    onUndo: () => dispatch({type: `UNDO${props.size}`}),
    onRedo: () => dispatch({type: `REDO${props.size}`}),
  }
}

export default connect(null, mapDispatchToProps)(CustomBoard)
