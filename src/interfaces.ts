export interface IPluginBaseConfig {
  branches: Array<string>
  repositoryUrl: string
  tagFormat: string
  ci: boolean
  noCache: boolean
}

export interface IConfig {
  packageJsonPath: string
}

export interface IPluginConfig extends IPluginBaseConfig, IConfig {}

export interface INextRelease {
  version: string
}

export interface ILogger {
  log(message: string): void
}

export interface IPluginContext {
  cwd: string
  env: Record<string, string>
  nextRelease: INextRelease
  logger: ILogger
}
