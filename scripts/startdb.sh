#!/bin/bash

# Path to the database directory
PWD="$(dirname "$(readlink -f -- "$0")")"
DB_DIR="$PWD/../db"
LOG_FILE="$DB_DIR/pg_start.log"

# Check if the DB directory exists
if [ ! -d "$DB_DIR" ]; then
  echo "Database directory $DB_DIR does not exist." | tee -a "$LOG_FILE"
  exit 1
fi

# Log start time
echo "Starting PostgreSQL database at $(date)..." | tee -a "$LOG_FILE"

# Start the PostgreSQL database using pg_ctl
pg_ctl start -D "$DB_DIR" >> "$LOG_FILE" 2>&1

# Check if the start was successful
if [ $? -eq 0 ]; then
  echo "Database started successfully at $(date)." | tee -a "$LOG_FILE"
else
  echo "Failed to start the database at $(date)." | tee -a "$LOG_FILE"
  exit 1
fi
