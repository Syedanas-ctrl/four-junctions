# IMDB Clone API

A backend API for an IMDB-like movie database system built with Node.js, Express, TypeScript, Drizzle ORM, and MySQL.

## Database Schema

The database follows normal form principles and includes the following entities:

1. **Movies**: Contains movie information like title, release year, plot, etc.
2. **Actors**: Information about actors
3. **Producers**: Information about producers
4. **MovieActors**: Junction table for the many-to-many relationship between movies and actors

## Entity Relationships

- Actor can act in multiple movies
- Movie can have multiple actors
- Movie has only one producer
- Producer can produce multiple movies

## Getting Started

### Prerequisites

- Node.js (v16+)
- Docker and Docker Compose

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the Docker containers:
   ```
   docker-compose up -d
   ```
4. Run database migrations:
   ```
   npm run db:migrate
   ```
5. Start the development server:
   ```
   npm run dev
   ```

## Working

Initially, the plan was to use the official IMDb API, which is available through Amazon Marketplace. However, after applying for access, I did not receive approval.
As an alternative, we integrated two APIs from RapidAPI — one for retrieving movie details and another for fetching cast information (including actors and producers).

Since the RapidAPI services come with a limit of 500 API calls, we implemented a smart hybrid approach to optimize usage:

Runtime Fetching: If requested data is not available in our relational database (RDB), it will be fetched live from the RapidAPI APIs.

Backfilling: Once fetched, the data is stored (backfilled) into our RDB.

Subsequent Requests: Future requests for the same data will be served directly from the RDB, reducing API calls and improving performance.

This method ensures we can show up-to-date information while respecting the API call limits and improving system efficiency over time.
