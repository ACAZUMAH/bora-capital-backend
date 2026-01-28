import createError from 'http-errors';
import { bclClient } from 'src/services/bcl';
import logger from 'src/loggers/logger';
import { FetchFileTypesSuccessResponse } from 'src/common/interfaces';

export const getFileTypes = async () => {
  try {
    const response = (await bclClient.post(
      '/api/partner/fetchfiletypelist_bcl',
      {}
    )) as FetchFileTypesSuccessResponse;

    if (
      'Status' in response &&
      response.Status?.[0]?.Status === '0' &&
      Array.isArray(response.FileTypeDetails)
    ) {
      return response.FileTypeDetails.map(fileType => ({
        fileTypeId: fileType.FileTypeId,
        fileTypeName: fileType.FileTypeName,
        extension: fileType.Extension,
      }));
    }

    const errorMessage =
      response.Status?.[0]?.Description || 'Failed to fetch file types';
    throw createError.BadRequest(errorMessage);
  } catch (error: any) {
    if (error.status) {
      logger.error('fetch file types failed', error);
      return [];
    }
    if (error.response?.Message) {
      throw createError.BadRequest(error.response.Message);
    }
    return [];
  }
};
