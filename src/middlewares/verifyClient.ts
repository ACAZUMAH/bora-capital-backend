import { NextFunction, Request, Response } from "express";
import { getApp } from "src/common/helpers";
import createError from "http-errors";

export const verifyClient = async (req: Request, _res: Response, next: NextFunction) => {
    const clientAppHeader = req.headers['client']?.toString()

    if(!clientAppHeader) return next();

    const app = getApp(clientAppHeader)

    if(!app) throw createError(401, "Unauthorized")

    req.clientApp = app

    return next()
}