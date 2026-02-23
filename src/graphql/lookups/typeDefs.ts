export const lookupsTypeDefs = `#graphql
  type Bank {
    bankId: String
    bankName: String
    bankCode: String
  }

  type Country {
    countryCode: String
    countryName: String
  }

  type FileType {
    fileTypeId: String
    fileTypeName: String
    extension: String
  }

  type Relation {
    relationshipId: ID!
    name: String
    email: String
    phoneNumber: String
    idNumber: String
    dob: String
    beneficiaryPercentage: String
  }

  input BanksFilters {
    BankId: String
    
  }

  input CountriesFilters {
    CountryId: String
    
  }

  input FileTypesFilters {
    FileTypeId: String
    
  }

  extend type Query {
    getBanks(filters: BanksFilters): [Bank]!
    getCountries(filters: CountriesFilters): [Country]!
    getFileTypes(filters: FileTypesFilters): [FileType]!
  }
`;
