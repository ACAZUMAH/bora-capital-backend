export const kycRecordsTypeDefs = `#graphql 
    enum KycStatus {
        PENDING
        SUBMITTED
        APPROVED
        REJECTED
    }

    type KycRecords {
        middleName: String
        title: String
        residencyStatus: String
        passportNumber: String
        idNumber: String
        maritalStatus: String
        sourceOfFunds: String
        spouseName: String
        occupation: String
        nextOfKin: String
        postalAddress: String
        nationalityCountryCode: String
        residencyCountryCode: String
        currencyCode: String
        physicalAddress: String
        pinNumber: String
    }

    input UpdateKycInput {
        residencyStatus: String!
        idNumber: String!
        sourceOfFunds: String!
        occupation: String!
        nextOfKin: String!
        postalAddress: String!
        nationalityCountryCode: String!
        residencyCountryCode: String!
        currencyCode: String!
        physicalAddress: String!
        # Optional
        middleName: String
        title: String
        passportNumber: String
        maritalStatus: String
        spouseName: String
        pinNumber: String
    }

    extend type Mutation {
        updateKyc(data: UpdateKycInput!): User!
    }
`;
