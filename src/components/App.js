import React, {Component} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import Whoops from './Whoops';
import {connect} from 'react-redux';
import PageTemplate from './MainMenu';
import LandingPage from './LandingPage'
import Capturing from './Capturing'
import Ko from './Ko'

class App extends Component {
  render(){
    return (
      <PageTemplate>
        <Switch>
          <Route exact path="/" render={(props) => <LandingPage size={13} turns={this.props.turns13} board={this.props.board13} {...props} />}/>
          <Route exact path="/menangkap-batu" render={(props) => <Capturing size={5} turns={this.props.turns5} board={this.props.board5} {...props} />}/>
          <Route exact path="/peraturan-ko" render={(props) => <Ko size={6} turns={this.props.turns6} board={this.props.board6} {...props} />}/>
          <Route component={Whoops}/>
        </Switch>
      </PageTemplate>
    )
    }
}

const stateToProps = (state, props) => {
  return {
    turns13: state.game13.turns,
    turns5: state.game5.turns,
    turns6: state.game6.turns,
    board19: state.board19,
    board6: state.board6,
    board13: state.board13,
    board5: state.board5,
  }
}
export default withRouter(connect(stateToProps, null)(App))
