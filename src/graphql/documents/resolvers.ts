import { DocumentsDocument, GraphqlContext } from 'src/common/interfaces';
import {
  QueryGetDocumentByIdArgs,
  QueryGetUserDocumentsArgs,
} from 'src/common/interfaces/graphql';
import { getUploadById, getUploadByUserId } from 'src/services/uploads';
import { idResolver } from '../general';

const getUserDocuments = (_: any, args: QueryGetUserDocumentsArgs) => {
  return getUploadByUserId(args.userId);
};

const getDocumentById = (_: any, args: QueryGetDocumentByIdArgs) => {
  return getUploadById(args.id);
};

const user = (
  parent: { userId: string },
  _: any,
  { userLoader }: GraphqlContext
) => {
  return parent.userId ? userLoader.load(parent.userId) : null;
};

const upload = (parent: DocumentsDocument) => {
  return { ...parent };
};

export const documentsResolvers = {
  Query: {
    getUserDocuments,
    getDocumentById,
  },
  Document: {
    id: idResolver,
    upload,
    user,
  },
};
