import { DocumentsDocument, GraphqlContext } from 'src/common/interfaces';
import {
  FileType,
  MutationCreateDocumentArgs,
  QueryGetDocumentByIdArgs,
  QueryGetUserDocumentsArgs,
} from 'src/common/interfaces/graphql';
import {
  getUploadById,
  getUploadByUserId,
  uploadFile,
  uploadPhoto,
} from 'src/services/uploads';
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

const createDocument = (_: any, args: MutationCreateDocumentArgs) => {
  return args.data.fileType === FileType.IMAGE
    ? uploadPhoto({ ...args.data, directory: 'Images' })
    : uploadFile({ ...args.data, directory: 'Files' });
};

const deleteDocument = () => {};

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
  Mutation: {
    createDocument,
    deleteDocument,
  },
};
