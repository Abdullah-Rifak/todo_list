# Backend

Express + MongoDB API for the TODO app.

## Requirements

- Node.js
- MongoDB Atlas or a local MongoDB instance

## Setup

```bash
npm install
```

## Run

```bash
node server.js
```

If you prefer auto-reload during development, install and use `nodemon`.

```bash
npx nodemon server.js
```

## API Endpoints

- `GET /api/todos` - list all TODO items
- `POST /api/todos` - create a TODO
- `PUT /api/todos/:id` - update title and/or description
- `PATCH /api/todos/:id/done` - toggle done status
- `DELETE /api/todos/:id` - delete a TODO

## MongoDB Notes

The backend currently connects to MongoDB from `server.js`. Make sure the connection string points to a valid MongoDB Atlas cluster or local MongoDB instance before running the app.

If you move the connection string to environment variables later, document the variable name and value format here.

## Assumptions / Limitations

- No authentication or user accounts are implemented.
- Validation is minimal and focused on the TODO title.
- The app assumes the MongoDB connection is available when the server starts.