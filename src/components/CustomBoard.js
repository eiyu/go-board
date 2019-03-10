import React, {Component} from 'react'
import PropType from 'prop-types'
import Grid from './styled/Grid'
import Row from './styled/Row'
import Col from './styled/Col'
import {Wraper} from './styled/Wraper'
import CustomStone from './CustomStone'
import {range} from 'lodash'
import {initialize, putStone} from '../actions/boardActions'
import {connect} from 'react-redux'
import {ThemeProvider} from 'styled-components'
const theme = {
  flexboxgrid: {
    // Defaults
    gridSize: 12, // columns
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

  // initBoard(size) {
  //
  // }
  componentDidMount() {
    // initiallize board state
    this.props.onInitialize()
  }
  render() {
    console.log(360/9);
    return (
      <Wraper size={this.props.size}>
      <ThemeProvider theme={theme}>
      <Grid>
        {
          this.props.board.map((row,x) => {
          return (
            <Row key={`rw-${x}`}>
              {row.map((col,y) => {
                return (
                  <Col key={`st-${x}${y}`} lg={true} md={true} sm={true} xs={true}><CustomStone onMove={this.props.onPutStone} turns={this.props.turns} {...col} /></Col>
                )
              })}
            </Row>
            )
          })
        }
      </Grid>
      </ThemeProvider>
      </Wraper>
    )
  }
}

CustomBoard.propType = {
  size: PropType.number
}

const mapDispatchToProps = (dispatch,props, state) => {
  // console.log('from b', props.board);
  return {
    onInitialize: () => dispatch(initialize(props.size)),
    onPutStone: (coor,turns) => putStone(dispatch,props.board)(coor,turns)
  }
}

export default connect(null, mapDispatchToProps)(CustomBoard)


//row style={{ width:"180px",paddingBottom :"0px", margin:"0px"}}key={`row-${x}`}
// col  style={{backgroundColor: "#d2cb9c",padding :"0px", margin:"0px"}} key={`col-${y}${x}`}
