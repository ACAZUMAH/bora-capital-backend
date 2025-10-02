export const userTypeDefs = `#graphql
    enum Theme {
        LIGHT
        DARK
    }

    enum Role {
        ADMIN
        CLIENT
        Advisors
    }

    type Biometrics {
        enabled: Boolean
        deviceId: String
        expiresAt: DateTime
    }

    type Devices {
        deviceId: String
        refreshToken: String
        lastUsed: DateTime
    }

    type Preferences {
        theme: Theme
        currency: String
        language: String
        timezone: String
        notificationsEnabled: Boolean
    }

    type User {
        id: ID!
        fullName: String
        email: String!
        phoneNumber: String
        role: Role
        biometric: Biometrics
        preferences: Preferences
        # kycRecords: [KycRecords]
        devices: [Devices]
        createdAt: DateTime
        updatedAt: DateTime
    }

    extend type Query {
        me: User!
        getUserById(userId: ID!): User!
    }

    input DeviceInput {
        deviceId: String!
        refreshToken: String!
        lastUsed: DateTime
    }

    input BiometricInput {
        enabled: Boolean
        deviceId: String
    }

    input PreferencesInput {
        theme: Theme
        currency: String
        language: String
        timezone: String
        notificationsEnabled: Boolean
    }

    input UpdateUserInput {
        fullName: String
        phoneNumber: String
        devices: [deviceInput]
        biometric: biometricInput
        preferences: preferencesInput
    }

    extend type Mutation {
        updateUser(data: UpdateUserInput!): User!
    }
`;
