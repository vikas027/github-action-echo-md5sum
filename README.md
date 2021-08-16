# github-action-echo

GitHub Action to echo back a `md5sum` of a variable which is passed to the action.

## Inputs

**Required** The variable which needs to be passed to the action

## Outputs

`md5sum` of the variable

## Example usage

```yaml
uses: vikas027/github-action-echo-md5sum@main
with:
  find-md5sum: HelloVikas
```
