 class Response {
    constructor(status = false, code = 400, message = "" ) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}

module.exports = Response;
