# Backend

Express + MongoDB API for the TODO app.

## Requirements

- Node.js
- MongoDB Atlas or a local MongoDB instance

## Environment Variables

Create a `.env` file in the `backend` folder with:

```bash
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

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

The backend reads the MongoDB connection string from `MONGODB_URI` in `.env`. Use either a MongoDB Atlas URI or a local MongoDB connection string.

## Assumptions / Limitations

- No authentication or user accounts are implemented.
- Validation is minimal and focused on the TODO title.
- The app assumes the MongoDB connection is available when the server starts.