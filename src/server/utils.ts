import fs from 'fs'
import path from 'path'
import net from 'net'
import cron from 'node-cron'

/**
 * recursively get a list of all files in a directory
 * @param dir The top level directory to search
 * @param ext optional - filter results by file extension e.g. '.proto'
 * @returns string array of file paths
 */
export const recursiveFileList = (dir: string, ext?: string) => {
  let fileList: string[] = []

  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      fileList = fileList.concat(recursiveFileList(filePath, ext))
    } else if (ext === undefined || filePath.endsWith(ext)) {
      fileList.push(filePath)
    }
  }
  return fileList
}

/**
 *
 * @param host
 * @param port
 * @returns connection success/fail
 */
export const pingHost = (host: string, port: number): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const netSocket = new net.Socket({})
    netSocket.setTimeout(10000)

    netSocket.on('connect', () => {
      log('DEBUG', 'PING', `host is online: ${host}:${port}`)
      netSocket.destroy()
      resolve(true)
    })

    netSocket.on('timeout', () => {
      log('DEBUG', 'PING', `host connection timed out: ${host}:${port}`)
      netSocket.destroy()
      reject(false)
    })

    netSocket.on('error', () => {
      log('DEBUG', 'PING', `host connection error: ${host}:${port}`)
      netSocket.destroy()
      reject(false)
    })

    if (validatePort(port)) {
      netSocket.connect({
        host,
        port,
      })
    } else {
      resolve(false)
    }
  })

/**
 * When used before connecting to netsocket, will prevent server from crashing should an invalid value get through
 * @param port
 * @returns
 */
const validatePort = (port: number) => {
  if (port > 0 && port < 65536) {
    return true
  }
  return false
}

/**
 *
 * @param callback
 * @param interval
 * @returns cron task
 */
export const cronTask = (
  callback: () => void,
  interval: number = 1 // 1m default
) => {
  const cronString = `*/${interval} * * * *`
  const task = cron.schedule(
    cronString,
    () => {
      log('DEBUG', 'CRON', 'executing task')
      callback()
    },
    {
      scheduled: false,
    }
  )

  log('INFO', 'CRON', `task scheduled to run every ${interval} minutes`)
  return task
}

export const hexArrayToBase64 = (hexArray: number[]): string => {
  // Convert hex array to binary string
  let binaryString = ''
  for (let i = 0; i < hexArray.length; i++) {
    binaryString += String.fromCharCode(hexArray[i])
  }

  // Encode binary string to Base64
  const base64String = btoa(binaryString)

  return base64String
}

/**
 *
 * @param obj1
 * @param obj2
 * @returns
 */
export const objectsAreEqual = (obj1: any, obj2: any): boolean => {
  const stringObj1 = JSON.stringify(obj1)
  const stringObj2 = JSON.stringify(obj2)

  return stringObj1 === stringObj2
}

/**
 * Usage: Array().sort(sortArrayByKey('theKey'))
 * @param key
 * @returns
 */
export const sortArrayByKey = (key: string) => (a: any, b: any) => {
  if (a[key] < b[key]) return -1 // a should come before b
  if (a[key] > b[key]) return 1 // b should come before a
  return 0 // names are equal
}

/**
 * Usage: isoDateString = secondsAndNanosToISOString(seconds, nanos)
 * @param seconds
 * @param nanos
 * @returns
 */
export const secondsAndNanosToISOString = (
  seconds: number,
  nanos: number
): string => {
  const milliseconds = seconds * 1000 + Math.floor(nanos / 1000000)
  const date = new Date(milliseconds)
  const isoString = date.toISOString()
  return isoString
}

/**
 *
 * @param level
 * @param title
 * @param message
 */

type LogType = 'ERROR' | 'INFO' | 'DEBUG' | 'VERBOSE'
const logSettings: LogType[] = ['ERROR', 'INFO', 'DEBUG']

export function log(type: LogType, ...args: any[]) {
  if (logSettings.includes(type)) {
    let text = ''
    const separator = ' '

    text += new Date().toISOString()
    text += separator
    text += `[${type}]`

    args.forEach((arg) => {
      text += separator
      text += arg
    })

    console.log(text)
  }
}
