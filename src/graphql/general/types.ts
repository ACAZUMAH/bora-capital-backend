export const generalTypeDefs = `#graphql
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
