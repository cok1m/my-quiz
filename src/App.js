import React from 'react';
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import { connect } from 'react-redux';
import Logout from './containers/Logout/Logout';
import { autoLogin } from './store/actions/auth'


class App extends React.Component {
  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" exact component={QuizList} />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={QuizList} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token
})

const mapDispatchToProps = dispatch => ({
  autoLogin: () => dispatch(autoLogin())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
