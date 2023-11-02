import fs, { promises as fsp } from 'fs'

import { getMockPluginConfig } from '../test/fixtures/config'
import { getMockNextRelease, getMockPluginContext } from '../test/fixtures/context'
import { IPluginConfig, IPluginContext } from './interfaces'
import { prepare } from './prepare'

jest.mock('fs', () => {
  return {
    constants: {
      F_OK: 0,
    },
    promises: {
      access: jest.fn(),
      readFile: jest.fn().mockResolvedValue(JSON.stringify({ version: '1.2.3' })),
      writeFile: jest.fn(),
    },
  }
})

describe('prepare', () => {
  const mockPluginConfig: IPluginConfig = getMockPluginConfig()

  beforeEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should update the package.json version if a version is provided', async () => {
    const pluginContext: IPluginContext = getMockPluginContext({
      nextRelease: getMockNextRelease({ version: '9.9.9' }),
    })

    const packagePath = `${pluginContext.cwd}/${mockPluginConfig.packageJsonPath}`

    await prepare(mockPluginConfig, pluginContext)

    expect(fs.promises.access).toHaveBeenCalledWith(packagePath, fs.constants.F_OK)
    expect(fsp.readFile).toHaveBeenCalledWith(packagePath, 'utf-8')
    expect(fsp.writeFile).toHaveBeenCalledWith(packagePath, expect.stringMatching(/9.9.9/))
  })

  it('should log a message if the package.json file does not exist', async () => {
    const pluginContext: IPluginContext = getMockPluginContext()

    jest
      .spyOn(fsp, 'readFile')
      .mockRejectedValueOnce(new Error('package.json not found at package.json'))

    await expect(prepare(mockPluginConfig, pluginContext)).rejects.toThrow(
      'package.json not found at package.json',
    )

    expect(fsp.readFile).toHaveBeenCalledTimes(1)
    expect(fsp.writeFile).not.toHaveBeenCalled()
    expect(pluginContext.logger.log).toHaveBeenCalledWith(
      expect.stringContaining('package.json not found at package.json'),
    )
  })

  it('should log a message if there is an error updating the package.json file', async () => {
    const pluginContext: IPluginContext = getMockPluginContext()

    jest.spyOn(fsp, 'writeFile').mockRejectedValueOnce(new Error('Error updating package.json'))

    await expect(prepare(mockPluginConfig, pluginContext)).rejects.toThrow(
      'Error updating package.json',
    )

    expect(fsp.readFile).toHaveBeenCalledTimes(1)
    expect(pluginContext.logger.log).toHaveBeenCalledWith(
      'Failed to update package.json: Error updating package.json',
    )
  })

  it('should skip updating package.json if version in nextRelease doesnt exist', async () => {
    const pluginContext: IPluginContext = getMockPluginContext({
      nextRelease: {},
    })

    await prepare(mockPluginConfig, pluginContext)

    expect(fs.promises.access).not.toHaveBeenCalled()
    expect(fsp.readFile).not.toHaveBeenCalled()
    expect(fsp.writeFile).not.toHaveBeenCalled()
  })
})
