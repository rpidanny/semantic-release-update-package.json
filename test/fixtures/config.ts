import { IPluginConfig } from '../../src/interfaces'

export function getMockPluginConfig(overrides: Partial<IPluginConfig> = {}): IPluginConfig {
  return {
    branches: ['master'],
    repositoryUrl: '',
    tagFormat: 'string',
    ci: true,
    noCache: true,
    packageJsonPath: 'package.json',
    ...overrides,
  }
}
