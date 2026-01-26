import { and } from 'graphql-shield';
import { isAdvisor, isAuthenticated } from './general';

export const documentsShield = {
  Query: {
    getUserDocuments: isAuthenticated,
    getDocumentById: isAuthenticated,
    getClientsDocuments: and(isAuthenticated, isAdvisor),
  },
  Mutation: {
    createDocument: isAuthenticated,
  },
};
