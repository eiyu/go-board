import React, {Component} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import Whoops from './Whoops';
import {connect} from 'react-redux';
import PageTemplate from './MainMenu';
import Home from './Home'
import LandingPage from './LandingPage'
import Capturing from './Capturing'
import Ko from './Ko'
class App extends Component {
  render(){
    return (
      <PageTemplate>
        <Switch>
          <Route exact path="/" render={(props) => <Home size={19} st={this.props.board19} {...props} />}/>
          <Route exact path="/aturan-dasar" render={(props) => <LandingPage size={13} st={this.props.board13} {...props} />}/>
          <Route exact path="/menangkap-batu" render={(props) => <Capturing size={5} st={this.props.board5} {...props} />}/>
          <Route exact path="/peraturan-ko" render={(props) => <Ko size={6} st={this.props.board6} {...props} />}/>
          <Route component={Whoops}/>
        </Switch>
      </PageTemplate>
    )
    }
}

const stateToProps = (state, props) => {
  return {
    board19: state.undo19.present,
    board6: state.board6.present,
    board13: state.board13.present,
    board5: state.board5.present,
  }
}
export default withRouter(connect(stateToProps, null)(App))
