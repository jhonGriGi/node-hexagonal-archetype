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

echo "📦 Instalando dependencias con $PACKAGE_MANAGER..."

options=("npm" "yarn" "pnpm")
select opt in "${options[@]}"
do
  case $opt in
    "npm")
      echo "installing with npm"
      npm install
      break
      ;;
    "yarn")
      echo "installing with npm"
      yarn install
      ;;
    "pnpm")
      echo "installing with pnpm"
      pnpm install
      ;;
    *)
      echo "Invalid option $REPLY"
      ;;
  esac
done

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

# Limpiar .git si existe
if [ -d .git ]; then
  echo "🧹 Eliminando repositorio Git existente..."
  rm -rf .git
fi

echo "🔃 Re-inicializando git..."
git init
if git remote get-url origin >/dev/null 2>&1; then
  git remote remove origin
fi
git fetch

if [ -n "$REMOTE_ORIGIN" ]; then
  echo "🔗 Agregando remote origin: $REMOTE_ORIGIN"

  git remote add origin "$REMOTE_ORIGIN"

  echo "El remote origin actual es: $(git remote get-url origin)"
else
  echo "ℹ️ No se configuró remote origin."
fi


echo "✅ Proyecto listo en $(pwd)."
