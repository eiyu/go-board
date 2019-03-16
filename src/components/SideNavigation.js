import React, {Component} from 'react';
import PropType from 'prop-types'
import {Grid, Row, Col} from 'react-styled-flexboxgrid'
import {ThemeProvider} from 'styled-components'
import {NavLink} from 'react-router-dom'
import {Menu} from './styled/Menu'
const theme = {
  flexboxgrid: {
    // Defaults
    gridSize: 5, // columns
    gutterWidth: 0, // rem
    outerMargin: 0, // rem
    mediaQuery: 'only screen',
    container: {
      sm: 46, // rem
      md: 47, // rem
      lg: 40  // rem
    },
    breakpoints: {
      xs: 0,  // em
      sm: 48, // em
      md: 50, // em
      lg: 75  // em
    },
  }
}
export default class SideNavigation extends Component {
  render() {
    return (
      <Menu>
        <Row className="statistic">
          <Col>
            {"<"}<br/>
          </Col>
        </Row>
        </Menu>
    )
  }
}
