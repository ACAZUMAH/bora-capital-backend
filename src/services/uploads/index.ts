import { isValidObjectId, Types } from 'mongoose';
import {
  CreateDocumentInput,
  uploadDocumentInput,
} from 'src/common/interfaces';
import { documentsModel } from 'src/models';
import createError from 'http-errors';
import { deleteFileFromStorage, uploadStreamToStorage } from '../storage';
import {
  generateRandomFileName,
  getFileExtensionMimeType,
  getMimeTypeFromBase64,
} from 'src/common/helpers';

/**
 * @description Create a new upload record
 * @param data.userId ID of the user uploading the document
 * @param data.fileName Name of the document file
 * @param data.documentType Type of the document (e.g., passport, utility bill)
 * @param data.fileUrl URL where the document is stored (optional)
 * @param data.size Size of the document file in bytes
 * @param data.mimeType MIME type of the document file
 * @returns The created document record
 */
export const createUpload = (data: CreateDocumentInput) => {
  return documentsModel.create(data);
};

/**
 * @description Retrieve a upload by its ID
 * @param id ID of the document to retrieve
 * @returns The document record
 */
export const getUploadById = async (id: Types.ObjectId | string) => {
  if (!isValidObjectId(id))
    throw new createError.BadRequest('Invalid document ID');

  const document = await documentsModel.findById(id);

  if (!document) throw new createError.NotFound('Document not found');

  return document;
};

/**
 * @description Retrieve a documents by userId
 * @param userId user id
 * @returns documents
 */
export const getUploadByUserId = async (userId: Types.ObjectId | string) => {
  if (!isValidObjectId(userId))
    throw new createError.BadRequest('Invalid user ID');

  const documents = await documentsModel.find({ userId });

  if (!documents)
    throw new createError.NotFound('No documents found for this user');

  return documents;
};

/**
 * @description Retrieve documents by their IDs
 * @param ids Array of document IDs to retrieve
 * @returns Array of document records
 */
export const getUploadsByIds = async (ids: Array<Types.ObjectId | null>) => {
  if (!ids.length) return [];

  if (!ids.every(isValidObjectId))
    throw new createError.BadRequest('Invalid document ids');

  return await documentsModel.find({ _id: { $in: ids } }, null, { lean: true });
};

/**
 * @description Delete a document by its ID
 * @param id ID of the document to delete
 * @returns The deleted document record
 */
export const deleteUploadById = async (id: Types.ObjectId | string) => {
  const document = await getUploadById(id);

  const storageKey = document.directory
    ? `${document.directory}/${document.fileName}`
    : document.fileName;

  await deleteFileFromStorage(storageKey);

  return await documentsModel.findByIdAndDelete(id);
};

/**
 * @description Upload a photo document
 * @param data.userId ID of the user uploading the document
 * @param data.file Base64 encoded string of the image file
 * @param data.directory Directory in storage where the file will be uploaded
 * @param data.documentType Type of the document (e.g., profile picture, cover photo) 
 * @returns The created document record
 */
export const uploadPhoto = async (data: uploadDocumentInput) => {
  const mimeType = getMimeTypeFromBase64(data.file);

  if (!mimeType?.startsWith('image/')) {
    throw new createError.BadRequest('Invalid image file');
  }

  const extension = getFileExtensionMimeType(mimeType);
  const filename = generateRandomFileName(extension);

  let cleanBase64 = data.file;
  if (cleanBase64.startsWith('data:')) {
    cleanBase64 = data.file.replace('/^data:.*?base64,/', '');
  }

  const buffer = Buffer.from(cleanBase64, 'base64');

  await uploadStreamToStorage({
    filename,
    mimeType,
    stream: buffer,
    directory: data.directory,
  });

  return createUpload({
    userId: data.userId,
    fileName: filename,
    directory: data.directory,
    size: buffer.length,
    mimeType,
    documentType: data.documentType,
  });
};

/**
 * @description Upload a document file
 * @param data.userId ID of the user uploading the document
 * @param data.file Base64 encoded string of the document file
 * @param data.directory Directory in storage where the file will be uploaded
 * @param data.documentType Type of the document (e.g., passport, utility bill)
 * @returns The created document record
 */
export const uploadFile = async (data: uploadDocumentInput) => {
  const mimeType = getMimeTypeFromBase64(data.file);
  const extension = getFileExtensionMimeType(mimeType);
  const filename = generateRandomFileName(extension);

  let cleanBase64 = data.file;
  if (cleanBase64.startsWith('data:')) {
    cleanBase64 = data.file.replace('/^data:.*?base64,/', '');
  }

  const buffer = Buffer.from(cleanBase64, 'base64');

  await uploadStreamToStorage({
    filename,
    mimeType,
    stream: buffer,
    directory: data.directory,
  });

  return createUpload({
    userId: data.userId!,
    fileName: filename,
    directory: data.directory,
    size: buffer.length,
    mimeType,
    documentType: data.documentType,
  });
};