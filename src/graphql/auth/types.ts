export const authTypeDefs = `#graphql
    type authenticated {
       user: User,
       accessToken: String!
       refreshToken: String!
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

    input signinInput {
        email: String!
        password: String!
    }

    extend type Mutation {
        signup(data: signupInput!): authResponse!
        signin(data: signinInput!): authResponse!
        logout: authResponse!
        forgetPassword(email: String!): authResponse!
        resetUserPassword(newPassword: String!): authResponse!
        verifyOtpAndCompleteAuth(otp: String!): authenticated!
    }
`;
