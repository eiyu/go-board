import React, {PureComponent} from 'react'
import PageTemplate from './PageTemplate'


export default class About extends PureComponent {

  render() {
    return (
    <PageTemplate>
      about
    </PageTemplate>
  )}
}

/*
  this is only static page which means dont need any additional props and states
  contents are:
  1. about the song and the artist
*/
