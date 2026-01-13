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

    # BCL Beneficiary/Relation for KYC
    input BclRelationInput {
        relationshipId: String!
        name: String!
        email: String!
        phoneNumber: String!
        idNumber: String!
        dob: String!
        beneficiaryPercentage: String!
    }

    # Extended signup with KYC data for BCL
    input signupInput {
        # Authentication fields
        email: String!
        phoneNumber: String!
        password: String!
        
        # BCL KYC fields
        firstName: String!
        middleName: String
        lastName: String!
        gender: String!
        title: String
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
        nationalityCountryCode: String!
        residencyCountryCode: String!
        currencyCode: String!
        physicalAddress: String!
        pinNumber: String
        relations: [BclRelationInput]
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
