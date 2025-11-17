import { DocumentsDocument, GraphqlContext } from 'src/common/interfaces';
import {
  FileType,
  MutationCreateDocumentArgs,
  MutationDeleteDocumentArgs,
  QueryGetDocumentByIdArgs,
  QueryGetUserDocumentsArgs,
} from 'src/common/interfaces/graphql';
import {
  deleteUploadById,
  getUploadById,
  getUploadByUserId,
  getUploadByUserIds,
  uploadFile,
  uploadPhoto,
} from 'src/services/uploads';
import { idResolver } from '../general';

const getUserDocuments = (
  _: any,
  args: QueryGetUserDocumentsArgs,
  { user }: GraphqlContext
) => {
  return getUploadByUserId(args.userId || user?._id!);
};

const getClientsDocuments = (_: any, __: any, { user }: GraphqlContext) => {
  return getUploadByUserIds(user?.clients || []);
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

const deleteDocument = (_: any, args: MutationDeleteDocumentArgs) => {
  return deleteUploadById(args.data.id);
};

export const documentsResolvers = {
  Query: {
    getUserDocuments,
    getClientsDocuments,
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