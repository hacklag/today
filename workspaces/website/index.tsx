import {createStore} from '@shared/utils/create-store'
import {loadable} from '@shared/utils/loadable'
import {Store} from '@website/types'
import {Provider} from 'mobx-react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import registerServiceWorker from './register-service-worker'

const App = loadable(() => import('./app').then(res => res.App || res))

ReactDOM.render(
  <Provider store={createStore(Store, 'store')}>
    <App />
  </Provider>,
  document.querySelector('#root')
)
registerServiceWorker()
