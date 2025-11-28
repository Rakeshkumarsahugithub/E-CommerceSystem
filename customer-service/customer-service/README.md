# Customer Management Service

This is the Customer Management Service for the e-commerce system, built with NestJS.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [API Endpoints](#api-endpoints)
4. [Database Schema](#database-schema)
5. [RabbitMQ Integration](#rabbitmq-integration)
6. [Setup and Installation](#setup-and-installation)
7. [Running the Service](#running-the-service)
8. [Testing](#testing)

## Overview

This service handles all customer management functionality for the e-commerce system. It provides RESTful APIs for CRUD operations on customers, and communicates with the Product & Order Service through RabbitMQ for data synchronization.

## Features

- Customer management (CRUD operations)
- PostgreSQL database integration with TypeORM
- RabbitMQ messaging for inter-service communication
- Validation and error handling
- Database migrations and seeding

## API Endpoints

### Customers

- `GET /customers` - Retrieve all customers
- `GET /customers/:id` - Retrieve a specific customer
- `POST /customers` - Create a new customer
- `PATCH /customers/:id` - Update a customer
- `DELETE /customers/:id` - Delete a customer

## Database Schema

### Customers Table

| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| firstName | varchar | Customer first name |
| lastName | varchar | Customer last name |
| email | varchar | Customer email (unique) |
| address | text | Customer address |
| phone | varchar | Customer phone number |
| isActive | boolean | Customer status |
| createdAt | timestamp | Creation timestamp |
| updatedAt | timestamp | Last update timestamp |

## RabbitMQ Integration

This service publishes and subscribes to RabbitMQ messages for inter-service communication:

### Published Events

- `customer.created` - When a new customer is created
- `customer.updated` - When a customer is updated

### Subscribed Events

- `order.*` - Order-related events from the Product & Order Service

## Setup and Installation

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- RabbitMQ

### Installation

```bash
npm install
```

### Environment Configuration

Create a `.env` file with the following variables:

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=customer_db
RABBITMQ_URL=amqp://localhost
PORT=3002
```

## Running the Service

### Development Mode

```bash
npm run start:dev
```

### Production Mode

```bash
npm run build
npm run start:prod
```

## Testing

### Unit Tests

```bash
npm run test
```

### End-to-End Tests

```bash
npm run test:e2e
```

### Test Coverage

```bash
npm run test:cov
```

## Database Migrations

### Run Migrations

```bash
npm run migration:run
```

### Generate Migration

```bash
npm run migration:generate -- -n MigrationName
```

## Database Seeding

### Seed Database

```bash
npm run seed
```