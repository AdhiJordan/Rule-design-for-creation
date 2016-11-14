import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import {Provider} from 'react-redux'
import RulePage from 'rule/RulePage'
import TestingPage from 'pages/TestingPage'
import * as actions from 'actions'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/toastr/build/toastr.min.css';

const styles = {
  container: {
    width: 800,
  },
};

export default class App extends React.Component {

  // componentWillMount() {
  //   this.props.store.dispatch(actions.loadEntities())
  // }

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history}>
          <Route path='/' style={styles.container}>
            <IndexRoute component={RulePage} />
            <Route path='test' component={TestingPage} />
          </Route>
        </Router>
      </Provider>
    )
  }
}

App.propTypes = {
  history: React.PropTypes.object.isRequired,
  store: React.PropTypes.object.isRequired
}
