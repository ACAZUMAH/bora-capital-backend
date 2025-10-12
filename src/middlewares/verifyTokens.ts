import e, { NextFunction, Request, Response } from 'express';
import { jwtVerify } from 'src/common/helpers';
import createError from 'http-errors';
import { UserDocument } from 'src/common/interfaces';
import { getUserById } from 'src/services/users';

export const verifyToken = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) return next();

    const bearer = bearerHeader?.split(' ');
    const bearerToken = bearer.length > 1 ? bearer[1] : bearer[0];

    if (!bearerToken) return next();

    const data: any = jwtVerify(bearerToken);

    if (!data?.id) return next();

    const user: UserDocument = await getUserById(data.id);

    req.user = user;

    return next();
  } catch (error: any) {
    throw createError.Unauthorized('Invalid token');
  }
};
