import defaultConfig from './config.default'

const config = {
  ...defaultConfig,
  nodes: [
    {
      id: '1',
      name: 'Homelab',
      host: '192.168.1.2',
      port_public: '9092',
      port_private: '9093',
      port_post: '9094',
    },
    {
      id: '2',
      name: 'Smapp',
      host: '192.168.1.10',
      port_public: '9092',
      port_private: '9093',
      port_post: '9094',
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
      su: '48',
    },
    {
      id: '3',
      name: 'service-03',
      host: '192.168.1.10',
      port_operator: '10003',
      su: '48',
    },
  ],
}

export default config
