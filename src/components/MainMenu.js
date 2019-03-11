import React from 'react';
import {TopNav} from './styled/statics'
import {Grid, Col} from 'react-styled-flexboxgrid'
import {Foot} from './styled/Content'

// import Row from '../styled/Row'
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
      md: 61, // rem
      lg: 76  // rem
    },
    breakpoints: {
      xs: 0,  // em
      sm: 48, // em
      md: 64, // em
      lg: 75  // em
    }
  }
}

class MainMenu extends React.PureComponent {
render() {

  return (
      <TopNav>
        <h2>Double Digit Kyu</h2>
      </TopNav>
)}
}


class PageTemplate extends React.PureComponent {
  render() {
    return <ThemeProvider theme={theme}>
              <Grid>
                <Col lg={true} md={true} sm={true} xs={true}><MainMenu authUser={this.props.authUser}/></Col>
                <Col lg={true} md={true} sm={true} xs={true}>{this.props.children}</Col>
                <Col lg={true} md={true} sm={true} xs={true}>
                  <hr/>

                    <Foot>
                      <footer>
                      <Col>Follow me</Col>
                      <Col><a href="https://www.linkedin.com/in/yu-li-151559114/"><img src="./link.png" alt="linkedin"/></a></Col>
                      <Col><a href="https://github.com/eiyu"><img src="./git.png" alt="github"/></a></Col>
                      </footer>
                    </Foot>
                </Col>
              </Grid>
            </ThemeProvider>
  }

}
export default PageTemplate
