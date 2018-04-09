import {FlexLayout} from '@shared/components/flex-layout'
import {UI} from '@shared/config'
import {IEvent} from '@website/types/event'
import * as React from 'react'

interface Props {
  event: IEvent
}

class Event extends React.Component<Props> {
  render() {
    const {event} = this.props

    return (
      <div>
        <img className="Event__image" src={event.image} alt="" />

        <div>
          <h2 className="u-mv--">{event.name}</h2>

          <FlexLayout split>
            <div className="Event__meta-price">Price: {event.offers.displayPrice}</div>
            <div className="Event__meta-capacity">
              Places: {event.remainingAttendeeCapacity} of {event.maximumAttendeeCapacity}
            </div>
          </FlexLayout>
        </div>

        <style jsx>{`
          .Event__image {
            max-width: 100%;
            height: auto;
          }
          .Event__description {
            margin-top: ${UI.spacing.sm};
          }
        `}</style>
      </div>
    )
  }
}

export {Event}
