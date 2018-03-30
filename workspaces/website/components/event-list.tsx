import {Card, List} from '@shared/components'
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
          <Card key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.about}</p>
          </Card>
        ))}
      </List>
    )
  }
}

export {EventList}
