import { resolve } from 'path'
import { readdirSync } from '@withtypes/fs-extra'
import { buildLibrary } from './lib'
import { buildTypes } from './dts'
import { isPackage } from '../utils'

async function run() {
  const rootPath = resolve(__dirname, `../../`)
  const packages = readdirSync(resolve(rootPath, `./packages`)).filter((name) =>
    isPackage(name)
  )
  console.log(packages)

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
