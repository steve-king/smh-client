import fs from 'fs'
import path from 'path'
import { log } from '../utils'

import defaultConfig from './config.dev'

interface Settings {
  cronInterval: number
  debounceInterval: number
  email: string | undefined
}

export interface Config {
  nodes: any[]
  services: any[]
  settings: Settings
}

class UserConfig {
  public data: Config
  dir: string = path.join(process.cwd(), 'data')
  fileName: string = 'config.json'

  onLoadCallback: undefined | ((config: Config) => void)

  constructor() {
    this.data = defaultConfig
    this.initialise()
  }

  get file() {
    return path.join(this.dir, this.fileName)
  }

  /**
   * Write the default config file to disk, if it doesn't already exist
   * @returns
   */
  initialise = () => {
    if (!fs.existsSync(this.dir)) {
      log('INFO', 'CONFIG', `create directory: ${this.dir}`)
      try {
        fs.mkdirSync(this.dir)
      } catch (e) {
        log('ERROR', 'CONFIG', `Error creating directory: ${this.dir}`)
        return
      }
    }

    if (!fs.existsSync(this.file)) {
      log('INFO', 'CONFIG', `create file: ${this.file}`)
      this.save(this.data)
    }
  }

  /**
   * Save new config data to disk
   * @param data
   * @returns
   */
  save = (data: Config) => {
    try {
      fs.writeFileSync(this.file, JSON.stringify(data, null, 2), {
        encoding: 'utf8',
      })
      log('INFO', 'CONFIG', `file saved: ${this.file}`)
      log('VERBOSE', data)
      return true
    } catch (e) {
      log('ERROR', 'CONFIG', `Error saving file: ${this.file}`)
      return false
    }
  }

  /**
   * Load the config data from disk
   * If an onLoad callback has been set, call it and pass in the Config object
   * @returns Config
   */
  load = () => {
    try {
      const fileContents = fs.readFileSync(this.file, { encoding: 'utf8' })
      const json = JSON.parse(fileContents)
      log('INFO', 'CONFIG', `file loaded: ${this.file}`)
      log('VERBOSE', JSON.stringify(json))
      this.data = json
    } catch (e) {
      log('ERROR', 'CONFIG', `Error loading file: ${this.file}`)
      throw new Error()
    }

    if (typeof this.onLoadCallback === 'function') {
      this.onLoadCallback(this.data)
    }

    return this.data
  }

  /**
   * Specify a callback function to be called whenever config file is loaded
   * @param callback
   */
  onLoad = (callback: (config?: Config) => void) => {
    this.onLoadCallback = callback
  }
}

const userConfig = new UserConfig()
export default userConfig
