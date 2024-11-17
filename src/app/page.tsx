// pages/index.tsx
"use client";
import React, { useState } from "react";
import Whiteboard from "./components/Whiteboard";

const Home: React.FC = () => {
    const [sessionId, setSessionId] = useState<string>("");
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const handleConnect = () => {
        if (sessionId) {
            setIsConnected(true);
        }
    };

    return (
        <div>
            {isConnected ? (
                <Whiteboard sessionId={sessionId} />
            ) : (
                <div style={{ padding: "20px", textAlign: "center" }}>
                    <h1>Enter Session ID</h1>
                    <input
                        type="text"
                        value={sessionId}
                        onChange={(e) => setSessionId(e.target.value)}
                        placeholder="Session ID"
                        style={{ padding: "10px", width: "200px" }}
                    />
                    <button
                        onClick={handleConnect}
                        style={{ padding: "10px", marginLeft: "10px" }}
                    >
                        Connect
                    </button>
                </div>
            )}
        </div>
    );
};

export default Home;
