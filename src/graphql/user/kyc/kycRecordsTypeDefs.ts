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
        VATNumber: String
        workPermit: String
        secondaryEmail: String
        comments: String
        imgPhotoString: String
        imgSignatureString: String
        imgBankProofString: String
        imgIDString: String
        imgPINString: String
    }

    input RelationInput {
        relationshipId: String!
        name: String!
        email: String!
        phoneNumber: String!
        idNumber: String!
        dob: DateTime!
        beneficiaryPercentage: String!
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
        relations: [RelationInput!]
    }

    extend type Mutation {
        updateKyc(data: UpdateKycInput!): User!
    }
`;
