
import { Response } from 'express';

export default class HTTPResponseHandler {

    private static readonly UNAUTHORIZED: string = "Unauthorized";
    private static readonly FORBIDDEN: string = "Forbidden";
    private static readonly BAD_REQUEST: string = "Bad Request";
    private static readonly NOT_FOUND: string = "Not Found";
    private static readonly INTERNAL_SERVER_ERROR: string = "Internal Server Error";

    private static readonly OK_STATUS_CODE: number = 200;
    private static readonly CREATED_STATUS_CODE: number = 201;
    private static readonly NOT_CONTENT_STATUS_CODE: number = 204;
    private static readonly BAD_REQUEST_STATUS_CODE: number = 400;
    private static readonly UNAUTHORIZED_STATUS_CODE: number = 401;
    private static readonly FORBIDDEN_STATUS_CODE: number = 403;
    private static readonly NOT_FOUND_STATUS_CODE: number = 404;
    private static readonly INTERNAL_SERVER_ERROR_STATUS_CODE: number = 500;

    public static sendSuccess = (res: Response, data: any) => {
        res.status(HTTPResponseHandler.OK_STATUS_CODE);
        res.send(data);
    }

    public static sendCreate = (res: Response, data?: any) => {
        res.status(HTTPResponseHandler.CREATED_STATUS_CODE);
        data ? res.send(data) : res.send();
    }

    public static sendEmpty = (res: Response) => {
        res.status(HTTPResponseHandler.NOT_CONTENT_STATUS_CODE);
        res.send();
    }

    public static sendNotFoundReq = (res: Response, message: string, code?: string): void => {
        res.status(HTTPResponseHandler.NOT_FOUND_STATUS_CODE);
        res.send(HTTPResponseHandler.buildResponse(HTTPResponseHandler.NOT_FOUND, code, message));
    }

    public static sendInvalidToken = (res: Response, message: string, code?: string): void => {
        res.status(HTTPResponseHandler.UNAUTHORIZED_STATUS_CODE);
        res.send(HTTPResponseHandler.buildResponse(HTTPResponseHandler.UNAUTHORIZED, code, message));
    }

    public static sendForbidden = (res: Response, message: string, code?: string): void => {
        res.status(HTTPResponseHandler.FORBIDDEN_STATUS_CODE);
        res.send(HTTPResponseHandler.buildResponse(HTTPResponseHandler.FORBIDDEN, code, message));
    }

    public static sendInvalidReq = (res: Response, message: string, code?: string ): void => {
        res.status(HTTPResponseHandler.BAD_REQUEST_STATUS_CODE);
        res.send(HTTPResponseHandler.buildResponse(HTTPResponseHandler.BAD_REQUEST, code, message));
    }

    public static sendInternalError = (res: Response, message: string, code?: string): void => {
        res.status(HTTPResponseHandler.INTERNAL_SERVER_ERROR_STATUS_CODE);
        res.send(HTTPResponseHandler.buildResponse(HTTPResponseHandler.INTERNAL_SERVER_ERROR, code, message));
    }

    private static buildResponse = (type: String, code: string, message: string): any => {
        return {
            type: type,
            code: code,
            message: message
        }
    }

}
