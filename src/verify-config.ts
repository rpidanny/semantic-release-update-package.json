import Joi from 'joi'

import { IConfig } from './interfaces'

export function verifyConfig(pluginConfig: Record<string, any>): IConfig {
  const schema = Joi.object({
    packageJsonPath: Joi.string().required(),
  })

  const { value, error } = schema.validate(pluginConfig, {
    allowUnknown: true,
    abortEarly: false,
  })

  if (error) {
    throw error
  }

  return value
}
