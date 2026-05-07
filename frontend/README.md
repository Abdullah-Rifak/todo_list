# Frontend

React UI for the TODO app.

## Requirements

- Node.js
- The backend running at http://localhost:5000

## Setup

```bash
npm install
```

## Run

```bash
npm start
```

This starts the app in development mode on http://localhost:3000.

## What It Does

- Displays all TODO items
- Creates TODO items with a title and optional description
- Edits title and description inline
- Toggles done / undone state
- Deletes TODO items

## API Connection

The frontend talks to the backend through Axios in src/services/api.js.

## Assumptions / Limitations

- The backend API must be available at http://localhost:5000/api.
- Error handling is basic and can be improved with inline user messages.
- The UI is intentionally simple and focused on the assignment requirements.
