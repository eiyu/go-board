import React, {Component} from 'react';
import PropType from 'prop-types'
import {connect} from 'react-redux';
import {Container} from './styled/Wraper'
import CustomBoard from './CustomBoard'
import {Row, Col} from 'react-styled-flexboxgrid'
import {NavLink} from 'react-router-dom'


const selectedStyle = {
  backgroundColor: "blue",
  color: "white",
  textDecoration: "none",
  marginLeft: "10px",
}
export default class LandingPage extends Component {
  componentWillUnmount() {

  }
  render() {
    return (
      <Container>
        <Row>
        <Col lg={12}><h1> Papan Igo </h1></Col>
        </Row>
        <Row>
          <Col lg={1}><CustomBoard switching={true} st={this.props.st} size={this.props.size} /></Col>
        </Row>
        <Row>
        <Col lg={12}>
         <h3>Aturan Dasar</h3>
         <ul>
           <li>Dua Pemain (hitam dan putih) meletakkan batu di papan saling bergantian pada setiap gilirannya, dimulai dengan hitam terlebih dahulu dan putih mendapat komi 6,5 point diakhir permainan.</li>
           <li>Batu igo diletakkan diatas titik perpotongan antar garis (bukan dikotak-kotaknya seperti catur)</li>
           <li>Batu yang sudah diletakkan tidak boleh digerakkan atau diangkat kembali</li>
         </ul>
        <NavLink activeStyle={selectedStyle} to="/menangkap-batu"><Col lg={12} md={2} sm={3} xs={2}>Menangkap Batu Lawan</Col></NavLink>
        </Col>
        </Row>
      </Container>
    )
  }
}


LandingPage.propType = {
  board: PropType.object
}
