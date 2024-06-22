export class ApiResponse{
    constructor(message,data = "Empty"){
        this.message = message;
        this.data = data
    }
}