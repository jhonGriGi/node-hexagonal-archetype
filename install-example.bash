#!/bin/bash
set -e

REPO_URL="https://github.com/jhonGriGi/node-hexagonal-archetype"

read -rp "🔧 Carpeta de proyecto (usa '.' para la actual): " PROJECT_FOLDER
PROJECT_FOLDER=${PROJECT_FOLDER:-.}

[ "$PROJECT_FOLDER" != "." ] && mkdir -p "$PROJECT_FOLDER"
cd "$PROJECT_FOLDER" || exit 1

[ -d .git ] && rm -rf .git
echo "📥 Clonando repositorio..."
git clone "$REPO_URL" .

read -rp "🔧 Remote origin de git (opcional): " REMOTE_ORIGIN

echo "🔃 Re-inicializando git..."
git init
git remote remove origin 2>/dev/null || true

[ -n "$REMOTE_ORIGIN" ] && git remote add origin "$REMOTE_ORIGIN" && echo "🔗 Remote: $REMOTE_ORIGIN"

echo "🔧 Package Manager [npm/yarn/pnpm]"
select opt in npm yarn pnpm; do
  case $opt in
    npm|yarn|pnpm)
      echo "📦 Instalando con $opt..."
      $opt install
      break
      ;;
  esac
done

rm -f install-*.bash
echo "✅ Proyecto listo en $(pwd)"
