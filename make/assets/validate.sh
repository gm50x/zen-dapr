#!/bin/sh
if [ -z "${app}" ]; then 
  echo "##########################################";
  echo "\$app has not been set.";
  echo "Usage:"
  echo "  $ make pristine app=yourApp";
  echo "##########################################";
  exit 1;
fi
