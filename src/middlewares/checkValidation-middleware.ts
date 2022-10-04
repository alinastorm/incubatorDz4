import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { APIErrorResult, FieldError } from '../types/types';

export const checkValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error: Array<FieldError> = errors.array({ onlyFirstError: true }).map(e => {
            return {
                message: e.msg,
                field: e.param
            }
        })
        const result: APIErrorResult = { errorsMessages: error }
        return res.status(400).json(result);
    }
    next()
}
