import { getAppConfig } from "../config/appConfig";
import useTradingStore from "../store/tradingStore";
import useContestStore from "../store/contestStore";

class SocketService {
  constructor() {
    this.socket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 10;
    this.reconnectInterval = 5000;
  }

  connect(params = {}) {
    console.log("WebSocket connection temporarily disabled for design work.");
    return;
    const { terminalId, loginId, contestId } = params;
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found, skipping WebSocket connection.");
      return;
    }

    // Ensure we have mandatory IDs
    if (!terminalId || !loginId || !contestId) {
      console.warn("Missing mandatory IDs for WebSocket, waiting for data...", { terminalId, loginId, contestId });
      return;
    }

    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      return;
    }

    // Connect directly to production
    let wsUrl = `wss://rest.fxdream11.com/ws?token=${token}&terminalId=${terminalId}&loginId=${loginId}&contestId=${contestId}`;

    console.log("Connecting to WebSocket with Params:", { terminalId, loginId, contestId });

    try {
      this.socket = new WebSocket(wsUrl);

      this.socket.onopen = () => {
        console.log("✅ WebSocket Connected");
        this.reconnectAttempts = 0;
        
        // Subscribe to required events
        this.subscribe("CurrentEquity", terminalId, contestId);
        this.subscribe("OpenTrades", terminalId, contestId);
        this.subscribe("DisplayRank", terminalId, contestId);
      };

      this.socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          this.handleMessage(message);
        } catch (error) {
          console.error("❌ Error parsing WebSocket message:", error);
        }
      };

      this.socket.onclose = (event) => {
        console.log("ℹ️ WebSocket Disconnected", event.reason);
        if (event.code !== 1000) {
          this.attemptReconnect(params);
        }
      };

      this.socket.onerror = (error) => {
        console.error("❌ WebSocket Error:", error);
      };
    } catch (error) {
      console.error("❌ Failed to create WebSocket instance:", error);
      this.attemptReconnect(params);
    }
  }

  subscribe(eventType, terminalId, contestId) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const message = {
        action: "subscribe",
        eventType: eventType,
        terminalId: terminalId,
        contestId: contestId
      };
      console.log(`📡 Subscribing to ${eventType}`);
      this.socket.send(JSON.stringify(message));
    }
  }

  handleMessage(message) {
    // Handle both direct data and wrapped data
    const type = message.type || message.eventType || message.event;
    const data = message.data || message;

    switch (type) {
      case "CurrentEquity":
        useTradingStore.getState().updateAccount(data);
        break;
      case "OpenTrades":
        useTradingStore.getState().updateOpenPositions(data);
        break;
      case "DisplayRank":
        useContestStore.getState().updateRankings(data);
        break;
      case "Connected":
        console.log("🚀 Server Handshake Successful:", data.connectionId);
        break;
      default:
        break;
    }
  }

  attemptReconnect(params) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectInterval * Math.min(this.reconnectAttempts, 5);
      console.log(`🔄 Reconnecting (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${delay}ms...`);
      setTimeout(() => this.connect(params), delay);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close(1000, "User logged out");
      this.socket = null;
    }
  }
}

export const socketService = new SocketService();
