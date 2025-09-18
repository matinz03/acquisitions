# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Node.js/Express.js REST API project called "acquisitions" with PostgreSQL database using Neon serverless and Drizzle ORM. The project follows modern ES modules architecture with path mapping for clean imports.

## Development Commands

### Core Development
- **Start development server**: `npm run dev` - Uses Node.js `--watch` flag for auto-restart
- **Database operations**:
  - `npm run db:generate` - Generate new database migrations with Drizzle Kit
  - `npm run db:migrate` - Run pending migrations
  - `npm run db:studio` - Open Drizzle Studio for database visualization

### Code Quality
- **Linting**: `npm run lint` - Check code with ESLint
- **Fix linting**: `npm run lint:fix` - Auto-fix ESLint issues
- **Format code**: `npm run format` - Format with Prettier
- **Check formatting**: `npm run format:check` - Check if code is properly formatted

## Architecture

### Path Mapping System
The project uses Node.js `imports` field for clean module imports:
- `#config/*` → `./src/config/*`
- `#controllers/*` → `./src/controllers/*` 
- `#middleware/*` → `./src/middleware/*`
- `#models/*` → `./src/models/*`
- `#routes/*` → `./src/routes/*`
- `#services/*` → `./src/services/*`
- `#utils/*` → `./src/utils/*`
- `#validations/*` → `./src/validations/*`

Always use these path mappings when importing modules instead of relative paths.

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: Neon serverless PostgreSQL
- **Models**: Located in `src/models/` - define database schemas using Drizzle's pgTable
- **Migrations**: Auto-generated in `drizzle/` directory
- **Configuration**: Database connection via `src/config/database.js`

### API Structure
- **Entry point**: `src/index.js` loads environment and starts server
- **App configuration**: `src/app.js` - Express app setup with middleware
- **Server**: `src/server.js` - HTTP server startup
- **Routes**: Organized in `src/routes/` with controller separation
- **Controllers**: Handle HTTP requests/responses in `src/controllers/`
- **Services**: Business logic layer in `src/services/`
- **Validations**: Zod schemas in `src/validations/`

### Security & Utilities
- **Authentication**: JWT-based with utilities in `src/utils/jwt.js`
- **Cookie handling**: Secure cookie utilities in `src/utils/cookies.js`
- **Password hashing**: bcrypt implementation in auth service
- **Logging**: Winston logger configured in `src/config/logger.js`
- **Validation**: Zod schemas with error formatting utilities

### Environment Configuration
Required environment variables (see `.env.example`):
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode
- `LOG_LEVEL` - Logging level
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret (change in production)
- `JWT_EXPIRES_IN` - Token expiration time

### Code Style
The project enforces strict code style via ESLint:
- ES modules with 2-space indentation
- Single quotes for strings
- Unix line endings
- Prefer const over let, no var
- Arrow functions preferred
- Object shorthand syntax

When working with authentication features, note that the current implementation includes sign-up functionality but sign-in/sign-out are placeholder endpoints that need completion.

## Testing
No test framework is currently configured. When adding tests, ensure ESLint configuration supports the testing globals (Jest/Mocha globals are pre-configured in eslint.config.js).

## Database Development
- Use `npm run db:studio` to visually inspect and modify database data
- Always generate migrations after model changes with `npm run db:generate`
- Models should follow the existing pattern using Drizzle's pgTable syntax
- Database queries use Drizzle ORM syntax - see `src/services/auth.service.js` for examples