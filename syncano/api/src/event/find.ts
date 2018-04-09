import Server from '@syncano/core'
import {MODELS} from '../constants'

export default async (ctx) => {
  const {data, response} = new Server(ctx)

  try {
    const events = await data
      .event
      .fields(MODELS.event)
      .find(ctx.args.id)

    response.json(events)
  } catch ({message}) {
    response.json({message}, 400)
  }
}
