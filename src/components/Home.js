import React, {Component} from 'react';
import PropType from 'prop-types'
import {connect} from 'react-redux';
import {Container} from './styled/Wraper'
import CustomBoard from './CustomBoard'
import {Row, Col} from 'react-styled-flexboxgrid'
export default class Home extends Component {
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
        <Col lg={12} md={12} sm={12} xs={12}>
         <h3>Tentang papan-igo</h3>
         <p>
          papan-igo adalah sebuah situs demo dari repository <a href="https://github.com/eiyu/go-board" >go-board</a> yang saat ini masih dalam proses pengembangan. Meskipun hanya sebuah situs demo tapi situs ini bisa digunakan untuk belajar igo secara interaktif. Untuk kedepannya materi akan ditambah.
         </p>
         <h3>Igo / Baduk/ Weiqi</h3>
         <p>
           Bagi yang belum tahu tentang Igo/ Baduk/ Weiqi bisa kunjungi <a href="https://id.wikipedia.org/Igo">Igo Wikipedia</a>.
         </p>
        </Col>
        </Row>
      </Container>
    )
  }
}


Home.propType = {
  board: PropType.object
}
