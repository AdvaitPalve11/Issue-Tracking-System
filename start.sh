#!/bin/bash
echo "==================================================="
echo "            Starting Issue Tracker..."
echo "==================================================="
echo ""
echo "The application will start in the background."
echo "It will open in your browser automatically at:"
echo "http://localhost:8080"
echo ""
echo "Keep this terminal open. Close it or press Ctrl+C to stop the server."
echo ""

# Try to open the browser
if which xdg-open > /dev/null; then
  xdg-open http://localhost:8080 &
elif which open > /dev/null; then
  open http://localhost:8080 &
fi

# Run the embedded Java App
java -jar Issue-Tracking-0.0.1-SNAPSHOT.jar
