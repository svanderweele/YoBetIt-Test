class ServerResponse {
  success: boolean;
  message: string;
  data?: object;
  constructor(success: boolean, message: string, data?: object) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

export default ServerResponse;
