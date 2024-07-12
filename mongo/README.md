backup db
mongodump --out /data/db/backup --username xxxx --password xxxx --port xxxx --authenticationDatabase xxxx

restore db
mongorestore /data/db/backup --username xxxx --password xxxx --port xxxx --authenticationDatabase xxxx


mongo_backup.sh

# step #1
# --------------------
#!/bin/bash

# Set the date format for the backup directory
DATE=$(date +%Y%m%d_%H%M%S)

# Define backup directory on the host
BACKUP_DIR="/path/to/your/backup/directory/$DATE"

# Create backup directory
mkdir -p $BACKUP_DIR

# Dump the database
docker exec -it mongo mongodump --out /data/db/backup --username root --password example --authenticationDatabase admin

# Copy the backup to the host
docker cp mongo:/data/db/backup $BACKUP_DIR

# Remove the backup from the container
docker exec -it mongo rm -rf /data/db/backup

# Optionally, remove old backups (e.g., keep last 7 days)
find /path/to/your/backup/directory/ -type d -mtime +7 -exec rm -rf {} \;
# --------------------

# step #2
chmod +x mongo_backup.sh

# step #3
0 2 * * * /path/to/your/mongo_backup.sh
