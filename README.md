## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod

# sync DB
$ npx prisma db pull
$ npx prisma generate
```
# ENV variables:

## DATABASE_URL="" // Connect with the mongoDB
## JWT_SECRET=""  // For future implementation
