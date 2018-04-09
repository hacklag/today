import {Card, List} from '@shared/components'
import {UI} from '@shared/config'
import {Event} from '@website/components'
import {IEvent} from '@website/types/event'
import * as React from 'react'

interface Props {
  items: Array<IEvent>
}

class EventList extends React.Component<Props> {
  render() {
    return (
      <List>
        {this.props.items.map(item => (
          <Card key={item.id} href={`/events/${item.id}`}>
            <Event event={item} />
          </Card>
        ))}

        <style jsx>{`
          .Event__image {
            max-width: 100%;
            height: auto;
          }
          .Event__description {
            margin-top: ${UI.spacing.sm};
          }
        `}</style>
      </List>
    )
  }
}

export {EventList}
