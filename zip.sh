#!/bin/bash

zip -r jscode-project.zip . -x "*docker*" -x "*.git*" -x "journal/*" -x "zip.sh" -x "node_modules/*" -x "dist/*" -x "*.DS_Store"