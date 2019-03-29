import React from 'react';
import {Grid, Row, Col} from 'react-styled-flexboxgrid'
import {Foot, Content} from './styled/Content'
import {AppContainer} from './styled/AppContainer'
import {NavLink} from 'react-router-dom'
import SideNavigation from './SideNavigation'
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

const selectedStyle = {
  color: "white",
  textDecoration: "none",
  marginLeft: "10px",
}

class PageTemplate extends React.PureComponent {
  render() {
    return <AppContainer>
            <ThemeProvider theme={theme}>
              <Grid>
                <Row className="header">
                  <Col lg={10} md={9} sm={9} xs={12}>
                  <h2>Go Interaktif</h2>
                  </Col>
                  <NavLink activeStyle={selectedStyle} to="/"><Col lg={1} md={1} sm={3} xs={2}>Home</Col></NavLink>
                  <NavLink style={{color:"white", marginLeft: "15px", textDecoration:"none"}} activeStyle={selectedStyle} to="/aturan-dasar"><Col lg={1} md={2} sm={3} xs={2}>Tutorial</Col></NavLink>
                </Row>
                <Row>
                <Col lg={6} md={6} sm={8} xs={11}>
                  <Content>
                    {this.props.children}
                  </Content>
                </Col>
                <Col lg={6} md={5} sm={4} xs={1} reverse={true}>
                  <SideNavigation />
                </Col>
                </Row>
                <Col lg={12} md={true} sm={true} xs={true}>
                  <hr/>
                    <Foot>
                      <footer>
                      <Col lg={3}>Follow me</Col>
                      <Col lg={3}><a href="https://www.linkedin.com/in/yu-li-151559114/"><img src="./link.png" alt="linkedin"/></a></Col>
                      <Col lg={3}><a href="https://github.com/eiyu"><img src="./git.png" alt="github"/></a></Col>
                      </footer>
                    </Foot>
                </Col>

              </Grid>
            </ThemeProvider>
          </AppContainer>
          }
        }
export default PageTemplate
