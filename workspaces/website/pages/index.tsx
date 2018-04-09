import {Head, Link, List, Page} from '@shared/components'
import {APP_TITLE, UI} from '@shared/config'
import {EventList, TitleBar} from '@website/components'
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

        <TitleBar>
          <div />
          <Link to="/">Hacklag Today</Link>
          <div />
        </TitleBar>

        <main>
          {this.eventStore.hasAnyEvents ? (
            <this.EventList />
          ) : (
            <this.EmptyView />
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

  EmptyView = () => (
    <h2>There are no upcoming events</h2>
  )

  EventList = () => (
    <List>
      <this.EventSection title="Today" events={this.eventStore.todayEvents} />
      <this.EventSection title="Tomorrow" events={this.eventStore.tomorrowEvents} />
      <this.EventSection title="Next" events={this.eventStore.nextEvents} />
    </List>
  )

  EventSection = ({title, events}) => events.length === 0 ? null : (
    <div>
      <h2 className="u-mb-">{title}</h2>
      <EventList items={events} />
    </div>
  )
}

export default Index
