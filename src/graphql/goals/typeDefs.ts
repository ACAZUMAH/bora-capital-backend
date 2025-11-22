export const goalsTypeDefs = `#graphql
    type Goal {
        id: ID!
        name: String!
        type: String!
        targetAmount: Float!
        targetCurrency: String!
        targetDate: Date!
        progress: Float!
        createdAt: Date!
        updatedAt: Date!

        user: User!
    }

    type GoalsConnection {
        edges: [Goal!]
        pageInfo: PageInfo!
    }

    input GoalsFilters {
        userId: ID
        search: String
        targetAmount: Float
        targetCurrency: String
        targetDate: Date
        progress: Float
        page: Int
        limit: Int
    }

    type Query {
        getGoals(filters: GoalsFilters): GoalsConnection!
        getGoalById(id: ID!): Goal!
    }

    input CreateGoalInput {
        userId: ID!
        name: String!
        type: String!
        targetAmount: Float!
        targetCurrency: String!
        targetDate: Date!
    }

    input UpdateGoalInput {
        id: ID!
        userId: ID
        name: String
        type: String
        targetAmount: Float
        targetCurrency: String
        targetDate: Date
    }

    type Mutation {
        createGoal(data: CreateGoalInput!): Goal!
        updateGoal(data: UpdateGoalInput!): Goal!
    }
`;
