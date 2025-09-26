export const authTypeDefs = `#graphql
    type authenticated {
       user: String,
       token: String!
    }

    type authResponse {
        message: String
    }

    input signupInput {
        fullName: String!
        email: String!
        phoneNumber: String!
        password: String!
    }
`;
