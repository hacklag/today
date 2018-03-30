import {Head, List, Page, Wrapper} from '@shared/components'
import {APP_TITLE} from '@shared/config'
import {IStore} from '@website/types'
import {inject, observer} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import * as Router from 'react-router-dom'

interface Props extends Router.RouteComponentProps<{}> {
  store: IStore
}

@hot(module)
@inject('store')
@observer
class Index extends React.Component<Props> {
  private readonly title = APP_TITLE

  render() {
    return (
      <Page>
        <Head>
          <title>{this.title}</title>
        </Head>

        <Wrapper>
          <List horizontal spacing="sm">
            {this.isLoggedIn ? this.renderUserNav() : this.renderGuestNav()}
          </List>
        </Wrapper>
      </Page>
    )
  }

  renderUserNav = () => (
    <React.Fragment>
      <Router.Link to="/auth/logout">Sign out</Router.Link>

      <a onClick={() => this.props.store.modal.open('profile')}>
        My profile
      </a>
    </React.Fragment>
  )

  renderGuestNav = () => (
    <React.Fragment>
      <Router.Link to="/auth/login">Sign in</Router.Link>
      <Router.Link to="/auth/register">Create account</Router.Link>
    </React.Fragment>
  )

  private get isLoggedIn(): boolean {
    return this.props.store.userStore.isLoggedIn
  }
}

export default Index
