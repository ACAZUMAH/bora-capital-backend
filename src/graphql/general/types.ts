export const generalTypeDefs = `#graphql
    type PageInfo {
        hasNextPage: Boolean!
        limit: Int!
        page: Int!
        total: Int!
    }
    
    type Query {
        _empty: String
        hello: String!
        healthCheck: String!
    }

    type Mutation {
        _empty: String
    }

    type Subscription {
        _empty: String
    }
`;
