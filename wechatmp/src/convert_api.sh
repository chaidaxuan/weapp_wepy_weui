#! /bin/bash

clean_one_ts () {
    echo $1
    sed -i '/Injectable/d' $1
}

export -f clean_one_ts

echo '正在清除 Injectable'
find api -type f | while read file; do clean_one_ts $file; done

echo '正在更正 api/api.ts'
sed -i 's/@angular\/common/\.\./' api/api.ts

echo '正在更正 api/api.ts'
sed -i 's/window/\(wx as any\)/' api/api.ts

