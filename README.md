# GitHub Action: MD5 Sum Generator

A lightweight GitHub Action that computes the MD5 hash of a given input string. Built with Node.js for fast execution without Docker image builds.

## Inputs

### `find_md5sum`
**Required**: `true`  
**Default**: `'hello'`  
**Description**: The string value to compute the MD5 hash for.

### `find_md5sum_short`
**Required**: `false`  
**Default**: `'false'`  
**Description**: Whether to generate a short (6-character) version of the MD5 hash.

## Outputs

### `md5sum_var`
The full MD5 hash (32 characters) of the input string.

### `md5sum_var_short`
The short MD5 hash (first 6 characters) of the input string.

## Local Testing with `act`

### Prerequisites: Node in PATH

When using [actions/actions-runner-controller](https://github.com/actions/actions-runner-controller) with the official runner image, `node` is not in the PATH by default, which causes local testing with `act` to fail.

**Solution**: Build a custom runner image based on official `ghcr.io/actions/actions-runner:latest`  with node added to PATH:

```dockerfile
FROM ghcr.io/actions/actions-runner:latest

ENV PATH="/home/runner/externals/node24/bin:${PATH}"

ENTRYPOINT ["/home/runner/run.sh"]
```

### Running Local Tests

Test the action locally using `act`:
```bash
❯ act --container-architecture linux/amd64 push -P ubuntu-latest=docker.io/vikas027/github-actions-runner
INFO[0000] Using docker host 'unix:///var/run/docker.sock', and daemon socket 'unix:///var/run/docker.sock' 
[Test GitHub Action Locally/local-test-with-act] ⭐ Run Set up job
[Test GitHub Action Locally/local-test-with-act] 🚀  Start image=docker.io/vikas027/github-actions-runner
[Test GitHub Action Locally/local-test-with-act]   🐳  docker pull image=docker.io/vikas027/github-actions-runner platform=linux/amd64 username= forcePull=true
[Test GitHub Action Locally/local-test-with-act]   🐳  docker create image=docker.io/vikas027/github-actions-runner platform=linux/amd64 entrypoint=["tail" "-f" "/dev/null"] cmd=[] network="host"
[Test GitHub Action Locally/local-test-with-act]   🐳  docker run image=docker.io/vikas027/github-actions-runner platform=linux/amd64 entrypoint=["tail" "-f" "/dev/null"] cmd=[] network="host"
[Test GitHub Action Locally/local-test-with-act]   🐳  docker exec cmd=[chown -R 1001:1001 <redacted>github-action-echo-md5sum] user=0 workdir=
[Test GitHub Action Locally/local-test-with-act]   🐳  docker exec cmd=[node --no-warnings -e console.log(process.execPath)] user= workdir=
[Test GitHub Action Locally/local-test-with-act]   ✅  Success - Set up job
[Test GitHub Action Locally/local-test-with-act] ⭐ Run Main Checkout
[Test GitHub Action Locally/local-test-with-act]   🐳  docker cp src=<redacted>github-action-echo-md5sum/. dst=<redacted>github-action-echo-md5sum
[Test GitHub Action Locally/local-test-with-act]   🐳  docker exec cmd=[chown -R 1001:1001 <redacted>github-action-echo-md5sum] user=0 workdir=
[Test GitHub Action Locally/local-test-with-act]   ✅  Success - Main Checkout [77.347333ms]
[Test GitHub Action Locally/local-test-with-act] ⭐ Run Main Find md5sum
[Test GitHub Action Locally/local-test-with-act]   🐳  docker exec cmd=[/home/runner/externals/node24/bin/node <redacted>github-action-echo-md5sum/index.js] user= workdir=
| Variable passed: HelloVikas
| MD5 sum: 276219b5a52103bd05ef7283eab5a4ff
| MD5 sum (short): 276219
[Test GitHub Action Locally/local-test-with-act]   ✅  Success - Main Find md5sum [357.946834ms]
[Test GitHub Action Locally/local-test-with-act]   ⚙  ::set-output:: md5sum_var=276219b5a52103bd05ef7283eab5a4ff
[Test GitHub Action Locally/local-test-with-act]   ⚙  ::set-output:: md5sum_var_short=276219
[Test GitHub Action Locally/local-test-with-act] ⭐ Run Main Get the md5sum
[Test GitHub Action Locally/local-test-with-act]   🐳  docker exec cmd=[bash -e /var/run/act/workflow/2] user= workdir=
| The md5sum is 276219b5a52103bd05ef7283eab5a4ff 276219
[Test GitHub Action Locally/local-test-with-act]   ✅  Success - Main Get the md5sum [78.397167ms]
[Test GitHub Action Locally/local-test-with-act] ⭐ Run Complete job
[Test GitHub Action Locally/local-test-with-act] Cleaning up container for job local-test-with-act
[Test GitHub Action Locally/local-test-with-act]   ✅  Success - Complete job
[Test GitHub Action Locally/local-test-with-act] 🏁  Job succeeded
```

## Example Usage

```yaml
name: Example Action Workflow
on:
  workflow_dispatch:

jobs:
  find_md5sum:
    runs-on: ubuntu-latest
    steps:
      - name: Compute MD5 Sum
        id: md5sum
        uses: vikas027/github-action-echo-md5sum@main
        with:
          find_md5sum: HelloGitHub
          find_md5sum_short: 'true'

      - name: Display MD5 Sum
        run: |
          echo "Full MD5: ${{ steps.md5sum.outputs.md5sum_var }}"
          echo "Short MD5: ${{ steps.md5sum.outputs.md5sum_var_short }}"
```

## Features

- **Fast execution**: Uses Node.js runtime, no Docker image building required
- **Lightweight**: Pure Node.js with no external dependencies
- **Dual output**: Provides both full (32-char) and short (6-char) MD5 hashes
- **Compatible**: Works with `node20` and `node24` runtimes
