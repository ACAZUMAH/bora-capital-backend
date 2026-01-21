import {
  AddIdentityResponse,
  AddIdentitySuccessResponse,
  FetchIdentityApiResponse,
  FetchIdentitySuccessResponse,
} from 'src/common/interfaces/user/kyc';

export const isAddIdentitySuccess = (
  response: AddIdentityResponse
): response is AddIdentitySuccessResponse => {
  return 'Status' in response && 'IdentityID' in response;
};

export const isFetchIdentitySuccess = (
  response: FetchIdentityApiResponse
): response is FetchIdentitySuccessResponse => {
  return 'Status' in response && 'IdentityDetails' in response;
};
