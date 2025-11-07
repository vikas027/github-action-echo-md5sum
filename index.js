#!/usr/bin/env node

const crypto = require('crypto')
const fs = require('fs')

// Read inputs from environment variables
// GitHub Actions sets inputs as INPUT_<INPUT_NAME> in uppercase
const findMd5sum = process.env.INPUT_FIND_MD5SUM || 'hello'
const findMd5sumShort = process.env.INPUT_FIND_MD5SUM_SHORT || 'false'

console.log(`Variable passed: ${findMd5sum}`)

// Compute md5sum
const md5sum = crypto.createHash('md5').update(findMd5sum).digest('hex')
const md5sumShort = md5sum.substring(0, 6)

console.log(`MD5 sum: ${md5sum}`)
console.log(`MD5 sum (short): ${md5sumShort}`)

// Set outputs using the new GitHub Actions syntax
// Write to GITHUB_OUTPUT file
const githubOutput = process.env.GITHUB_OUTPUT
if (githubOutput) {
  fs.appendFileSync(githubOutput, `md5sum_var=${md5sum}\n`)
  fs.appendFileSync(githubOutput, `md5sum_var_short=${md5sumShort}\n`)
} else {
  // Fallback for older runners (deprecated syntax)
  console.log(`::set-output name=md5sum_var::${md5sum}`)
  console.log(`::set-output name=md5sum_var_short::${md5sumShort}`)
}
