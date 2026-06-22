#!/usr/bin/env sh
set -eu

terraform init -input=false
set +e
terraform plan -detailed-exitcode -input=false
code="$?"
set -e

case "$code" in
  0) echo "no drift" ;;
  2) echo "drift detected"; exit 2 ;;
  *) echo "terraform plan failed"; exit "$code" ;;
esac

