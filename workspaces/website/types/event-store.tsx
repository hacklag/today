import {syncano} from '@shared/utils/syncano'
import {Event} from '@website/types/event'
import {flow, types} from 'mobx-state-tree'

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
      const today = new Date().toDateString()

      return self.events.filter(
        item => item.startDate.toDateString() === today
      )
    },
    get tomorrowEvents() {
      const now = new Date()
      now.setDate(now.getDate() + 1) // Add a day
      const tomorrow = now.toDateString()

      return self.events.filter(
        item => item.startDate.toDateString() === tomorrow
      )
    },
    get nextEvents() {
      const today = new Date().toDateString()
      const now = new Date()
      now.setDate(now.getDate() + 1) // Add a day
      const tomorrow = now.toDateString()

      return self.events.filter(item =>
        item.startDate.toDateString() !== today &&
        item.startDate.toDateString() !== tomorrow
      )
    },
  }))
  .actions(self => ({
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
