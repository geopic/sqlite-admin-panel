#!/usr/bin/sh
#
# install.sh
# Installation shell script for sqlite-admin-panel.
# © George Pickering 2020, https://github.com/geopic
# 

exists() {
  command -v "$1" >/dev/null 2>&1
}

echo 'Starting installation...';
if exists git; then
  # git clone https://github.com/geopic/sqlite-admin-panel.git
  # TODO: Continue installation process
else
  echo 'Git is not installed or cannot be recognised on your system. Aborting installation.'
  exit 1;
fi

exit 0;
