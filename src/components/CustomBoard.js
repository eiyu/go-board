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
  componentDidMount() {
    this.props.onInitialize()
  }
  render() {
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
                  <Col width="1px" key={`st-${x}${y}`} lg={true} md={true} sm={true} xs={true}><CustomStone onMove={this.props.onPutStone} turns={this.props.turns} {...col} /></Col>
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
  return {
    onInitialize: () => dispatch(initialize(props.size)),
    onPutStone: (coor,turns) => putStone(dispatch,props.board)(coor,turns)
  }
}

export default connect(null, mapDispatchToProps)(CustomBoard)
