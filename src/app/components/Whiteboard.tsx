// components/Whiteboard.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";

interface WhiteboardProps {
    sessionId: string | null;
}

const Whiteboard: React.FC<WhiteboardProps> = ({ sessionId }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [drawing, setDrawing] = useState<boolean>(false);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [drawings, setDrawings] = useState<
        { x: number; y: number; isDrawing: boolean }[][]
    >([]);

    useEffect(() => {
        if (sessionId) {
            const WEBSOCKET_URL = `ws://localhost:8000/ws/${sessionId}`;
            const ws = new WebSocket(WEBSOCKET_URL);
            setSocket(ws);

            ws.onopen = () => {
                console.log("Connected to the WebSocket server");
            };

            ws.onmessage = (event) => {
                const message = JSON.parse(event.data);
                if (message.type === "draw") {
                    drawOnCanvas(message.path);
                }
            };

            return () => {
                if (ws) {
                    ws.close();
                }
            };
        }
    }, [sessionId]);

    const drawOnCanvas = (
        path: { x: number; y: number; isDrawing: boolean }[]
    ) => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) {
                ctx.fillStyle = "white";
                ctx.fillRect(
                    0,
                    0,
                    canvasRef.current.width,
                    canvasRef.current.height
                ); // Clear the canvas

                ctx.lineWidth = 5;
                ctx.lineCap = "round";
                ctx.strokeStyle = "black";

                // Redraw all previous paths
                drawings.forEach((drawingPath) => {
                    ctx.beginPath();
                    ctx.moveTo(drawingPath[0].x, drawingPath[0].y);
                    drawingPath.forEach((point) => {
                        ctx.lineTo(point.x, point.y);
                    });
                    ctx.stroke();
                });

                // Draw the new path received from the WebSocket
                ctx.beginPath();
                path.forEach((point) => {
                    ctx.lineTo(point.x, point.y);
                });
                ctx.stroke();
            }
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setDrawing(true);
        const newPath: { x: number; y: number }[] = [];
        sendDrawEvent(e, newPath);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (drawing) {
            sendDrawEvent(e, drawings[drawings.length - 1]); // Send the current path
        }
    };

    const handleMouseUp = () => {
        setDrawing(false);
    };

    const sendDrawEvent = (
        e: React.MouseEvent,
        currentPath: { x: number; y: number }[]
    ) => {
        if (socket) {
            const canvas = canvasRef.current!;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Store the drawing event
            currentPath.push({ x, y });
            setDrawings((prev) => {
                const newDrawings = [...prev];
                if (drawing) {
                    newDrawings[newDrawings.length - 1] = currentPath.map(
                        (point) => ({ ...point, isDrawing: true })
                    ); // Update the current path with isDrawing
                } else {
                    newDrawings.push(
                        currentPath.map((point) => ({
                            ...point,
                            isDrawing: false,
                        }))
                    ); // Add a new path with isDrawing
                }
                return newDrawings;
            });

            // Sending draw events to other clients
            socket.send(
                JSON.stringify({
                    type: "draw",
                    path: currentPath,
                })
            );
        }
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{ backgroundColor: "white", cursor: "crosshair" }}
            ></canvas>
            {!sessionId && (
                <p style={{ textAlign: "center" }}>
                    Please enter a session ID to connect.
                </p>
            )}
        </div>
    );
};

export default Whiteboard;
