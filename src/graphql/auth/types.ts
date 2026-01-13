export const authTypeDefs = `#graphql
    type authenticated {
       user: User,
       accessToken: String!
       refreshToken: String!
    }

    type authResponse {
        message: String
    }

    type refreshTokenResponse {
        accessToken: String!
    }

    input signupInput {
        email: String!
        phoneNumber: String!
        password: String!
        firstName: String!
        lastName: String!
        dateOfBirth: String!
        gender: String!
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
        resendOtp(email: String!): authResponse!
        verifyOtpAndCompleteAuth(otp: String!): authenticated!
        refreshToken(refreshToken: String!): refreshTokenResponse!
    }
`;
