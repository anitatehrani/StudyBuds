# Makefile for managing database migrations and the starting/stopping of postgres

ifneq (,$(wildcard ./.env))
    include .env
    export
endif




# Variables
POSTGRESQL_URL = postgres://postgres:$(POSTGRES_PASSWORD)@localhost:5432/studybuds_db?sslmode=disable
MIGRATIONS_DIR = ./migrations
IMAGE_NAME = migrate_image
POSTGRES_CONTAINER_NAME = postgres
DATA_DIR = ./data

# Default target
.PHONY: all
all: build-migration run-migration

.PHONY: try
try: 
	echo $(POSTGRESQL_URL)

# Build the migration Docker image
.PHONY: build-migration
build-migration:
	docker build -t $(IMAGE_NAME) .

# Create a migration
.PHONY: create-migration
create-migration:
	docker run --rm \
		--network host \
		-e POSTGRESQL_URL=$(POSTGRESQL_URL) \
		-v $(MIGRATIONS_DIR):/migrations \
		$(IMAGE_NAME) \
		migrate create -ext sql -dir migrations -seq migration

# Run all migrations (apply up migrations)
.PHONY: run-migration
run-migration:
	docker run --rm \
		--network host \
		-e POSTGRESQL_URL=$(POSTGRESQL_URL) \
		-v $(MIGRATIONS_DIR):/migrations \
		$(IMAGE_NAME) \
		migrate -database $(POSTGRESQL_URL) -path migrations up

# Roll back all migrations (apply down migrations)
.PHONY: rollback-migration
rollback-migration:
	docker run -it --rm \
		--network host \
		-e POSTGRESQL_URL=$(POSTGRESQL_URL) \
		-v $(MIGRATIONS_DIR):/migrations \
		$(IMAGE_NAME) \
		migrate -database $(POSTGRESQL_URL) -path migrations down

# Move to the next migration (apply one migration up)
.PHONY: next-migration
next-migration:
	docker run --rm \
		--network host \
		-e POSTGRESQL_URL=$(POSTGRESQL_URL) \
		-v $(MIGRATIONS_DIR):/migrations \
		$(IMAGE_NAME) \
		migrate -database $(POSTGRESQL_URL) -path migrations up 1

# Move to the previous migration (apply one migration down)
.PHONY: previous-migration
previous-migration:
	docker run --rm \
		--network host \
		-e POSTGRESQL_URL=$(POSTGRESQL_URL) \
		-v $(MIGRATIONS_DIR):/migrations \
		$(IMAGE_NAME) \
		migrate -database $(POSTGRESQL_URL) -path migrations down 1

# Start PostgreSQL container
.PHONY: start-postgres
start-postgres:
	docker run --name $(POSTGRES_CONTAINER_NAME) \
		-e POSTGRES_PASSWORD= $(POSTGRES_PASSWORD)\
		-d \
		-p 5432:5432 \
		-v ./sql_scripts:/docker-entrypoint-initdb.d \
		-v $(DATA_DIR):/var/lib/postgresql/data \
		-v ./migrations:/migrations \
		postgres

# Stop PostgreSQL container
.PHONY: stop-postgres
stop-postgres:
	docker stop $(POSTGRES_CONTAINER_NAME)

# Remove PostgreSQL container
.PHONY: remove-postgres
remove-postgres:
	docker rm $(POSTGRES_CONTAINER_NAME)

# Stop and remove PostgreSQL container
.PHONY: close-postgres
close-postgres: stop-postgres remove-postgres

# Clean the contents of the PostgreSQL data directory
.PHONY: clean-postgres-data
clean-postgres-data:
	rm -rf $(DATA_DIR)/*
