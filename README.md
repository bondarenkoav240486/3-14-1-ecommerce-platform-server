# 3.14 E-commerce Platform - Backend

## Overview

Backend service for an e-commerce platform built with Node.js, Express, PostgreSQL and Sequelize.

This project is being developed as a portfolio project with a focus on realistic software architecture, domain modeling, and production-style development processes.

## Technology Stack

* Node.js
* Express.js
* PostgreSQL
* Sequelize ORM
* JWT Authentication
* bcrypt
* REST API

## Project Structure

```text
controllers/
middleware/
models/
routes/
static/
docs/

db.js
index.js
package.json
```

## Domain Modules

### Auth

Authentication and authorization.

### Users

User management and roles.

### Products

Product catalog and product details.

### Categories

Product categories (Types).

### Brands

Product brands.

### Cart

Shopping basket functionality.

### Orders

Planned module.

### Admin

Administrative functionality.

## Database

Database schema documentation is available in:

```text
docs/database-schema-v1.md
```

## Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Server default port:

```text
5314
```

## Status

Current phase:

* Project Setup ✅
* Database Analysis ✅
* Domain Analysis ✅
* E-commerce Refactoring 🚧
