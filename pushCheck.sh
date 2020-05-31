#!/bin/sh

echo "Pre-commit hook running..."

if grep 'prevent_push' -R src
then
  echo "Changes were not committed."
  exit 1;
else
  exit 0;
fi