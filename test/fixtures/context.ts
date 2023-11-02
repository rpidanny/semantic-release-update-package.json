import { INextRelease, IPluginContext } from '../../src/interfaces'

export function getMockNextRelease(overrides: Partial<INextRelease> = {}): INextRelease {
  return {
    version: '1.2.3',
    ...overrides,
  }
}

export function getMockPluginContext(overrides: Partial<IPluginContext> = {}): IPluginContext {
  return {
    cwd: '/tmp/cwd',
    env: {},
    nextRelease: getMockNextRelease(),
    logger: { log: jest.fn() },
    ...overrides,
  }
}
