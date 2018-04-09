import {syncano} from '@shared/utils/syncano'
import {Event} from '@website/types/event'
import {flow, types} from 'mobx-state-tree'

const date = {
  today: () => new Date().toDateString(),
  tomorrow: () => {
    const now = new Date()
    now.setDate(now.getDate() + 1) // Add a day

    return now.toDateString()
  },
}

export const EventStore = types
  .model('EventStore', {
    events: types.optional(types.array(Event), []),
    pending: types.optional(types.map(types.string), types.map(types.string).create()),
  })
  .views(self => ({
    get hasAnyEvents() {
      return self.events.length > 0
    },
    get todayEvents() {
      const today = date.today()

      return self.events.filter(
        item => item.startDate.toDateString() === today
      )
    },
    get tomorrowEvents() {
      const tomorrow = date.tomorrow()

      return self.events.filter(
        item => item.startDate.toDateString() === tomorrow
      )
    },
    get nextEvents() {
      const today = date.today()
      const tomorrow = date.tomorrow()

      return self.events.filter(({startDate}) =>
        [today, tomorrow].indexOf(startDate.toDateString()) === -1
      )
    },
    find: (id: string) => {
      const ID = parseInt(id, 10)

      return self.events.find(item => item.id === ID)
    },
  }))
  .actions(self => ({
    fetchEvent: flow(function * (id: string) {
      try {
        self.pending.set('find', '')
        const event = yield syncano('api/event/find', {id})

        if (!self.find(event.id)) {
          self.events.push(event)
        }
      } catch (err) {
        throw new Error(err.response.data.message)
      } finally {
        self.pending.delete('find')
      }
    }),
    fetchEvents: flow(function * () {
      try {
        self.pending.set('list', '')
        self.events = yield syncano('api/event/list')
      } catch (err) {
        throw new Error(err.response.data.message)
      } finally {
        self.pending.delete('list')
      }
    }),
  }))

export type IEventStore = typeof EventStore.Type
