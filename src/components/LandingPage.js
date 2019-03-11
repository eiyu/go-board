import React, {Component} from 'react';
import PropType from 'prop-types'
import {connect} from 'react-redux';
import {Container} from './styled/Wraper'
import CustomBoard from './CustomBoard'
import {Grid, Row, Col} from 'react-styled-flexboxgrid'
// import {removeStone, undo} from '../actions/playerActions'
import {ThemeProvider} from 'styled-components'
const theme = {
  flexboxgrid: {
    // Defaults
    gridSize: 2, // columns
    gutterWidth: 3, // rem
    outerMargin: 3, // rem
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

class LandingPage extends Component {
  render() {
    return (
      <Container>
      {/*<Board silver={this.props.silver} black={this.props.black} evaluate={this.props.evaluate} turns={this.props.turns} points={this.props.points}/>*/}
      <ThemeProvider theme={theme}>
        <Grid>
        <Row>
        <h1> Papan Igo </h1>
        </Row>
        <Row>
          <Col><CustomBoard board={this.props.board} turns={this.props.turns} size={this.props.sizes[0]} /></Col>
           <Col>
            <h3>Aturan Dasar</h3>
            <ul>
              <li>Dua Pemain (hitam dan putih) meletakkan batu di papan saling bergantian pada setiap gilirannya, dimulai dengan hitam terlebih dahulu dan putih mendapat komi 6,5 point diakhir permainan.</li>
              <li>Batu igo diletakkan diatas titik perpotongan antar garis (bukan dikotak-kotaknya seperti catur)</li>
              <li>Batu yang sudah diletakkan tidak boleh digerakkan atau diangkat kembali</li>
            </ul>
           </Col>
        </Row>
        </Grid>
        </ThemeProvider>
      </Container>
    )
  }
}


LandingPage.propType = {
  board: PropType.object
}

const stateToProps = (state, props) => {
  const {game} = state
  return {
    sizes : game.sizes,
    turns: game.turns,
    board: state.board,
  }
}

const dispatchToProps = (dispatch, props) => {
  return {
    // onInitialize: () => dispatch(initialize(props.size)),
    // onRemove: id => dispatch(removeStone(id)),
  }
}
export default connect(stateToProps, dispatchToProps)(LandingPage)
