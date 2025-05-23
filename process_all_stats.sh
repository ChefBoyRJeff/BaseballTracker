#!/bin/bash

# Directories to search
LIVE_CSV_DIR="../BaseballScraper/data"
ARCHIVE_CSV_DIR="../BaseballScraper/data/archived_data"

# Check that both directories exist
if [ ! -d "$LIVE_CSV_DIR" ]; then
    echo "❌ Error: Live data directory '$LIVE_CSV_DIR' not found."
    exit 1
fi

if [ ! -d "$ARCHIVE_CSV_DIR" ]; then
    echo "❌ Error: Archived data directory '$ARCHIVE_CSV_DIR' not found."
    exit 1
fi

echo "📦 Processing CSVs from:"
echo "  ➤ $LIVE_CSV_DIR"
echo "  ➤ $ARCHIVE_CSV_DIR"

# Optional: Enable dry-run via --dry flag
DRY_RUN=false
if [[ "$1" == "--dry" ]]; then
    DRY_RUN=true
    echo "🧪 Dry run mode: files will not be processed."
fi

# Loop through both directories
for DIR in "$LIVE_CSV_DIR" "$ARCHIVE_CSV_DIR"; do
    find "$DIR" -maxdepth 1 -name "*.csv" | while IFS= read -r file; do
        filename=$(basename "$file")

        # Skip known non-player or unsupported files
        if [[ "$filename" == scores_* || "$filename" == standings_* || "$filename" == leader_stats_* ]]; then
            echo "⏭️ Skipping non-player file: $filename"
            continue
        fi

        if [ -f "$file" ]; then
            echo "📄 Processing file: $file"
            if [ "$DRY_RUN" = false ]; then
                node src/services/statLoader.js "$file"
                sleep 0.1
            fi
        fi
    done
done

echo "✅ All stats files in '$LIVE_CSV_DIR' and '$ARCHIVE_CSV_DIR' have been processed."
echo "📦 Processing complete."