export const userTypeDefs = `#graphql
    enum Role {
        ADMIN
        CLIENT
        ADVISOR
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
        firstName: String!
        middleName: String
        lastName: String!
        title: String
        gender: String
        dateOfBirth: String!
        residencyStatus: String!
        passportNumber: String
        idNumber: String!
        maritalStatus: String
        sourceOfFunds: String!
        spouseName: String
        occupation: String!
        nextOfKin: String!
        postalAddress: String!
        nationaltyCountryCode: String!
        residencyCountryCode: String!
        currencyCode: String!
        physicalAddress: String!
        pinNumber: String
        relations: [Relation]
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
