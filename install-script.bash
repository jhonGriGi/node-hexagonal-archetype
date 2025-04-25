#!/bin/bash

set -e  # Detiene la ejecución si hay un error

REPO_URL="https://github.com/jhonGriGi/node-hexagonal-archetype"

echo "🔧 Carpeta de proyecto (usa '.' para usar la actual)"
read -r PROJECT_FOLDER
PROJECT_FOLDER=${PROJECT_FOLDER:-.}

if [ "$PROJECT_FOLDER" != "." ]; then
  echo "📁 Creando directorio $PROJECT_FOLDER..."
  mkdir -p "$PROJECT_FOLDER"
  cd "$PROJECT_FOLDER" || exit 1
fi

echo "🔧 Package Manager para el proyecto [npm, pnpm, yarn]"
read -r PACKAGE_MANAGER

if [[ "$PACKAGE_MANAGER" != "npm" && "$PACKAGE_MANAGER" != "pnpm" && "$PACKAGE_MANAGER" != "yarn" ]]; then
  echo "❌ Package manager inválido. Debe ser npm, pnpm o yarn. Saliendo..."
  exit 1
fi

echo "🔧 Nuevo remote origin de git (opcional, deja vacío si no quieres configurarlo)"
read -r REMOTE_ORIGIN

# Limpiar .git si existe
if [ -d .git ]; then
  echo "🧹 Eliminando repositorio Git existente..."
  rm -rf .git
fi

echo "📥 Clonando repositorio en carpeta temporal..."
TMP_DIR=$(mktemp -d)
git clone "$REPO_URL" "$TMP_DIR"

echo "📦 Copiando archivos al directorio actual..."
cp -r "$TMP_DIR"/* "$TMP_DIR"/.??* . 2>/dev/null || true
rm -rf "$TMP_DIR"

echo "🔃 Re-inicializando git..."
git init
git remote remove origin
git fetch

if [ -n "$REMOTE_ORIGIN" ]; then
  echo "🔗 Agregando remote origin: $REMOTE_ORIGIN"

  git remote add origin "$REMOTE_ORIGIN"

  echo "El remote origin actual es: $(git remote get-url origin)"
else
  echo "ℹ️ No se configuró remote origin."
fi

echo "📦 Instalando dependencias con $PACKAGE_MANAGER..."
$PACKAGE_MANAGER install

echo "✅ Proyecto listo en $(pwd)."
