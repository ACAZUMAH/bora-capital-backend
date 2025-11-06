export const uploadTypedefs = `#graphql
   type Upload {
    id: ID!
    fileName: String!
    url: String
    documentType: String!
    size: Int!
    mimeType: String!
    directory: String
    
    createdAt: DateTime!
    updatedAt: DateTime!
   }
`;
