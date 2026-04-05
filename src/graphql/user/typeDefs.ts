import { kycRecordsTypeDefs } from './kyc/kycRecordsTypeDefs';
import { lookupsTypeDefs } from '../lookups/typeDefs';

export const userTypeDefs = `#graphql
    ${kycRecordsTypeDefs}
    ${lookupsTypeDefs}
    
    enum Role {
        ADMIN
        CLIENT
        ADVISOR
    }

    type User {
        id: ID!
        email: String!
        phoneNumber: String
        role: Role

        firstName: String!
        lastName: String!
        dateOfBirth: String
        gender: String
        
        # KYC status
        kycStatus: KycStatus!
        identityId: String
        accountNumbers: [String]

        # KYC records (fetched from BCL API)
        kycRecords: KycRecords
        relations: [Relation]
        
        createdAt: DateTime
        updatedAt: DateTime
    }

    extend type Query {
        me: User!
        getUserById(userId: ID!): User!
    }

    input UpdateUserInput {
        userId: ID!
        phoneNumber: String
        firstName: String
        lastName: String
        dateOfBirth: String
        gender: String
    }

    extend type Mutation {
        updateUser(data: UpdateUserInput!): User!
    }
`;
