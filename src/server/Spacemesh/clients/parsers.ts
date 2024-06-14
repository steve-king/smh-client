import {
  hexArrayToBase64,
  sortArrayByKey,
  secondsAndNanosToISOString,
} from '@/utils'

/**
 * status
 * @param data
 * @returns
 */
export const status = (data: any) => {
  return {
    ...data.status,
    synced_layer: data.status.synced_layer.number,
    top_layer: data.status.top_layer.number,
    verified_layer: data.status.verified_layer.number,
  }
}

/**
 * version
 * @param data
 * @returns
 */
export const version = (data: any) => {
  return data.version_string.value
}

/**
 * coinbase
 * @param data
 * @returns
 */
export const coinbase = (data: any) => {
  return data.account_id.address
}

/**
 * postStates
 * @param data
 * @returns
 */
export const postStates = (data: any) => {
  return data.states
    .sort(sortArrayByKey('name')) // items sometimes arrive in a different order, causing unnecessary caching
    .map(({ name, state, id }: any) => ({
      name,
      state,
      id: hexArrayToBase64(id),
    }))
}

/**
 * eventsStream
 * @param data
 * @returns
 */
export const eventsStream = (data: any) => {
  const parsedEvent = {
    ...data,
    timestamp: secondsAndNanosToISOString(
      data.timestamp.seconds,
      data.timestamp.nanos
    ),
  }

  switch (data.details) {
    case 'beacon':
      delete parsedEvent.beacon
      parsedEvent.data = {
        ...data.beacon,
        beacon: hexArrayToBase64(data.beacon.beacon),
      }
      break

    case 'poet_wait_proof':
      delete parsedEvent.poet_wait_proof
      const { until, smesher } = data.poet_wait_proof
      parsedEvent.data = {
        ...data.poet_wait_proof,
        until: secondsAndNanosToISOString(until.seconds, until.nanos),
        smesher: hexArrayToBase64(smesher),
      }
      break

    case 'eligibilities':
      delete parsedEvent.eligibilities
      parsedEvent.data = {
        ...data.eligibilities,
        smesher: hexArrayToBase64(data.eligibilities.smesher),
        atx: hexArrayToBase64(data.eligibilities.atx),
        beacon: hexArrayToBase64(data.eligibilities.beacon),
      }
      break

    case 'post_start':
      delete parsedEvent.post_start
      parsedEvent.data = {
        ...data.post_start,
        smesher: hexArrayToBase64(data.post_start.smesher),
        challenge: hexArrayToBase64(data.post_start.challenge),
      }
      break

    case 'post_complete':
      delete parsedEvent.post_complete
      parsedEvent.data = {
        ...data.post_complete,
        smesher: hexArrayToBase64(data.post_complete.smesher),
        challenge: hexArrayToBase64(data.post_complete.challenge),
      }
      break
  }

  return parsedEvent
}

/**
 * peersStream
 * @param data
 * @returns
 */
export const peersStream = (data: any) => {
  const connection = data.connections[0]
  const ip4 = connection.address.includes('ip4')
    ? connection.address.split('/')[2]
    : undefined

  return {
    tags: data.tags,
    id: data.id,
    ...connection,
    ip4,
  }
}
