# Product & Order Management Service

This is the Product & Order Management Service for the e-commerce system, built with NestJS.

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

This service handles all product and order management functionality for the e-commerce system. It provides RESTful APIs for CRUD operations on products and orders, and communicates with the Customer Service through RabbitMQ for data synchronization.

## Features

- Product management (CRUD operations)
- Order management (CRUD operations)
- PostgreSQL database integration with TypeORM
- RabbitMQ messaging for inter-service communication
- Validation and error handling
- Database migrations and seeding

## API Endpoints

### Products

- `GET /products` - Retrieve all products
- `GET /products/:id` - Retrieve a specific product
- `POST /products` - Create a new product
- `PATCH /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product

### Orders

- `GET /orders` - Retrieve all orders
- `GET /orders/:id` - Retrieve a specific order
- `POST /orders` - Create a new order
- `PATCH /orders/:id` - Update an order
- `DELETE /orders/:id` - Delete an order

## Database Schema

### Products Table

| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| name | varchar | Product name |
| description | text | Product description |
| price | decimal | Product price |
| stock | integer | Available stock |
| isActive | boolean | Product status |
| createdAt | timestamp | Creation timestamp |
| updatedAt | timestamp | Last update timestamp |

### Orders Table

| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| customerId | integer | Reference to customer |
| totalAmount | decimal | Order total |
| status | varchar | Order status |
| createdAt | timestamp | Creation timestamp |
| updatedAt | timestamp | Last update timestamp |

### Order-Product Junction Table

| Column | Type | Description |
|--------|------|-------------|
| orderId | integer | Reference to order |
| productId | integer | Reference to product |

## RabbitMQ Integration

This service publishes and subscribes to RabbitMQ messages for inter-service communication:

### Published Events

- `order.created` - When a new order is created
- `order.updated` - When an order is updated

### Subscribed Events

- `customer.*` - Customer-related events from the Customer Service

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
DATABASE_NAME=product_order_db
RABBITMQ_URL=amqp://localhost
PORT=3001
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