import { readdirSync } from '@withtypes/fs-extra'
import { readFileSync, lstatSync } from '@withtypes/fs-extra'
import minimist from '@withtypes/minimist'
import { resolve } from 'path'

/**
 * Get argv from Command Line
 */
export function getArgv() {
  const argv = minimist(process.argv.slice(2), { string: ['_'] })
  const { _, otp, tag } = argv
  const [name] = _

  if (!name) {
    const errArgs = [
      '',
      '🚧 Missing package name to generate declaration files.',
      '',
      '💡 Related command arguments and options:',
      '   pnpm build <package-name>',
      '   pnpm release <package-name> [--otp] [--tag]',
      '',
      '',
    ]
    const errMsg = errArgs.join('\n')
    throw new Error(errMsg)
  }

  return { name, otp, tag }
}

/**
 * Determine whether the npm package in Monorepo
 */
export function isPackage(fullPath: string) {
  const stat = lstatSync(fullPath)
  const isDir = stat.isDirectory()
  if (!isDir) {
    return false
  }

  const files = readdirSync(fullPath)
  return files.includes('package.json')
}

/**
 * Get the name of npm packages in Monorepo
 */
export function getPackages(rootPath: string) {
  const pkgDir = resolve(rootPath, `./packages`)
  const packages = readdirSync(pkgDir).filter((name) => {
    const fullPath = resolve(pkgDir, `./${name}`)
    return isPackage(fullPath)
  })

  console.log('packages: ', packages)
  return packages
}

/**
 * Parse package.json
 * @param path - The path where the `package.json` file is located
 */
export function parsePackage(path: string): { [key: string]: any } {
  try {
    const pkgPath = path.endsWith('package.json')
      ? resolve(path)
      : resolve(path, 'package.json')
    const pkgStringify = readFileSync(pkgPath, 'utf-8')
    const pkg = JSON.parse(pkgStringify)
    return pkg
  } catch (e) {
    return {}
  }
}
