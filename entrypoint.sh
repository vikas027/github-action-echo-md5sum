#!/usr/bin/env bash
set -e

# Second input does not comes in the argument
# Need to figure out how to get the same
echo "Variable(s) passed: ${1} ${2}"

md5sum_var=$(echo -n ${1} | md5sum | awk '{ print $1 }')
md5sum_var_short=$(echo -n ${1} | md5sum | awk '{ print $1 }' | head -c 6)

echo "::set-output name=md5sum_result::$md5sum_var"
echo "::set-output name=md5sum_result_short::$md5sum_var_short"
