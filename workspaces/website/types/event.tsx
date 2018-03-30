import {toDate} from '@shared/utils/to-date'
import {types} from 'mobx-state-tree'

export const Event = types
  .model('Event', {
    id: types.identifier(types.number),
    name: types.string,
    about: types.string,
    startDate: types.Date,
    endDate: types.Date,
    inLanguage: types.string,
    image: types.maybe(types.string),
  })
  .preProcessSnapshot(toDate('startDate', 'endDate'))

export type IEvent = typeof Event.Type
