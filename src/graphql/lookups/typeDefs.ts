export const lookupsTypeDefs = `#graphql
  type Bank {
    bankId: String!
    bankName: String!
    bankCode: String!
  }

  type Country {
    countryCode: String!
    countryName: String!
  }

  type FileType {
    fileTypeId: String!
    fileTypeName: String!
    extension: String!
  }

  type Relation {
    relationshipId: String!
    name: String!
    email: String
    phoneNumber: String
    idNumber: String
    dob: String
    beneficiaryPercentage: String
  }

  extend type Query {
    getBanks: [Bank]!
    getCountries: [Country]!
    getFileTypes: [FileType]!
  }
`;
