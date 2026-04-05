import {
  AddIdentityInput,
  AddIdentityResponse,
  AddIdentitySuccessResponse,
  FetchIdentityApiResponse,
  FetchIdentitySuccessResponse,
  IdentityDetails,
} from 'src/common/interfaces/user/kyc';
import { KycRecordsInput, UserDocument } from 'src/common/interfaces';
import { formatDate } from 'src/common/helpers/date';

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

/**
 * @description Builds the PascalCase payload required by the BCL addIndividualIdentity API
 * by merging the authenticated user's profile data with the submitted KYC form fields.
 */
export const formatPayload = (
  user: UserDocument,
  data: KycRecordsInput
): AddIdentityInput => {
  return {
    FirstName: user.firstName,
    MiddleName: data.middleName,
    LastName: user.lastName,
    Gender: data.gender,
    Title: data.title,
    DateOfBirth: formatDate(data.dateOfBirth),
    ResidencyStatus: data.residencyStatus,
    PassPortNumber: data.passportNumber,
    IDNumber: data.idNumber,
    MaritalStatus: data.maritalStatus,
    SourceOfFunds: data.sourceOfFunds,
    SpouseName: data.spouseName,
    Occupation: data.occupation,
    NextOfKin: data.nextOfKin,
    PostalAddress: data.postalAddress,
    NationalityCountryCode: data.nationalityCountryCode,
    ResidencyCountryCode: data.residencyCountryCode,
    CurrencyCode: data.currencyCode,
    PhysicalAddress: data.physicalAddress,
    MobileNumber: user.phoneNumber!,
    PrimaryEmail: user.email,
    PinNumber: data.pinNumber,
    Relations: data.relations?.map(r => ({
      RelationshipID: r.relationshipId,
      Name: r.name,
      Email: r.email,
      PhoneNumber: r.phoneNumber,
      IDNumber: r.idNumber,
      DOB: formatDate(r.dob),
      BeneficiaryPercentage: r.beneficiaryPercentage,
    })),
  };
};

/**
 * @description Maps the BCL IdentityDetails response (PascalCase) back to the
 * camelCase shape returned by the app's getKycRecords service.
 */
export const formatResponse = (kycData: IdentityDetails) => {
  return {
    middleName: kycData.MiddleName,
    title: kycData.Title,
    residencyStatus: kycData.ResidencyStatus,
    passportNumber: kycData.PassPortNumber,
    idNumber: kycData.IDNumber,
    maritalStatus: kycData.MaritalStatus,
    sourceOfFunds: kycData.SourceOfFunds,
    spouseName: kycData.SpouseName,
    occupation: kycData.Occupation,
    nextOfKin: kycData.NextOfKin,
    postalAddress: kycData.PostalAddress,
    nationalityCountryCode: kycData.NationalityCountryCode,
    residencyCountryCode: kycData.ResidencyCountryCode,
    currencyCode: kycData.CurrencyID,
    physicalAddress: kycData.PhysicalAddress,
    pinNumber: kycData.PinNumber,
    VATNumber: kycData.VATNumber,
    workPermit: kycData.WorkPermit,
    secondaryEmail: kycData.SecondaryEmail,
    comments: kycData.Comments,
    imgPhotoString: kycData.imgPhotoString,
    imgSignatureString: kycData.imgSignatureString,
    imgBankProofString: kycData.imgBankProofString,
    imgIDString: kycData.imgIDString,
    imgPINString: kycData.imgPINString,
  };
};
