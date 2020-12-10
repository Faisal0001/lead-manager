import React, { useEffect } from 'react'
import Home from './home'
import store from './redux/configureStore'
import { Provider } from 'react-redux'
import { Provider as AlertProvider, positions, transitions } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Register from './Login/Register'
import Login from './Login/Login'
import Header from './shared/Header'
import PrivateRoute from './shared/PrivateRoute'
import { loadUser } from './redux/authReducer'


const alertOptions = {
  position: positions.TOP_CENTER,
  transition: transitions.SCALE,
  timeout: 5000,
  offset: '7px',

}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])


  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <>
          <Router>
            <Header />
            <Switch>
              <PrivateRoute exact path='/' component={Home} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </Router>
        </>
      </AlertProvider>
    </Provider>
  )
}


export default App
