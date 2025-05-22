#!/bin/bash

# Paths to both current and archived CSVs
BASE_DIR="../BaseballScraper/data"
ARCHIVE_DIR="$BASE_DIR/archived_data"

# Function to process CSVs in a directory
process_csv_dir() {
    local DIR=$1

    if [ ! -d "$DIR" ]; then
        echo "❌ Directory not found: $DIR"
        return
    fi

    echo "🔍 Looking for CSV files in: $DIR"

    find "$DIR" -maxdepth 1 -name "*.csv" | while IFS= read -r file; do
        if [ -f "$file" ]; then
            echo "📄 Processing: $file"
            node src/services/statLoader.js "$file"
            sleep 0.1
        fi
    done
}

echo "========================================="
echo "⚾ Processing current and archived CSV stats"
echo "========================================="

# Process both folders
process_csv_dir "$BASE_DIR"
process_csv_dir "$ARCHIVE_DIR"

echo "✅ All stat files have been processed."
