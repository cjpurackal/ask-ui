import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import BackToTop from 'react-back-top'

import '../node_modules/highlight.js/styles/default.css'

import './App.css'

import { updateThreads, userChanged } from './reducers.js'

import './kube.min.css'

import 'react-simplemde-editor/dist/simplemde.min.css'

import LandingPage from './components/LandingPage/LandingPage'
import ThreadList from './components/ThreadList/ThreadList'
import ThreadDetails from './components/ThreadDetails/ThreadDetails'
import UserDetails from './components/UserDetails/UserDetails'
import PageHeader from './components/PageHeader/PageHeader'
import NewThread from './components/NewThread/NewThread'
import SearchPage from './components/SearchPage/SearchPage'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <BackToTop
            icon="fa fa-arrow-up"
            shape="round"
            background="white"
            color="black"
            position={{ bottom: '10%', right: '50%' }}
            topDistance={1500}
            hover={{ background: 'black', color: 'white' }}
            timing="easeIn"
          />
          <Route path="/" component={PageHeader} />
          <Route exact path="/" component={LandingPage} />
          <div className="App-content">
            <Route exact path="/ask" render={({ history }) => <ThreadList history={history} />} />
            <Route exact path="/newPost/" component={NewThread} />
            <Route path="/newPost/:postTitle" component={NewThread} />
            <Route path="/thread/:threadId" component={ThreadDetails} />
            <Route path="/user/:userId" component={UserDetails} />
            <Route path="/search/:searchTerm" component={SearchPage} />
          </div>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    threads: state.threads
  }
}

const mapDispatchToProps = dispatch => {
  return {
    threadsChanged: threads => {
      dispatch(updateThreads(threads))
    },
    userChanged: user => {
      dispatch(userChanged(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
