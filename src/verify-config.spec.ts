import Joi from 'joi'

import { verifyConfig } from './verify-config'

describe('verifyConfig', () => {
  it('should return a valid config object when the plugin config is valid', async () => {
    const pluginConfig = {
      packageJsonPath: '/path/to/package.json',
    }

    const config = verifyConfig(pluginConfig)

    expect(config).toEqual({
      packageJsonPath: '/path/to/package.json',
    })
  })

  it.each`
    value
    ${undefined}
    ${12334}
    ${false}
  `('should throw an error `packageJsonPath` is $value', async ({ value }) => {
    const pluginConfig = {
      ...(value ? { packageJsonPath: value } : {}),
    }

    expect(() => verifyConfig(pluginConfig)).toThrow(Joi.ValidationError)
  })

  it('should propagate unknown properties in the plugin config', async () => {
    const pluginConfig = {
      packageJsonPath: '/path/to/package.json',
      unknownProperty: 'unknown value',
    }

    const config = verifyConfig(pluginConfig)

    expect(config).toEqual({
      packageJsonPath: '/path/to/package.json',
      unknownProperty: 'unknown value',
    })
  })
})
