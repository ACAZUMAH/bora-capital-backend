import {
  AddIdentityInput,
  AddIdentityResponse,
  AddIdentitySuccessResponse,
  FetchIdentityInput,
  FetchIdentityResponse,
  FetchIdentityApiResponse,
  FetchIdentitySuccessResponse,
} from 'src/common/interfaces/user/kyc';
import createError from 'http-errors';
import { bclClient } from '../bcl';
import { isAddIdentitySuccess, isFetchIdentitySuccess } from './helper';
import logger from 'src/loggers/logger';

/**
 * Add individual identity (KYC) to BCL
 * @param data individual identity details
 * @returns identity id
 */
export const addIndividualIdentity = async (data: AddIdentityInput) => {
  try {
    const response = (await bclClient.post(
      '/api/partner/addindividualidentity_bcl',
      data
    )) as AddIdentityResponse;

    if ('Message' in response && !('Status' in response)) {
      throw createError.BadRequest(response.Message);
    }

    if (
      isAddIdentitySuccess(response) &&
      response.Status?.[0]?.Status === '0' &&
      response.IdentityID?.[0]?.IdentityID
    ) {
      return response.IdentityID[0].IdentityID;
    }

    const errorMessage =
      (response as AddIdentitySuccessResponse).Status?.[0]?.Description ||
      'Failed to create identity';
    throw createError.BadRequest(errorMessage);
  } catch (error: any) {
    if (error.status) {
      logger.error('adding identity failed', error);
      const message =
        error.response?.Message ?? error.message ?? 'Request failed';
      throw createError.BadRequest(message);
    }
    if (error.response?.data?.Message) {
      throw createError.BadRequest(error.response.data.Message);
    }
    if (error.response?.Message) {
      throw createError.BadRequest(error.response.Message);
    }
    throw createError.BadRequest(`bad request: ${error}`);
  }
};

/**
 * Fetch/verify investor identity from BCL
 * @param data filters for fetching identity
 * @returns investor identity details
 */
export const fetchIdentity = async (data: FetchIdentityInput) => {
  try {
    const response = (await bclClient.post(
      '/api/partner/fetchidentity_bcl',
      data
    )) as FetchIdentityApiResponse;

    if ('Message' in response && !('Status' in response)) {
      throw createError.BadRequest(response.Message);
    }

    if (
      isFetchIdentitySuccess(response) &&
      Array.isArray(response.IdentityDetails) &&
      response.IdentityDetails.length > 0
    ) {
      return response.IdentityDetails[0];
    }

    throw createError.BadRequest('Identity details not found in response');
  } catch (error: any) {
    if (error.status) {
      logger.error('fetching identity failed', error);
      throw createError.BadRequest(error.response.Message);
    }
    if (error.response?.Message) {
      throw createError.BadRequest(error.response.Message);
    }
  }
};

/**
 * Fetches all relationships (e.g., son, trustee) for an investor.
 * @param requestID request ID
 * @returns relations
 */
export const getRelations = async (requestID: string) => {
  try {
    const response = await bclClient.post('/api/partner/fetchdata', {
      RequestID: requestID,
    });

    if ('Message' in response && !('Status' in response)) {
      throw createError.BadRequest(response.Message);
    }

    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data;
    }

    throw createError.BadRequest('Identity details not found in response');
  } catch (error: any) {
    if (error.status) {
      logger.error('fetching identity failed', error);
      throw createError.BadRequest(error.response.Message);
    }
    if (error.response?.Message) {
      throw createError.BadRequest(error.response.Message);
    }
  }
};
