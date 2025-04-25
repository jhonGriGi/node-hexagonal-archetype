#!/bin/bash

# URL del arquetipo (quemada en el script)
REPO_URL="https://github.com/jhonGriGi/node-hexagonal-archetype"

echo "🔧 Carpeta de proyecto o puedes usar la actual usando (.)"
read PROJECT_FOLDER
PROJECT_FOLDER=${PROJECT_FOLDER:-.} # Usa '.' si el usuario no escribe nada

if [ "$PROJECT_FOLDER" != "." ]; then
  echo "Creando directorio $PROJECT_FOLDER..."
  mkdir -p "$PROJECT_FOLDER"
  cd "$PROJECT_FOLDER" || exit 1
fi

# Package Manager
echo "🔧 Package Manager para el proyecto [npm, pnpm, yarn]"
read PACKAGE_MANAGER

# Validar package manager
if [[ "$PACKAGE_MANAGER" != "npm" && "$PACKAGE_MANAGER" != "pnpm" && "$PACKAGE_MANAGER" != "yarn" ]]; then
  echo "❌ Package manager inválido. Debe ser npm, pnpm o yarn. Saliendo..."
  exit 1
fi

# Nuevo remote origin (opcional)
echo "🔧 Nuevo remote origin de git (opcional, deja vacío si no quieres configurarlo)"
read REMOTE_ORIGIN

# Limpiar repositorio git actual si existe
DEFAULT_GIT_DIR="./.git"
if [ -d "$DEFAULT_GIT_DIR" ]; then
  rm -rf "$DEFAULT_GIT_DIR"
fi

echo "Clonando repositorio en $(pwd)..."
git clone "$REPO_URL" . 

echo "Eliminando remote origin de arquetipo"
git remote remove origin

echo "Borrando historial de commits de arquetipo"
rm -rf .git
git init

# Si el usuario definió un remote origin, lo añadimos
if [ -n "$REMOTE_ORIGIN" ]; then
  echo "Agregando nuevo remote origin: $REMOTE_ORIGIN"
  git remote add origin "$REMOTE_ORIGIN"
else
  echo "No se configuró remote origin."
fi

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
esac

echo "✅ Proyecto listo en $(pwd)."
