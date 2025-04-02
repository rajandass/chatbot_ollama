# LocalChat

A modern chat application built with Angular and Node.js, featuring real-time communication and code highlighting capabilities.

## Project Structure

```
localchat/
├── JS/
│   ├── backend/         # Node.js backend server
│   └── frontend/        # Angular frontend application
├── Python/
│   └── backend/         # Python backend alternative
└── README.md
```

## Features

- Real-time chat communication
- Code syntax highlighting
- Modern UI with Material Design
- Responsive layout
- Support for markdown formatting
- Multiple backend options (Node.js/Python)

## Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)
- Python 3.8+ (for Python backend)
- Angular CLI (`npm install -g @angular/cli`)

## Quick Start

### Frontend Setup

```bash
cd JS/frontend
npm install
ng serve
```

The frontend will be available at `http://localhost:4200`

### Backend Setup (Node.js)

```bash
cd JS/backend
npm install
npm run dev
```

The backend API will be available at `http://localhost:3000`

### Backend Setup (Python)

```bash
cd Python/backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## Development

### Frontend Development

The frontend is built with:
- Angular 17
- Angular Material
- highlight.js for code highlighting
- RxJS for reactive programming

### Backend Development

The Node.js backend uses:
- Express.js
- Socket.io for real-time communication
- OpenAI API for chat completions

## Configuration

1. Copy `.env.example` to `.env` in the backend directory
2. Add your OpenAI API key to `.env`:
```
OPENAI_API_KEY=your_api_key_here
```

## Available Scripts

Frontend:
- `ng serve` - Start development server
- `ng build` - Build production version
- `ng test` - Run unit tests
- `ng lint` - Run linting

Backend:
- `npm run dev` - Start development server
- `npm start` - Start production server
- `npm test` - Run tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.