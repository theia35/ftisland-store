#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

npm run build

cd dist

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:theia35/ftisland-store.git master:gh-pages

cd -
