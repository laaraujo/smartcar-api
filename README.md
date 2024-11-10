[![tests](https://github.com/laaraujo/smartcar-api/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/laaraujo/smartcar-api/actions/workflows/tests.yml)
[![build](https://github.com/laaraujo/smartcar-api/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/laaraujo/smartcar-api/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/laaraujo/smartcar-api/graph/badge.svg?token=pBVQTop2J1)](https://codecov.io/gh/laaraujo/smartcar-api)

# Smartcar API

API wrapper for Generic Motors' API

## Requirements

- Node.js `21.x` or higher
- [Docker](https://www.docker.com/) (optional for local development)

## Tech used

- [Typescript](https://www.typescriptlang.org/) and [Express](https://expressjs.com/)
- [Docker](https://www.docker.com/) for deployment and [Docker Compose (optional)](https://docs.docker.com/compose/) for local development
- [Swagger](https://swagger.io/) and [JSDoc](https://jsdoc.app/) for API documentation
- [Jest](https://jestjs.io/) for testing
- [Morgan](https://expressjs.com/en/resources/middleware/morgan.html) for logging
- [Zod](https://zod.dev/) for input validation

## Local setup

```sh
git clone git@github.com:laaraujo/smartcar-api.git # clone this repo
pnpm install # install dependencies
```

## Running locally

### Without Docker

```sh
pnpm start
```

### With Docker

```sh
pnpm docker:start
```

## Documentation

API Swagger docs are available in the [/docs](http://localhost:3000/docs) endpoint

## Testing

```
pnpm test
```
