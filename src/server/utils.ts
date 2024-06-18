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
      resolve(false)
    })

    netSocket.on('error', () => {
      log('DEBUG', 'PING', `host connection error: ${host}:${port}`)
      netSocket.destroy()
      resolve(false)
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

/**
 *
 * @param level
 * @param title
 * @param message
 */

type LogType = 'ERROR' | 'INFO' | 'DEBUG' | 'VERBOSE'
const logSettings: LogType[] = ['ERROR', 'INFO']

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
