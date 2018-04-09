import {FlexLayout, Head, Icon, Link, Page} from '@shared/components'
import {APP_TITLE, UI} from '@shared/config'
import {TitleBar} from '@website/components'
import {IStore} from '@website/types'
import {inject, observer} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import * as Router from 'react-router-dom'

interface Props extends Router.RouteComponentProps<{
  id: string
}> {
  store: IStore
}

@hot(module)
@inject('store')
@observer
class Index extends React.Component<Props> {
  private readonly title = APP_TITLE

  private get eventStore() {
    return this.props.store.eventStore
  }

  private get event() {
    return this.eventStore.find(this.props.match.params.id)
  }

  componentDidMount() {
    this.eventStore.fetchEvent(this.props.match.params.id)
  }

  render() {
    return (
      <Page>
        <Head>
          <title>{this.title}</title>
        </Head>

        <TitleBar>
          <div>
            <Link to="/">
              <Icon name="arrow-left" />
            </Link>
          </div>
          <Link to="/">
            {this.event ? this.event.shortTitle : 'Loading'}
          </Link>
          <div />
        </TitleBar>

        {this.event ? <this.Event event={this.event} /> : <this.EmptyView />}
      </Page>
    )
  }

  EmptyView = () => (
    <div />
  )

  Event = ({event}) => (
    <div>
      <img className="Event__image" src={event.image} alt="" />

      <main>
        <FlexLayout split>
          <div className="Event__meta-price">Price: {event.offers.displayPrice}</div>
          <div className="Event__meta-capacity">
            Places: {event.remainingAttendeeCapacity} of {event.maximumAttendeeCapacity}
          </div>
        </FlexLayout>

        <div className="u-mt">{event.about}</div>
      </main>

      <style jsx>{`
        main {
          padding: ${UI.spacing.sm};
        }
      `}</style>
    </div>
  )
}

export default Index
