# semantic-release-update-package.json

[**semantic-release**](https://github.com/semantic-release/semantic-release) plugin that updates `package.json` with the new release version.

This tool is especially useful when using [semantic-release-plus](https://github.com/semantic-release-plus/semantic-release-plus) with mono-repo frameworks like [nx](https://nx.dev/).

## Install

```bash
$ npm i --save-dev @rpidanny/semantic-release-update-package.json
```

## Usage

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@rpidanny/semantic-release-update-package.json",
      {
        "packageJsonPath": "./packages/core/package.json"
      }
    ]
  ]
}
```

With this example, for each release, the `package.json` at `./packages/core/package.json` will be updated with the latest release version.

## Configuration

### Options

| Options           | Description                                 | Type     | Required |
| ----------------- | ------------------------------------------- | -------- | -------- |
| `packageJsonPath` | Path where the `package.json` is stored at. | `string` | `true`   |

### Examples

When used with the [@semantic-release/git](https://github.com/semantic-release/git) plugins the `@rpidanny/semantic-release-update-package.json` plugin must be called first in order to update the `package.json` file so the [@semantic-release/git](https://github.com/semantic-release/git) plugin can include it in the release commit.

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@rpidanny/semantic-release-update-package.json",
      {
        "packageJsonPath": "./packages/core/package.json"
      }
    ],
    [
      "@semantic-release/npm",
      {
        "npmPublish": false
      }
    ],
    "@semantic-release/github",
    [
      "@semantic-release/git",
      {
        "assets": [
          "CHANGELOG",
          "package.json",
          "package-lock.json",
          "./packages/core/package.json"
        ],
        "message": "chore(release): ${nextRelease.version} [skip-ci]\n\n${nextRelease.notes}"
      }
    ]
  ]
}
```
