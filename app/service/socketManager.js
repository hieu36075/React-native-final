class SocketManager {
    constructor() {
      this.socket = null;
      this.token = null;
    }
  
    static getInstance() {
      if (!this.instance) {
        this.instance = new SocketManager();
      }
      return this.instance;
    }
  
    setSocket(socket) {
      this.socket = socket;
    }
  
    getSocket() {
      return this.socket;
    }
  
    setToken(token) {
      this.token = token;
    }
  
    getToken() {
      return this.token;
    }
  }
  
  export default SocketManager;
  