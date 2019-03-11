import React, {Component} from 'react';
import PropType from 'prop-types'
import {connect} from 'react-redux';
import {Container} from './styled/Wraper'
import CustomBoard from './CustomBoard'
import {Grid, Row, Col} from 'react-styled-flexboxgrid'
import {NavLink} from 'react-router-dom'
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
  componentWillUnmount() {

  }
  render() {
    return (
      <Container>
      <ThemeProvider theme={theme}>
        <Grid>
        <Row>
        <Col><h1> Papan Igo </h1></Col>
        </Row>
        <Row>
          <Col><CustomBoard switching={true} board={this.props.board} turns={this.props.turns} size={13} /></Col>
        </Row>
        <Row>
        <Col>
         <h3>Aturan Dasar</h3>
         <ul>
           <li>Dua Pemain (hitam dan putih) meletakkan batu di papan saling bergantian pada setiap gilirannya, dimulai dengan hitam terlebih dahulu dan putih mendapat komi 6,5 point diakhir permainan.</li>
           <li>Batu igo diletakkan diatas titik perpotongan antar garis (bukan dikotak-kotaknya seperti catur)</li>
           <li>Batu yang sudah diletakkan tidak boleh digerakkan atau diangkat kembali</li>
         </ul>
        </Col>

        <Col><NavLink to="/menangkap-batu"><button>Cara Menangkap Batu Lawan</button></NavLink></Col>
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
  return {
    turns: state.game13.turns,
  }
}

const dispatchToProps = (dispatch, props) => {
  return {
    // onInitialize: () => dispatch(initialize(props.size)),
    // onRemove: id => dispatch(removeStone(id)),
  }
}
export default connect(stateToProps, dispatchToProps)(LandingPage)
