module.exports = class InvalidUsageError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidUsageError";
    }
}