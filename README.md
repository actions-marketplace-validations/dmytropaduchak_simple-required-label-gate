# simple-required-label-gate

Fail when a pull request is missing required labels.

## Usage

```yaml
name: Simple Required Label Gate
on:
  pull_request:

permissions:
  contents: read
  pull-requests: write

jobs:
  simple-required-label-gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: dmytropaduchak/simple-required-label-gate@v0.1.0
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

## Develop

```bash
npm install && npm run build
```
