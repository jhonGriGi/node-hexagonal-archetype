#!/bin/bash
set -e

echo "Selecciona una opción:"
select opt in "Instalar con código de ejemplo" "Instalar solo estructura" "Salir"; do
  case $opt in
    "Instalar con código de ejemplo")
      bash <(curl -s https://raw.githubusercontent.com/jhonGriGi/node-hexagonal-archetype/refs/heads/main/install-example.bash)
      break
      ;;
    "Instalar solo estructura")
      bash <(curl -s https://raw.githubusercontent.com/jhonGriGi/node-hexagonal-archetype/refs/heads/main/install-structure.bash)
      break
      ;;
    "Salir")
      echo "Operación cancelada"
      break
      ;;
  esac
done
