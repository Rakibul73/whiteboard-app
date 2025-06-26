# Collaborative Whiteboard Frontend (Next.js)

This is the **frontend application** for the Collaborative Whiteboard, built with **Next.js** and **React**. It provides an intuitive drawing interface that connects to the backend WebSocket service for real-time collaborative drawing experiences.

> **Backend Repository**: [https://github.com/Rakibul73/realtime-whiteboard](https://github.com/Rakibul73/realtime-whiteboard) - FastAPI/Python WebSocket service

## Current Features

### ✅ Implemented Features
- **Session-based Connection**: Users can join drawing sessions using unique Session IDs
- **Real-time Drawing**: Live drawing capabilities with mouse events on HTML5 Canvas
- **WebSocket Integration**: Seamless connection to FastAPI backend WebSocket service
- **Multi-user Collaboration**: Multiple users can draw simultaneously on the same canvas
- **Drawing Synchronization**: Real-time synchronization of drawings across all connected users
- **Session State Recovery**: New users automatically see existing drawings when joining
- **Responsive Canvas**: 800x600 canvas with crosshair cursor for precise drawing
- **Clean UI**: Simple, intuitive interface focusing on the drawing experience

### 🔄 Planned Features
- Drawing tools (pen, eraser, shapes)
- Color selection
- Brush size adjustment
- Undo/Redo functionality
- User cursors visibility
- Session management improvements
- Mobile touch support

## Tech Stack

- **Next.js 15**: React framework with server-side rendering
- **React 19**: Modern React with hooks and functional components
- **TypeScript**: Type-safe JavaScript development
- **HTML5 Canvas**: Native drawing capabilities
- **WebSocket API**: Real-time communication with backend
- **CSS**: Styling and responsive design

## Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend service running (see `../realtime-whiteboard`)

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rakibul73/whiteboard-app.git
   cd whiteboard-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Getting Started
1. **Start Backend**: Clone and start the backend service: [https://github.com/Rakibul73/realtime-whiteboard](https://github.com/Rakibul73/realtime-whiteboard) at `http://localhost:8000`
2. **Access Frontend**: Open `http://localhost:3000` in your browser
3. **Join Session**: Enter a unique Session ID (e.g., "room1", "meeting2024")
4. **Start Drawing**: Click "Connect" and start drawing on the canvas
5. **Collaborate**: Share the Session ID with others to draw together

### Session Management
- **Session IDs**: Any alphanumeric string (case-sensitive)
- **Multiple Sessions**: Different Session IDs create separate drawing rooms
- **Persistent Sessions**: Drawings persist as long as the backend is running
- **Cross-browser**: Works across different browsers and devices

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── Whiteboard.tsx    # Main whiteboard component
│   ├── globals.css           # Global styles
│   ├── layout.tsx           # App layout
│   ├── page.tsx             # Home page with session input
│   └── page.module.css      # Page-specific styles
├── public/                  # Static assets
└── ...config files
```

## Component Architecture

### `page.tsx` (Home Component)
- Session ID input interface
- Connection state management
- Conditional rendering of whiteboard

### `Whiteboard.tsx` (Main Drawing Component)
- Canvas drawing logic
- WebSocket connection management
- Real-time drawing synchronization
- Mouse event handling

## WebSocket Communication

### Connection
```typescript
const WEBSOCKET_URL = `ws://localhost:8000/ws/${sessionId}`;
const ws = new WebSocket(WEBSOCKET_URL);
```

### Message Format
```json
{
  "type": "draw",
  "path": [
    {"x": 100, "y": 150, "isDrawing": true},
    {"x": 101, "y": 151, "isDrawing": true}
  ]
}
```

## Development

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint

### Building for Production
```bash
npm run build
npm start
```

## Backend Integration

This frontend is designed to work with the FastAPI backend: [realtime-whiteboard](https://github.com/Rakibul73/realtime-whiteboard)

### Backend Requirements
- FastAPI server running on port 8000
- WebSocket endpoint: `/ws/{session_id}`
- Redis for session management
- CORS configured for port 3000

### Connection Flow
1. User enters Session ID in frontend
2. Frontend establishes WebSocket connection to backend
3. Backend sends current session state (if any)
4. Real-time drawing events sync between all connected users

## Troubleshooting

### Common Issues
- **WebSocket Connection Failed**: Ensure backend is running on port 8000
- **Drawings Not Syncing**: Check browser console for WebSocket errors
- **Canvas Not Responsive**: Verify mouse event handlers are working

### Development Tips
- Use browser developer tools to monitor WebSocket messages
- Check the Network tab for connection issues
- Console logs show connection status and errors

## Related Projects

- **Backend**: [realtime-whiteboard](https://github.com/Rakibul73/realtime-whiteboard) - FastAPI WebSocket service
- **Full Stack**: This frontend + backend creates a complete collaborative drawing platform

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.