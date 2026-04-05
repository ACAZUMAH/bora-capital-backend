import { ClientApp, UserDocument } from 'src/common/interfaces';
import createError from 'http-errors';
import { isCustomerApp } from 'src/common/helpers';
import { isProduction } from 'src/common/constants';

/**
 * @description Validates if the user has access based on the client app type.
 * @param app - client app
 * @param user - user document
 * @returns boolean
 */
export const validateSigninAccess = (
  app?: ClientApp,
  user?: UserDocument | null
) => {
  if (isProduction && !app)
    throw createError.Unauthorized('Unknown client app');

  if (isProduction && isCustomerApp(app!)) {
    if (user) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};
