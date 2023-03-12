import { resolve } from 'path'
import { buildLibrary } from './lib'
import { buildTypes } from './dts'
import { getPackages } from '../utils'

async function run() {
  const rootPath = resolve(__dirname, `../../`)
  const packages = getPackages(rootPath)
  for (let i = 0; i < packages.length; i++) {
    const name = packages[i]
    const options = { name, rootPath }

    await buildLibrary(options)
    await buildTypes(options)
  }
}
run().catch((e) => {
  console.log(e)
})
