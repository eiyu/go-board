import React, {PureComponent} from 'react'
import PageTemplate from './PageTemplate'
import {connect} from 'react-redux'

export default class MainPage extends PureComponent {

  render() {
    return (
    <PageTemplate>

    </PageTemplate>
  )}
}


const stateToProps = (state, props) => ({
  board: state.board
})
/*
  this is only static page which means dont need any additional props and states
  contents are:
  1. audio files at bottom
  2. titles and profile
*/
