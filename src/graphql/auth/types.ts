export const authTypeDefs = `#graphql

    type Authenticated {
       user: User,
       accessToken: String!
       refreshToken: String!
    }

    type AuthResponse {
        message: String
    }

    type RefreshTokenResponse {
        accessToken: String!
    }

    input SignupInput {
        firstName: String!
        lastName: String!
        email: String!
        phoneNumber: String!
        password: String!
    }

    input SigninInput {
        email: String!
        password: String!
    }

    input AuthenticateExistingCustomerInput {
        email: String!
        phoneNumber: String!
        identityId: String!
    }

    extend type Mutation {
        signup(data: SignupInput!): AuthResponse!
        signin(data: SigninInput!): AuthResponse!
        logout: AuthResponse!
        forgetPassword(email: String!): AuthResponse!
        resetUserPassword(newPassword: String!): AuthResponse!
        resendOtp(email: String!): AuthResponse!
        verifyOtpAndCompleteAuth(otp: String!): Authenticated!
        refreshToken(refreshToken: String!): RefreshTokenResponse!
        authenticateExistingCustomer(data: AuthenticateExistingCustomerInput!): AuthResponse!
    }
`;
