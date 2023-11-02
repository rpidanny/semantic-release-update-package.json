import { IPluginConfig } from './interfaces'
import { verifyConfig } from './verify-config'

export * from './prepare'

export async function verifyConditions(pluginConfig: IPluginConfig): Promise<void> {
  verifyConfig(pluginConfig)
}
