import fs, { promises as fsp } from 'fs'
import path from 'path'

import { IPluginConfig, IPluginContext } from './interfaces'

export const prepare = async (
  pluginConfig: IPluginConfig,
  { cwd, nextRelease: { version }, logger }: IPluginContext,
): Promise<void> => {
  const { packageJsonPath } = pluginConfig

  const fillPath = path.resolve(cwd, packageJsonPath)

  if (!version) return

  try {
    await fsp.access(fillPath, fs.constants.F_OK)

    const packageJson = await fsp.readFile(fillPath, 'utf-8')

    const packageJsonObj = JSON.parse(packageJson)

    packageJsonObj.version = version

    await fsp.writeFile(fillPath, JSON.stringify(packageJsonObj, null, 2))
    logger.log(`Updated package.json version to ${version}`)
  } catch (err) {
    logger.log(`Failed to update package.json: ${(err as Error).message}`)
    throw err
  }
}
