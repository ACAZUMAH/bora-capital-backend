import {
  S3Client,
  DeleteObjectCommand,
  ObjectCannedACL,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { UploadStreamToStorageParams } from 'src/common/interfaces/storage';
import createError from 'http-errors';
import logger from 'src/loggers/logger';

const bucketName = String(process.env.SPACES_BUCKET_NAME);

const s3Client = new S3Client({
  endpoint: String(process.env.SPACES_ENDPOINT),
  region: String(process.env.SPACES_REGION),
  forcePathStyle: true,
  credentials: {
    accessKeyId: String(process.env.SPACES_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.SPACES_SECRET_ACCESS_KEY),
  },
});

/**
 * @description Uploads a stream to the storage.
 * @param data.filename - The name of the file to be uploaded.
 * @param data.directory - The directory in the bucket where the file will be stored.
 * @param data.stream - The stream of the file to be uploaded.
 * @param data.mimeType - The MIME type of the file.
 * @param data.acl - The access control list for the file.
 * @returns Promise<void>
 * @throws 502 Error uploading file to storage.
 */
export const uploadStreamToStorage = async (
  data: UploadStreamToStorageParams
) => {
  try {
    const uploadParams = {
      Bucket: bucketName,
      Body: data.stream,
      Key: data.directory
        ? `${data.directory}/${data.filename}`
        : data.filename,
      ContentType: data.mimeType,
      ACL: data.acl ? data.acl : ObjectCannedACL.public_read,
    };

    const upload = new Upload({
      client: s3Client,
      params: uploadParams,
    });

    return await upload.done();
  } catch (error) {
    logger.error('Error uploading file to storage', { error, data });
    throw createError.BadGateway('Error uploading file to storage');
  }
};

/**
 * @description Deletes a file from the storage.
 * @param key - The key of the file to be deleted.
 * @returns Promise<boolean>
 * @throws 502 Error deleting file from storage.
 */
export const deleteFileFromStorage = async (key: string) => {
    try {
        const params = { Bucket: bucketName, Key: key };
        const command = new DeleteObjectCommand(params);
        await s3Client.send(command);
        return true;
    } catch (error) {
        logger.error('Error deleting file from storage', { error, key });
        throw createError.BadGateway('Error deleting file from storage');
    }
}