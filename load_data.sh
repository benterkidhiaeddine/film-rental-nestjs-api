#!/bin/bash

# Set variables
CONTAINER_NAME="film-rental-postgres-1"
SCHEMA_FILE="postgres-sakila-schema.sql"
DATA_FILE="postgres-sakila-insert-data.sql"
POSTGRES_USER="postgres" # Default user, change if needed
POSTGRES_DB="postgres"   # Default database, change if needed

# Check if the container is running
if ! docker ps --filter "name=$CONTAINER_NAME" | grep -q "$CONTAINER_NAME"; then
    echo "Error: Container '$CONTAINER_NAME' is not running."
    exit 1
fi

# Copy the SQL files into the container
echo "Copying SQL files to container..."
docker cp "./db/$SCHEMA_FILE" "$CONTAINER_NAME:/tmp/$SCHEMA_FILE"
docker cp "./db/$DATA_FILE" "$CONTAINER_NAME:/tmp/$DATA_FILE"

# Load the schema file
echo "Loading schema..."
docker exec -i "$CONTAINER_NAME" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f "/tmp/$SCHEMA_FILE"

# Load the data file
echo "Loading data..."
docker exec -i "$CONTAINER_NAME" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f "/tmp/$DATA_FILE"

# Clean up temporary files in the container
echo "Cleaning up..."
docker exec -i "$CONTAINER_NAME" rm -f "/tmp/$SCHEMA_FILE" "/tmp/$DATA_FILE"

echo "SQL files loaded successfully."
