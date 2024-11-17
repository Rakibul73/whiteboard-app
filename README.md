# Whiteboard App

This is a collaborative whiteboard application built with **Next.js** and **React**. Users can connect to a session using a unique Session ID and draw on the canvas in real-time. The application utilizes WebSockets for real-time communication, allowing multiple users to see each other's drawings instantly.

## Features

- **Real-time Collaboration**: Multiple users can draw on the same whiteboard simultaneously.
- **Session Management**: Users can connect to different sessions using a unique Session ID.

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd whiteboard-app
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Usage

1. Enter a unique Session ID in the input field.
2. Click the "Connect" button to join the session.
3. Start drawing on the canvas. Your drawings will be visible to other users connected to the same session.

## Technologies Used

- **Next.js**: A React framework for building server-rendered applications.
- **React**: A JavaScript library for building user interfaces.
- **WebSocket**: For real-time communication between clients.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.