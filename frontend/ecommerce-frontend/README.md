# E-Commerce Frontend

This is the frontend application for the e-commerce system, built with Next.js.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Project Structure](#project-structure)
5. [Setup and Installation](#setup-and-installation)
6. [Running the Application](#running-the-application)
7. [Building for Production](#building-for-production)
8. [Components](#components)

## Overview

This frontend application provides a user interface for the e-commerce system. It allows users to browse products, add items to their cart, register as customers, and place orders.

## Features

- Product listing and details
- Shopping cart functionality
- Customer registration
- Order placement
- Order history viewing
- Responsive design with Tailwind CSS

## Technologies Used

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Fetch API

## Project Structure

```
app/
├── components/          # Reusable React components
│   ├── Cart.tsx         # Shopping cart component
│   ├── CustomerForm.tsx # Customer registration form
│   ├── OrderHistory.tsx # Order history display
│   ├── ProductList.tsx  # Product listing component
│   └── CheckoutForm.tsx # Checkout form component
├── context/             # React context providers
│   └── CartContext.tsx  # Shopping cart state management
├── api/                 # API service functions
│   └── productService.ts # Service for backend API calls
├── checkout/            # Checkout page
│   └── page.tsx         # Checkout page component
├── layout.tsx           # Root layout component
└── page.tsx             # Home page component
```

## Setup and Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at http://localhost:3000

### Production Mode

```bash
npm run build
npm start
```

## Building for Production

```bash
npm run build
```

This will create an optimized production build in the `.next` directory.

## Components

### Cart Component

Manages the shopping cart functionality, including adding/removing items and updating quantities.

### Customer Form Component

Handles customer registration with form validation.

### Order History Component

Displays a customer's order history.

### Product List Component

Shows a grid of available products with add-to-cart functionality.

### Checkout Form Component

Handles the order placement process.

### Cart Context

Provides global state management for the shopping cart using React Context API.

## API Integration

The frontend communicates with the backend services through the API service layer:

- Product & Order Service: http://localhost:3001
- Customer Service: http://localhost:3002

## Environment Variables

The frontend does not require environment variables for basic functionality, but you may configure API endpoints if needed.