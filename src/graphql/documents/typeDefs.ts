export const documentsTypedefs = `#graphql
  enum DocumentsType {
    PASSPORT
    ID_CARD
    DRIVER_LICENSE
    TAX_FORM
    AGREEMENT
    PROOF_OF_ADDRESS
    ID_DOCUMENT
    STATEMENT
    OTHER
  }

  enum fileType {
    DOCUMENT
    IMAGE
  }

  type Document {
    id: ID!
    upload: Upload!
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Query {
    getUserDocuments(userId: ID!): [Document]!
    getClientsDocuments: [Document]!
    getDocumentById(id: ID!): Document
  }

  input CreateDocumentInput {
    userId: ID!
    fileName: String!
    file: String!
    documentType: DocumentsType!
    size: Int!
    mimeType: String!
    directory: String
    fileType: fileType!
  }

  input DeleteDocumentInput {
    id: ID!
    userId: ID!
  }
  
  extend type Mutation {
    createDocument(data: CreateDocumentInput!): Document!
    deleteDocument(data: DeleteDocumentInput): Boolean!
  }
`;
