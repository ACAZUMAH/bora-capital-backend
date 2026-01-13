/**
 * BCL KYC/Identity related types
 */
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

export interface AddIdentityResponse {
  Status: Array<{ Status: string; Description: string }>;
  IdentityID: Array<{ IdentityID: string }>;
}

export interface FetchIdentityInput {
  IdentityID: string;
  PrimaryEmail: string;
  MobileNumber: string;
}

export interface FetchIdentityResponse {
  // Response structure from BCL API
  [key: string]: any;
}
