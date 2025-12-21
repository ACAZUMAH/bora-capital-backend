export const chatBotTypeDefs = `#graphql
    type ChatResponse {
        response: String
    }

    extend type Mutation {
        generateResponse(prompt: String!): ChatResponse
    }
`;
