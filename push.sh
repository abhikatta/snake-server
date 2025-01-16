tsc index.ts
git add .
git commit -m "$(echo -e "update\n>> " && read line && echo $line)"
git push