import { UserConfig } from '@/types'

const config: UserConfig = {
  settings: {
    cron_interval: 1,
    email: 'steve.king5891@gmail.com',
    coingecko_api_key: 'CG-2AWodFqHecRGcqpBSABapbPz',
    coingecko_cache_duration: 1,
  },
  nodes: [
    {
      id: '2afb1e3a-2e98-44dd-a66b-96efea6de359',
      name: 'Homelab',
      host: 'homelab.lan',
      port_public: '9092',
      port_private: '9093',
      port_post: '9094',
      smeshing: false,
    },
    {
      id: '7b930271-4a54-40bb-b911-7c89938dd29b',
      name: 'Smapp',
      host: '192.168.1.10',
      port_public: '9092',
      port_private: '9093',
      port_post: '9094',
      smeshing: true,
    },
  ],
  services: [
    {
      id: '1',
      name: 'service-01',
      host: '192.168.1.10',
      port_operator: '10001',
      su: '48',
    },
    {
      id: '2',
      name: 'service-02',
      host: '192.168.1.10',
      port_operator: '10002',
      su: '16',
    },
    {
      id: '3',
      name: 'service-03',
      host: '192.168.1.10',
      port_operator: '10003',
      su: '48',
    },
    {
      id: '4',
      name: 'service-04',
      host: '192.168.1.10',
      port_operator: '10004',
      su: '48',
    },
  ],
}

export default config
