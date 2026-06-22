# SQL, Cloud SQL, and PostgreSQL Projects

Database projects for Cloud SQL, PostgreSQL, and backend engineering interviews.

## Projects

- `00-schema-migrations`: SQL schema and migration style.
- `01-query-tuning`: Indexing and query tuning examples.
- `02-cloudsql-backup-restore`: Cloud SQL backup and restore commands.

## Interview Questions and Answers

### 1. What is an index?
An index is a data structure that helps the database find rows faster, usually at the cost of extra storage and slower writes.

### 2. What is a migration?
A migration is a versioned database schema change that can be applied consistently across environments.

### 3. What is connection pooling?
Connection pooling reuses database connections so applications avoid opening too many expensive connections.

### 4. Why are backups not enough without restore tests?
A backup only proves data was copied. A restore test proves the backup can actually recover the service.

### 5. What is a slow query?
A slow query takes too long because of missing indexes, poor joins, large scans, locks, or inefficient schema design.

