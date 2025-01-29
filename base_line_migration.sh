#!/bin/bash

# Exit on error
set -e

# Define the file and folder paths
SCHEMA_FILE="prisma/schema.prisma"
MIGRATION_FOLDER="prisma/migrations"
VIEWS_FOLDER="prisma/views"

# Reset the schema.prisma file
echo "Resetting schema.prisma file..."
cat > "$SCHEMA_FILE" <<EOL
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["views"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
EOL

# Pull the database schema into Prisma
echo "Pulling database schema..."
npx prisma db pull

# Check if the migration folder already exists and delete it
if [ -d "$MIGRATION_FOLDER" ]; then
  echo "Removing existing migration folder..."
  rm -rf "$MIGRATION_FOLDER"
fi

# Check if the views folder already exists and delete it
if [ -d "$VIEWS_FOLDER" ]; then
  echo "Removing existing views folder..."
  rm -rf "$VIEWS_FOLDER"
fi

# Create a fresh migration folder
echo "Creating new migration directory..."
mkdir -p "$MIGRATION_FOLDER/0_init"

# Generate the migration script
echo "Generating migration script..."
npx prisma migrate diff \
  --from-empty \
  --to-schema-datamodel "$SCHEMA_FILE" \
  --script > "$MIGRATION_FOLDER/0_init/migration.sql"

# Mark the migration as applied
echo "Marking migration as applied..."
npx prisma migrate resolve --applied 0_init

echo "Baseline migration created successfully!"
