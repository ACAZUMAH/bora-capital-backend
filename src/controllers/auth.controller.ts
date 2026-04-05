import { NextFunction, Request, Response } from 'express';
import { constructHTTPResponse, jwtSign, jwtVerify } from 'src/common/helpers';
import { createHash } from 'crypto';
import createError from 'http-errors';
import { userModel } from 'src/models';

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['refreshtoken'];

    if (!authHeader)
      return res
        .status(401)
        .json(constructHTTPResponse(null, createError(401, 'Unauthorized')));

    const headerValue = Array.isArray(authHeader) ? authHeader[0] : authHeader;
    const bearer = headerValue?.split(' ');
    const bearerToken = bearer && bearer.length > 1 ? bearer[1] : bearer?.[0];

    if (!bearerToken)
      return res
        .status(401)
        .json(constructHTTPResponse(null, createError(401, 'Unauthorized')));

    const hashedToken = createHash('sha256').update(bearerToken).digest('hex');
    const user = await userModel.findOne({ refreshToken: hashedToken });

    if (!user)
      return res
        .status(403)
        .json(constructHTTPResponse(null, createError(403, 'Forbidden')));

    const data: any = jwtVerify(bearerToken, 'refresh');

    if (!data?.id)
      return res
        .status(401)
        .json(constructHTTPResponse(null, createError(401, 'Unauthorized')));

    const accessToken = jwtSign({ id: data.id }, 'access');

    return res.status(200).json(constructHTTPResponse({ accessToken }, null));
  } catch (error: any) {
    return res
      .status(401)
      .json(
        constructHTTPResponse(
          null,
          createError(401, error.message || 'Refresh token expired')
        )
      );
  }
};
