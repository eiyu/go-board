import React, {PureComponent} from 'react'
import {NavLink} from 'react-router-dom'
import {AppContainer, Menus} from './styled/AppContainer'
export default class PageTemplate extends PureComponent {

  render() {
    return (
    <AppContainer>
          <NavLink to='/'>
            <Menus font={30}>Halaman Utama</Menus>
          </NavLink>
          <NavLink to='/about'>
            <Menus font={30}>Tentang</Menus>
          </NavLink>
          <NavLink to='/contact'>
            <Menus font={30}>Contact</Menus>
          </NavLink>
      <hr/>
      {this.props.children}
      <audio />
      <footer>this is footer</footer>
    </AppContainer>
    )
  }
}
/*
  this is only static page which means dont need any additional props and states
  contents are:
  1. navigation header
  2. image backgound
  3. footer

  features: responsive design
*/
