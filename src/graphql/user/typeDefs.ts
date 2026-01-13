export const userTypeDefs = `#graphql
    enum Role {
        ADMIN
        CLIENT
        ADVISOR
    }

    type Relation {
        RelationshipID: ID!
        Name: String!
        Email: String!
        PhoneNumber: String!
        IDNumber: String!
        DOB: String!
        BeneficiaryPercentage: String!
    }

    type User {
        id: ID!
        email: String!
        phoneNumber: String!
        role: Role
        identityId: String
        accountNumbers: [String]
        createdAt: DateTime
        updatedAt: DateTime

        #kyc
        FirstName: String!
        MiddleName: String
        LastName: String!
        Title: String
        Gender: String
        DateOfBirth: String!
        ResidencyStatus: String!
        PassportNumber: String
        IDNumber: String!
        MaritalStatus: String
        SourceOfFunds: String!
        SpouseName: String
        Occupation: String!
        NextOfKin: String!
        PostalAddress: String!
        NationaltyCountryCode: String!
        ResidencyCountryCode: String!
        CurrencyCode: String!
        PhysicalAddress: String!
        PinNumber: String
        Relations: [Relation]
    }

    extend type Query {
        me: User!
        getUserById(userId: ID!): User!
    }

    input UpdateUserInput {
        id: ID!
        phoneNumber: String
    }

    extend type Mutation {
        updateUser(data: UpdateUserInput!): User!
    }
`;
