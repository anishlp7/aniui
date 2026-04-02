#!/bin/bash
# Publish AniUI demo to EAS Update for public QR code preview
#
# Prerequisites:
#   1. Run: eas login
#   2. Run: eas init (links project to your Expo account)
#   3. Replace YOUR_PROJECT_ID in app.json with the actual project ID
#
# After running this script, get your QR code at:
#   https://qr.expo.dev/eas-update?projectId=YOUR_PROJECT_ID&channel=preview
#
# Embed in docs/README:
#   <img src="https://qr.expo.dev/eas-update?projectId=YOUR_PROJECT_ID&channel=preview" width="200" />

set -e

echo "Publishing AniUI demo to EAS Update..."
echo ""

# Check if logged in
eas whoami || { echo "Run 'eas login' first"; exit 1; }

# Check if project is linked
if grep -q "YOUR_PROJECT_ID" app.json; then
  echo ""
  echo "ERROR: app.json still has YOUR_PROJECT_ID placeholder."
  echo "Run 'eas init' to link this project, then update app.json with your project ID."
  exit 1
fi

# Publish update
eas update --channel preview --message "AniUI demo — $(date +%Y-%m-%d)"

echo ""
echo "Done! Your QR code is available at:"
PROJECT_ID=$(grep -o '"url": "https://u.expo.dev/[^"]*"' app.json | grep -o '[a-f0-9-]\{36\}')
echo "  https://qr.expo.dev/eas-update?projectId=${PROJECT_ID}&channel=preview"
echo ""
echo "Embed in docs:"
echo "  <img src=\"https://qr.expo.dev/eas-update?projectId=${PROJECT_ID}&channel=preview\" width=\"200\" />"
