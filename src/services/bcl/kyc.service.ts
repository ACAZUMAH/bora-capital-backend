import {
  AddIdentityInput,
  AddIdentityResponse,
  FetchIdentityInput,
  FetchIdentityResponse,
} from 'src/common/interfaces/bcl';
import { bclClient } from './client';
import createError from 'http-errors';

/**
 * Add individual identity (KYC) to BCL
 * Called during user registration to create BCL identity
 */
export const addIndividualIdentity = async (
  data: AddIdentityInput
): Promise<string> => {
  try {
    const response = await bclClient.post<AddIdentityResponse>(
      '/api/partner/addindividualidentity_bcl',
      data
    );

    // Check for success
    if (
      response.Status?.[0]?.Status === '0' &&
      response.IdentityID?.[0]?.IdentityID
    ) {
      return response.IdentityID[0].IdentityID;
    }

    // Handle failure
    const errorMessage =
      response.Status?.[0]?.Description || 'Failed to create identity';
    throw createError.BadRequest(errorMessage);
  } catch (error: any) {
    if (error.response?.data?.Message) {
      throw createError.BadRequest(error.response.data.Message);
    }
    throw error;
  }
};

/**
 * Fetch/verify investor identity from BCL
 */
export const fetchIdentity = async (
  data: FetchIdentityInput
): Promise<FetchIdentityResponse | undefined> => {
  try {
    const response = await bclClient.post<FetchIdentityResponse>(
      '/api/partner/fetchidentity_bcl',
      data
    );

    if (!response.Data?.identityDetails) {
      throw createError.BadRequest('Identity details not found in response');
    }
    return response.Data.identityDetails;
  } catch (error: any) {
    if (error.response?.data?.Message) {
      throw createError.BadRequest(error.response.data.Message);
    }
    throw error;
  }
};
