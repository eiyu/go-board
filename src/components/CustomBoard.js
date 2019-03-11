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
    gridSize: 1, // columns
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
    this.props.onInitialize(this.props.play)
  }
  render() {
    return (
      <Wraper size={this.props.size}>
      <div className="turns">{this.props.play ? '' : this.props.turns === 'black' ? 'Giliran: hitam' : 'Giliran: putih'}</div>
      <ThemeProvider theme={theme}>
      <Grid>
        {
          this.props.board.map((row,x,act) => {
          return (
            <Row key={`rw-${x}`}>
              {row.map((col,y) => {
                return (
                  <Col key={`st-${x}${y}`} lg={true} md={true} sm={true} xs={true}><CustomStone switching={this.props.switching} play={this.props.play} onMove={this.props.onPutStone} turns={this.props.turns} {...col} size={this.props.size}/></Col>
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
    onInitialize: (play) => dispatch(initialize(props.size,play)),
    onPutStone: (coor,turns, size, switching) => putStone(dispatch,props.board)(coor,turns, size, switching),
  }
}

export default connect(null, mapDispatchToProps)(CustomBoard)
