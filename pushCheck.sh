#!/bin/sh

echo "Pre-push hook running..."

if grep 'prevent_push' -R src
then
  echo "Changes were not pushed."
  exit 1;
else
  exit 0;
fi