#!/bin/bash

# URL del arquetipo (quemada en el script)
REPO_URL="https://github.com/jhonGriGi/node-hexagonal-archetype"

# Si se pasa un argumento, usarlo como carpeta; si no, usar el actual
TARGET_DIR="${1:-.}"

if [ "$TARGET_DIR" != "." ]; then
  echo "Creando directorio $TARGET_DIR..."
  mkdir -p "$TARGET_DIR"
fi

cd "$TARGET_DIR" || exit 1

echo "Clonando repositorio en $(pwd)..."
git clone "$REPO_URL" . 

echo "Eliminando remote origin..."
git remote remove origin

echo "Borrando historial de commits..."
rm -rf .git
git init

echo "Instalando dependencias usando $PACKAGE_MANAGER..."
case "$PACKAGE_MANAGER" in
  npm)
    npm install
    ;;
  yarn)
    yarn install
    ;;
  pnpm)
    pnpm install
    ;;
  *)
    echo "Error: Gestor de paquetes no reconocido: $PACKAGE_MANAGER"
    echo "Debe ser uno de: npm, yarn, pnpm"
    exit 1
    ;;
esac

echo "Proyecto listo en $(pwd)."
