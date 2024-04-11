#!/bin/bash

# Check if data_populated.flag exists
if [ ! -f "data_populated.flag" ]; then
    echo "Database seems empty. 🤔 Populating..."
    python mock_data.py
fi

# Run the main script in detached mode with -u flag
python -u main.py &

# Keep the container running
tail -f /dev/null