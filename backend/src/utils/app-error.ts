
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly status: "fail" | "error";
    public readonly isOperational: boolean;
    public readonly details?: unknown;

    constructor( message: string, statusCode: number, details?: unknown){
        super(message);

        this.name = "AppError";
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
        this.isOperational = true;
        this.details = details

        Error.captureStackTrace?.(this, AppError)
    }
}