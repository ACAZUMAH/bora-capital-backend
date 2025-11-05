export const documentsTypedefs = `#graphql
  type Document {
    id: ID!
    upload: Upload!
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Query {
    getUserDocuments(userId: ID!): [Document]!
    getDocumentById(id: ID!): Document
  }

`;
