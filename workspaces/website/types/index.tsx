import {FormStore} from '@shared/types/form'
import {UserStore} from '@shared/types/user'
import {EventStore} from '@website/types/event-store'
import {types} from 'mobx-state-tree'
import {Modal} from './modal'

const Store = types
  .model('Store', {
    modal: types.optional(Modal, {}),
    userStore: types.optional(UserStore, {}),
    formStore: types.optional(FormStore, {}),
    eventStore: types.optional(EventStore, {}),
  })

export {Store}
export type IStore = typeof Store.Type
export {IEventStore} from '@website/types/event-store'
export {IUser, IUserStore} from '@shared/types/user'
export {IForm, IFormStore} from '@shared/types/form'
export {IModal} from './modal'
