class SocketConnection {
  private url: string | null = null;
  private socket: WebSocket | null = null;
  private eventHandlers: {
    [eventName: string]: ((data: any, state?: any) => void)[];
  } = {};

  connect(url: string): WebSocket {
    this.url = url;
    this.socket = new WebSocket(url);

    this.socket.addEventListener("open", (event) => {
      console.log("Connection established");
      if (this.eventHandlers["open"]) {
        this.eventHandlers["open"].forEach((handler) => {
          handler(event);
        });
      }
    });

    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      const { route: eventName, ...data } = message;
      // Assuming store is declared and available in the scope
      // let state = store.getState();
      // if (this.eventHandlers[eventName]) {
      //   this.eventHandlers[eventName].forEach((handler) =>
      //     handler(data, state)
      //   );
      // }
    });

    this.socket.addEventListener("close", (event) => {
      console.log("Connection closed:", event.code, event.reason);
    });

    this.socket.addEventListener("error", (error) => {
      console.error("Socket error:", error);
    });

    return this.socket;
  }

  getSocket(): WebSocket | null {
    return this.socket;
  }

  onOpen(handler: (data: any) => void): Promise<void> {
    return new Promise((resolve) => {
      if (!this.eventHandlers["open"]) {
        this.eventHandlers["open"] = [];
      }
      this.eventHandlers["open"].push(handler);
      resolve();
    });
  }

  close(): void {
    this.socket?.close();
    this.socket = null;
  }

  on(
    eventName: string,
    handler: (data: any, state?: any) => void
  ): Promise<void> {
    return new Promise((resolve) => {
      if (!this.eventHandlers[eventName]) {
        this.eventHandlers[eventName] = [];
      }
      this.eventHandlers[eventName].push(handler);
      resolve();
    });
  }

  off(eventName: string, handler: (data: any, state?: any) => void): void {
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = this.eventHandlers[eventName].filter(
        (h) => h !== handler
      );
    }
  }

  emit(eventName: string, data: any): void {
    const message = JSON.stringify({ route: eventName, ...data });
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.warn("WebSocket is not connected.");
      if (this.eventHandlers["open"]) {
        this.eventHandlers["open"].push(() => {
          this.socket?.send(message);
        });
      } else {
        this.eventHandlers["open"] = [
          () => {
            this.socket?.send(message);
          },
        ];
      }
    }
  }
}

const socketConnection = new SocketConnection();

export default socketConnection;