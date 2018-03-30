import {Head, List, Page} from '@shared/components'
import {APP_TITLE, UI} from '@shared/config'
import {EventList} from '@website/components'
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

  componentDidMount() {
    this.props.store.eventStore.fetchEvents()
  }

  private get eventStore() {
    return this.props.store.eventStore
  }

  render() {
    return (
      <Page>
        <Head>
          <title>{this.title}</title>
        </Head>

        <main>
          {this.eventStore.hasAnyEvents ? (
            <List>
              {this.eventStore.todayEvents.length > 0 && (
                <div>
                  <h2 className="u-mb-">Today</h2>
                  <EventList items={this.eventStore.todayEvents} />
                </div>
              )}
              {this.eventStore.tomorrowEvents.length > 0 && (
                <div>
                  <h2 className="u-mb-">Tommorow</h2>
                  <EventList items={this.eventStore.tomorrowEvents} />
                </div>
              )}
              {this.eventStore.nextEvents.length > 0 && (
                <div>
                  <h2 className="u-mb-">Next</h2>
                  <EventList items={this.eventStore.nextEvents} />
                </div>
              )}
            </List>
          ) : (
            <h2>There are no upcoming events</h2>
          )}
        </main>

        <style jsx>{`
          main {
            padding: ${UI.spacing.sm};
          }
        `}</style>
      </Page>
    )
  }
}

export default Index
