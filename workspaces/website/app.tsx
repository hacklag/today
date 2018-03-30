import {loadable} from '@shared/utils/loadable'
import {Modals} from '@website/components'
import {observer} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

const Routes = getRoutes()

@hot(module)
@observer
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Routes.Index} />
            <Route exact path="/auth/login" component={Routes.Auth.Login} />
            <Route exact path="/auth/register" component={Routes.Auth.Register} />
            <Route exact path="/auth/logout" component={Routes.Auth.Logout} />
            <Route component={Routes.Missing} />
          </Switch>

          <Modals />
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export {App}

function getRoutes() {
  return {
    Index: loadable(() => import('./pages/index')),
    Missing: loadable(() => import('./pages/missing')),
    Auth: {
      Login: loadable(() => import('./pages/auth/login')),
      Logout: loadable(() => import('./pages/auth/logout')),
      Register: loadable(() => import('./pages/auth/register')),
    },
  }
}
