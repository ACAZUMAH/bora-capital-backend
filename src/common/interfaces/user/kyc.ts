import { BclStatus } from '../bcl';

export interface BclRelation {
  RelationshipID: string;
  Name: string;
  Email: string;
  PhoneNumber: string;
  IDNumber: string;
  DOB: string;
  BeneficiaryPercentage: string;
}

export interface AddIdentityInput {
  FirstName: string;
  MiddleName?: string | null;
  LastName: string;
  Gender: string;
  Title?: string | null;
  DateOfBirth: string;
  ResidencyStatus: string;
  PassPortNumber?: string | null;
  IDNumber: string;
  MaritalStatus?: string | null;
  SourceOfFunds: string;
  SpouseName?: string | null;
  Occupation: string;
  NextOfKin: string;
  PostalAddress: string;
  NationalityCountryCode: string;
  ResidencyCountryCode: string;
  CurrencyCode: string;
  PhysicalAddress: string;
  MobileNumber: string;
  PrimaryEmail: string;
  PinNumber?: string | null;
  Relations?: BclRelation[] | null;
}

export interface AddIdentitySuccessResponse {
  Status: BclStatus[];
  IdentityID: Array<{ IdentityID: string }>;
}

export interface AddIdentityFailureResponse {
  Message: string;
}

export type AddIdentityResponse =
  | AddIdentitySuccessResponse
  | AddIdentityFailureResponse;

export interface FetchIdentityInput {
  IdentityID: string;
  PrimaryEmail: string;
  MobileNumber: string;
}

export interface IdentityDetails {
  IdentityType: string;
  FirstName: string;
  MiddleName: string | null;
  LastName: string;
  Gender: string;
  Title: string | null;
  DateOfBirth: string;
  ResidencyStatus: string;
  PassPortNumber: string | null;
  VATNumber: string | null;
  IDNumber: string;
  WorkPermit: string | null;
  MaritalStatus: string | null;
  SourceOfFunds: string | null;
  SpouseName: string | null;
  Occupation: string | null;
  NextOfKin: string | null;
  PostalAddress: string | null;
  NationalityCountryCode: string;
  ResidencyCountryCode: string;
  CurrencyID: string;
  PhysicalAddress: string | null;
  MobileNumber: string;
  PrimaryEmail: string;
  SecondaryEmail: string | null;
  PinNumber: string | null;
  Comments: string | null;
  imgPhotoString: string | null;
  imgSignatureString: string | null;
  imgBankProofString: string | null;
  imgIDString: string | null;
  imgPINString: string | null;
}

export interface FetchIdentityResponse extends IdentityDetails {}

export interface FetchIdentitySuccessResponse {
  Status: BclStatus[];
  IdentityDetails: IdentityDetails[];
}

export interface FetchIdentityFailureResponse {
  Message: string;
}

export type FetchIdentityApiResponse =
  | FetchIdentitySuccessResponse
  | FetchIdentityFailureResponse;

export interface BclRelationType {
  RelationID: string;
  Relation: string;
}

export interface FetchRelationsSuccessResponse {
  Status: BclStatus[];
  Data: BclRelationType[];
}

export interface BclBank {
  BankID: number;
  BankName: string;
}

export interface FetchBanksSuccessResponse {
  Status: BclStatus[];
  BankDetails: BclBank[];
}

export interface BclCountry {
  CountryID: number;
  CountryCode: string;
  CountryName: string;
}

export interface FetchCountriesSuccessResponse {
  Status: BclStatus[];
  Countries: BclCountry[];
}

export interface BclFileType {
  FileCode: string;
  FileName: string;
}

export interface FetchFileTypesSuccessResponse {
  Status: BclStatus[];
  FileTypesDetails: BclFileType[];
}
