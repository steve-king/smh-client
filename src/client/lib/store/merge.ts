import { produce } from 'immer'

export const mergeField = (state: any, field: any) => {
  const keyArray = field.key.split(':')
  const namespace = keyArray[0]
  const id = keyArray[1]
  const fieldName = keyArray[2]

  if (state === null) {
    state = {}
  }

  if (!state[namespace]) {
    state[namespace] = {}
  }

  if (!state[namespace][id]) {
    state[namespace][id] = {}
  }

  return produce(state, (draft: any) => {
    draft[namespace][id][fieldName] = field.value
  })
}

export const mergeFields = (state: any, fields: any) => {
  return produce(state, (draft: any) => {
    fields.forEach((field) => {
      mergeField(draft, field)
    })
  })
}
