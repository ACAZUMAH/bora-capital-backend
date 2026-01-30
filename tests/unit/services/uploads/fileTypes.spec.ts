import { describe, test, expect, jest, beforeEach } from '@jest/globals';

// Mock the BCL client
const mockBclClientPost = jest.fn<any>();

jest.mock('src/services/bcl/client', () => ({
  bclClient: {
    post: mockBclClientPost,
  },
}));

// Mock uuid to prevent ESM issues
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'),
}));

import { getFileTypes } from 'src/services/uploads/fileTypes';

describe('FileTypes Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getFileTypes', () => {
    test('should return normalized file types on success', async () => {
      const mockFileTypes = [
        {
          FileTypeId: 'FT001',
          FileTypeName: 'PDF Document',
          Extension: '.pdf',
        },
        {
          FileTypeId: 'FT002',
          FileTypeName: 'Image',
          Extension: '.jpg',
        },
      ];

      mockBclClientPost.mockResolvedValue({
        Status: [{ Status: '0', Description: 'Success' }],
        FileTypeDetails: mockFileTypes,
      });

      const result = await getFileTypes({});

      expect(result).toEqual([
        {
          fileTypeId: 'FT001',
          fileTypeName: 'PDF Document',
          extension: '.pdf',
        },
        { fileTypeId: 'FT002', fileTypeName: 'Image', extension: '.jpg' },
      ]);
      expect(mockBclClientPost).toHaveBeenCalledWith(
        '/api/partner/fetchfiletypes',
        { FileTypeID: undefined }
      );
    });

    test('should throw error when BCL returns error message', async () => {
      mockBclClientPost.mockRejectedValue({
        Message: 'File types not available',
      });

      await expect(getFileTypes({})).rejects.toThrow(
        'Failed to fetch file types'
      );
    });

    test('should throw error when BCL returns failure status', async () => {
      mockBclClientPost.mockResolvedValue({
        Status: [{ Status: '1', Description: 'Failed to fetch file types' }],
      });

      await expect(getFileTypes({})).rejects.toThrow(
        'Failed to fetch file types'
      );
    });

    test('should throw error when request fails with status', async () => {
      const error = { status: 500, message: 'Server error' };
      mockBclClientPost.mockRejectedValue(error);

      await expect(getFileTypes({})).rejects.toThrow('Server error');
    });

    test('should throw error when request fails with response message', async () => {
      const error = { response: { Message: 'Invalid request' } };
      mockBclClientPost.mockRejectedValue(error);

      await expect(getFileTypes({})).rejects.toThrow('Invalid request');
    });

    test('should throw InternalServerError on unknown error', async () => {
      const error = new Error('Unknown error');
      mockBclClientPost.mockRejectedValue(error);

      await expect(getFileTypes({})).rejects.toThrow(
        'Failed to fetch file types'
      );
    });
  });
});
