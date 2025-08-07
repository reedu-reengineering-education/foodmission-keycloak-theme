import React from "react";
import ReactDOM from "react-dom/client";
import { KcApp } from "../keycloak-theme/KcApp";
import { kcContext as mockKcContext } from "../keycloak-theme/kcContext";
import { mockContexts } from "./mock-keycloak";
import "../globals.css";

// Development controls component
const DevControls: React.FC = () => {
  const [currentContext, setCurrentContext] = React.useState("login");
  const [showMessage, setShowMessage] = React.useState(false);
  const [messageType, setMessageType] = React.useState<
    "success" | "warning" | "error" | "info"
  >("info");
  const [messageText, setMessageText] = React.useState("Test message");

  const contexts = Object.keys(mockContexts);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        background: "white",
        border: "1px solid #ccc",
        padding: "10px",
        zIndex: 9999,
        minWidth: "250px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0", fontSize: "14px" }}>Dev Controls</h3>

      <div style={{ marginBottom: "10px" }}>
        <label
          style={{ display: "block", fontSize: "12px", marginBottom: "5px" }}
        >
          Page Context:
        </label>
        <select
          value={currentContext}
          onChange={(e) => setCurrentContext(e.target.value)}
          style={{ width: "100%", padding: "4px" }}
        >
          {contexts.map((ctx) => (
            <option key={ctx} value={ctx}>
              {ctx}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label
          style={{ display: "flex", alignItems: "center", fontSize: "12px" }}
        >
          <input
            type="checkbox"
            checked={showMessage}
            onChange={(e) => setShowMessage(e.target.checked)}
            style={{ marginRight: "5px" }}
          />
          Show Message
        </label>
      </div>

      {showMessage && (
        <>
          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                marginBottom: "5px",
              }}
            >
              Message Type:
            </label>
            <select
              value={messageType}
              onChange={(e) => setMessageType(e.target.value as any)}
              style={{ width: "100%", padding: "4px" }}
            >
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                marginBottom: "5px",
              }}
            >
              Message Text:
            </label>
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              style={{ width: "100%", padding: "4px" }}
            />
          </div>
        </>
      )}

      <button
        onClick={() => window.location.reload()}
        style={{
          width: "100%",
          padding: "6px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Refresh
      </button>
    </div>
  );
};

// Main development app
const DevApp: React.FC = () => {
  const [kcContext, setKcContext] = React.useState(mockKcContext);

  // Hot reload support would go here in a real Vite environment
  React.useEffect(() => {
    // Force re-render when components change
    setKcContext({ ...kcContext });
  }, [kcContext]);

  return (
    <div>
      <DevControls />
      <KcApp kcContext={kcContext} />
    </div>
  );
};

// Initialize development server
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<DevApp />);
