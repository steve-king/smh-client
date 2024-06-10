import path from 'path'
import { loadPackageDefinition } from '@grpc/grpc-js'
import { loadSync } from '@grpc/proto-loader'
import { recursiveFileList } from '../utils'

const cwd = process.cwd()
const protoDirs = {
  google: path.join(cwd, 'node_modules/google-proto-files'),
  grpcGateway: path.join(cwd, 'submodules/grpc-ecosystem/grpc-gateway'),
  spacemesh: path.join(cwd, 'submodules/spacemeshos/api'),
}

const protoFiles = recursiveFileList(protoDirs.spacemesh, '.proto')

const packageDefinition = loadSync(protoFiles, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  includeDirs: [protoDirs.google, protoDirs.grpcGateway, protoDirs.spacemesh],
})

const api = loadPackageDefinition(packageDefinition)

export default api as any
