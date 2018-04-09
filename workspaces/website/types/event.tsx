import {toDate} from '@shared/utils/to-date'
import {types} from 'mobx-state-tree'

const Offer = types
  .model('Offer', {
    price: types.string,
    priceCurrency: types.string,
  })
  .views(self => ({
    get displayPrice() {
      return `${self.price} ${self.priceCurrency}`
    },
  }))

const Person = types
  .model('Person', {
    givenName: types.string,
    familyName: types.string,
    image: types.string,
  })

export const Event = types
  .model('Event', {
    id: types.identifier(types.number),
    name: types.string,
    attendees: types.optional(types.array(types.reference(Person)), []),
    maximumAttendeeCapacity: types.maybe(types.number),
    about: types.string,
    startDate: types.Date,
    endDate: types.Date,
    inLanguage: types.string,
    image: types.maybe(types.string),
    offers: Offer,
  })
  .views(self => ({
    get shortTitle() {
      const size = 25
      const name = self.name.substr(0, 10).replace(/\s$/, '')

      return self.name.length > size ? `${name}...` : self.name
    },
    get remainingAttendeeCapacity() {
      if (self.maximumAttendeeCapacity === null) {
        return null
      }

      return self.maximumAttendeeCapacity - self.attendees.length
    },
  }))
  .preProcessSnapshot(toDate('startDate', 'endDate'))

export type IEvent = typeof Event.Type
