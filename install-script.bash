#!/bin/bash

set -e

echo "Enter the option for install"
options=("Install with example code" "Install structure" "Quit")
select opt in "${options[@]}"
do
  case $opt in
    "Install with example code")
      echo "installing example code"
      bash <(curl -s https://raw.githubusercontent.com/jhonGriGi/node-hexagonal-archetype/refs/heads/main/install-example.bash)
      break
      ;;
    "Install structure")
      echo "Creating structure"
      bash <(curl -s https://raw.githubusercontent.com/jhonGriGi/node-hexagonal-archetype/refs/heads/main/install-structure.bash)
      break
      ;;
    "Quit")
      echo "Operation cancelled"
      break
      ;;
    *)
      echo "Invalid option $REPLY"
      ;;
  esac
done
