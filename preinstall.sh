#!/bin/sh

mkdir -pv local_modules/grafana
pushd local_modules/grafana
git init
git config core.sparseCheckout true
git remote add -f origin git@github.com:grafana/grafana.git
echo "packages/grafana-toolkit/*" > .git/info/sparse-checkout
git checkout toolkit-git-publish
popd