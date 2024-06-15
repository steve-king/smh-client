import { UserConfig } from '@/types'

const config: UserConfig = {
  nodes: [],
  services: [],
  settings: {
    cron_interval: 1,
    email: '',
    coingecko_api_key: '',
    coingecko_cache_duration: 60,
  },
}

export default config
