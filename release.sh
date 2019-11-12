#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

gatsby build && \
rm -rf $DIR/docs && \
mv $DIR/public $DIR/docs && \
cp $DIR/CNAME $DIR/docs/CNAME && \
git commit -a -m "Release docs" && \
git push
