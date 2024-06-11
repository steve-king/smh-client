export const fetchFields = () =>
  fetch('/api/state')
    .then((res) => res.json())
    .then((json) => json)
    .catch((e) => console.log('Error fetching state: ', e))

export const mergeField = (state, field) => {
  const fieldKeys = field.key.split(':')
  const namespace = fieldKeys[0]
  const id = fieldKeys[1]
  const fieldName = fieldKeys[2]

  if (state[namespace] === undefined) {
    state[namespace] = {}
  }

  if (state[namespace][id] === undefined) {
    state[namespace][id] = {}
  }

  state[namespace][id][fieldName] = field.value
}
