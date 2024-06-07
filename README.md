<!-- # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list -->

# SMH-Client

A self-hosted web application powered by a gRPC client on the backend for monitoring Spacemesh nodes and post services.

- node.js will maintain gRPC streaming calls with all of your configured nodes/services.
- This data is continuaously collected in real time and a global 'state' object is held in memory.
- When the state changes, an 'update' websocket event is emitted to all connected web browser clients.
- When the websocket event is received, the browser will immediately fetch the latest state from the server using a good old http request.
- If you already have a VPN or ZTNA (Zero Trust Network Access) solution for remote access to your network, you can easily check on your nodes from any location.

To do / Feature roadmap

- Email alerts whenever a significant event occurs (e.g node offline, post service starts/finishes proving, ATX submitted)
- Web panel user authentication? (tbc)

# Installation

## with Docker compose (recommended)

1. Create the empty folders: `smh-client` and `smh-client/data`
2. Create a `smh-client/compose.yaml` file with the following contents:

```
services:
  smh-client:
    container_name: smh-client
    build: https://github.com/steve-king/smh-client.git#main
    ports:
      - '3131:3131'
    volumes:
      - ./data:/app/data
    restart: always
```

3. cd to `smh-client` directory
4. Run:

```
docker compose up -d
```

### Update to latest version:

```
docker compose down
docker compose build
docker compose up -d
```

## Docker run

If you prefer not to use compose, run:

```

```

## Manual installation

Pre-requisites:

- git
- nodejs (v18 or higher)

1. clone repository: `git clone git@github.com:steve-king/smh-client.git`
2. Change to directory: `cd smh-client`
3. Initialise submodule: `git submodule update --init --recursive`
4. Install node packages: `npm install`
5. Compile and run: `npm run build && npm start`
6. Or for dev environment: `npm run dev`
