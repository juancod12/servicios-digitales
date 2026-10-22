#!/bin/sh
# Compila src/input.css -> css/app.css con el ejecutable de Tailwind (tools/).
# Uso: ./build.sh          (una vez, minificado)
#      ./build.sh --watch  (recompila al guardar)
cd "$(dirname "$0")"
./tools/tailwindcss.exe -i src/input.css -o css/app.css --minify "$@"
